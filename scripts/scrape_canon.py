"""
Canon Product Scraper for Viabtech
===================================
Scrapes Canon products from canon.co.uk and canon-europe.com
Downloads product images and adds to products.json

Uses requests with full browser headers to bypass 403 blocks.
"""
import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re
import hashlib
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE_DIR = Path(__file__).resolve().parent.parent
PRODUCTS_FILE = BASE_DIR / "src" / "data" / "products.json"
IMAGES_DIR = BASE_DIR / "public" / "images" / "products" / "canon_uk"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

DELAY = 1.5  # Be polite

# Full browser-like headers to bypass 403
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Cache-Control": "max-age=0",
    "Sec-Ch-Ua": '"Chromium";v="125", "Not=A?Brand";v="24", "Google Chrome";v="125"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
})


def fetch_page(url, retries=2):
    """Fetch a page with retries."""
    for attempt in range(retries + 1):
        try:
            resp = SESSION.get(url, timeout=30, allow_redirects=True)
            if resp.status_code == 200:
                return resp
            elif resp.status_code == 403:
                print(f"    403 Forbidden - attempt {attempt+1}/{retries+1}")
                # Try with different referer
                SESSION.headers["Referer"] = "https://www.canon.co.uk/"
                time.sleep(2)
            else:
                print(f"    HTTP {resp.status_code} - attempt {attempt+1}/{retries+1}")
                time.sleep(1)
        except Exception as e:
            print(f"    Error: {e} - attempt {attempt+1}/{retries+1}")
            time.sleep(2)
    return None


def download_image(img_url, product_id):
    """Download product image and return local path."""
    if not img_url or img_url.startswith("data:"):
        return None
    
    ext = os.path.splitext(urlparse(img_url).path)[1] or ".webp"
    clean_id = re.sub(r'[^\w\-]', '_', product_id)
    filename = f"{clean_id}{ext}"
    filepath = IMAGES_DIR / filename
    local_path = f"/images/products/canon_uk/{filename}"
    
    if filepath.exists() and filepath.stat().st_size > 1000:
        return local_path
    
    try:
        resp = SESSION.get(img_url, timeout=30, stream=True)
        resp.raise_for_status()
        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        return local_path
    except Exception as e:
        print(f"    Image download failed: {e}")
        return None


def slugify(text):
    """Convert text to a URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text


def extract_products_from_listing(url, category, product_type):
    """Extract product links and basic info from a Canon listing page."""
    products = []
    print(f"\n  Fetching: {url}")
    
    resp = fetch_page(url)
    if not resp:
        print(f"    Failed to fetch page")
        return products
    
    soup = BeautifulSoup(resp.content, "html.parser")
    
    # Canon uses various product card selectors
    selectors = [
        ".product-card",
        ".product-item",
        ".c-product-card",
        "[class*='ProductCard']",
        ".product-tile",
        ".product",
        "article[class*='product']",
        ".productList__item",
        ".product-list__item",
    ]
    
    cards = []
    for selector in selectors:
        cards = soup.select(selector)
        if cards:
            break
    
    if not cards:
        # Fallback: find product links by URL patterns
        all_links = soup.find_all("a", href=True)
        product_links = set()
        for link in all_links:
            href = link.get("href", "")
            # Canon product URLs typically contain model identifiers
            if any(x in href for x in ["/p/", "/product/", "/sp/", "/printers/", "/cameras/", "/lenses/"]):
                if href not in product_links and not href.endswith("/"):
                    product_links.add(href)
        
        # Also try finding structured data
        script_tags = soup.find_all("script", type="application/ld+json")
        for script in script_tags:
            try:
                data = json.loads(script.string)
                if isinstance(data, list):
                    for item in data:
                        if item.get("@type") == "Product":
                            products.append({
                                "name": item.get("name", ""),
                                "url": item.get("url", ""),
                                "image_url": item.get("image", ""),
                                "description": item.get("description", ""),
                            })
                elif data.get("@type") == "Product":
                    products.append({
                        "name": data.get("name", ""),
                        "url": data.get("url", ""),
                        "image_url": data.get("image", ""),
                        "description": data.get("description", ""),
                    })
            except (json.JSONDecodeError, AttributeError):
                pass
    
    for card in cards:
        # Extract product name
        name_tag = card.select_one("h2, h3, h4, .product-card__title, .product__name, [class*='title'], [class*='name']")
        name = name_tag.get_text(strip=True) if name_tag else None
        
        # Extract link
        link_tag = card.select_one("a[href]") or card.find_parent("a")
        href = link_tag.get("href", "") if link_tag else ""
        full_url = urljoin(url, href) if href else ""
        
        # Extract image
        img_tag = card.select_one("img")
        img_url = None
        if img_tag:
            img_url = (
                img_tag.get("data-src") or
                img_tag.get("data-lazy-src") or
                img_tag.get("src")
            )
            if img_url:
                img_url = urljoin(url, img_url)
            if img_url and img_url.startswith("data:"):
                # Try srcset
                srcset = img_tag.get("srcset", "")
                if srcset:
                    img_url = srcset.split(",")[0].split(" ")[0]
                    img_url = urljoin(url, img_url)
                else:
                    img_url = None
        
        # Extract short description
        desc_tag = card.select_one(".product-card__description, .product__desc, [class*='description']")
        desc = desc_tag.get_text(strip=True) if desc_tag else None
        
        if name:
            products.append({
                "name": name,
                "url": full_url,
                "image_url": img_url,
                "description": desc,
            })
    
    print(f"    Found {len(products)} products")
    return products


def scrape_product_detail(url):
    """Scrape a Canon product detail page for full specs."""
    resp = fetch_page(url)
    if not resp:
        return {}
    
    soup = BeautifulSoup(resp.content, "html.parser")
    detail = {}
    
    # Get full description
    desc_selectors = [
        ".product-description",
        ".product__description",
        "[class*='description']",
        ".c-product-detail__description",
        "meta[name='description']",
    ]
    for sel in desc_selectors:
        desc = soup.select_one(sel)
        if desc:
            if desc.name == "meta":
                detail["description"] = desc.get("content", "")
            else:
                detail["description"] = desc.get_text(strip=True)[:500]
            break
    
    # Get high-res image
    img_selectors = [
        ".product-hero img",
        ".product__image img",
        ".product-gallery img",
        "[class*='hero'] img",
        "picture source",
    ]
    for sel in img_selectors:
        img = soup.select_one(sel)
        if img:
            img_url = (
                img.get("data-src") or
                img.get("srcset", "").split(",")[0].split(" ")[0] or
                img.get("src")
            )
            if img_url and not img_url.startswith("data:"):
                detail["image_url"] = urljoin(url, img_url)
                break
    
    # Get features from bullet lists
    features = []
    feature_sections = soup.select(".product-features li, .key-features li, [class*='feature'] li, .benefits li")
    for li in feature_sections[:8]:
        text = li.get_text(strip=True)
        if text and len(text) > 5:
            features.append(text)
    if features:
        detail["features"] = features
    
    # Get specs from tables
    specs = {}
    spec_rows = soup.select("table tr, .spec-row, .specifications tr, [class*='spec'] tr")
    for row in spec_rows:
        cells = row.find_all(["td", "th"])
        if len(cells) >= 2:
            key = cells[0].get_text(strip=True)
            val = cells[1].get_text(strip=True)
            if key and val:
                spec_key = slugify(key).replace("-", "_")
                specs[spec_key] = val
    if specs:
        detail["specs"] = specs
    
    # Try structured data
    script_tags = soup.find_all("script", type="application/ld+json")
    for script in script_tags:
        try:
            data = json.loads(script.string)
            if isinstance(data, dict) and data.get("@type") == "Product":
                if not detail.get("description") and data.get("description"):
                    detail["description"] = data["description"][:500]
                if not detail.get("image_url") and data.get("image"):
                    img = data["image"]
                    if isinstance(img, list):
                        img = img[0]
                    detail["image_url"] = img
        except (json.JSONDecodeError, AttributeError):
            pass
    
    return detail


# ============================================================
# CATEGORY DEFINITIONS
# ============================================================
CANON_CATEGORIES = [
    # Consumer Printers
    {"url": "https://www.canon.co.uk/printers/home-printers/", "category": "Office Printer", "type": "Home Printer"},
    {"url": "https://www.canon.co.uk/printers/small-office-printers/", "category": "Office Printer", "type": "Office Multifunction"},
    {"url": "https://www.canon.co.uk/printers/refillable-ink-tank-printers/", "category": "Office Printer", "type": "Refillable Ink Tank"},
    {"url": "https://www.canon.co.uk/printers/professional-photo-printers/", "category": "Photo Printer", "type": "Professional Photo Printer"},
    {"url": "https://www.canon.co.uk/printers/portable-printers/", "category": "Photo Printer", "type": "Portable Photo Printer"},
    
    # Business Printers  
    {"url": "https://www.canon.co.uk/business/products/office-printers/", "category": "Printer", "type": "Business Multifunction"},
    {"url": "https://www.canon.co.uk/business/products/large-format-printers/", "category": "Printer", "type": "Large Format"},
    
    # Scanners
    {"url": "https://www.canon.co.uk/scanners/", "category": "Scanner", "type": "Document Scanner"},
    
    # Cameras
    {"url": "https://www.canon.co.uk/cameras/mirrorless-cameras/", "category": "Camera", "type": "Mirrorless"},
    {"url": "https://www.canon.co.uk/cameras/compact-cameras/", "category": "Camera", "type": "Compact"},
    
    # Lenses
    {"url": "https://www.canon.co.uk/lenses/rf-lenses/", "category": "Lens", "type": "RF Mount"},
    {"url": "https://www.canon.co.uk/lenses/rf-s-lenses/", "category": "Lens", "type": "RF-S Mount"},
    
    # Canon Europe fallbacks
    {"url": "https://www.canon-europe.com/printers/home-printers/", "category": "Office Printer", "type": "Home Printer"},
    {"url": "https://www.canon-europe.com/printers/small-office-printers/", "category": "Office Printer", "type": "Office Multifunction"},
    {"url": "https://www.canon-europe.com/printers/refillable-ink-tank-printers/", "category": "Office Printer", "type": "Refillable Ink Tank"},
    {"url": "https://www.canon-europe.com/printers/professional-photo-printers/", "category": "Photo Printer", "type": "Professional Photo Printer"},
    {"url": "https://www.canon-europe.com/scanners/", "category": "Scanner", "type": "Document Scanner"},
    {"url": "https://www.canon-europe.com/cameras/", "category": "Camera", "type": "Mirrorless"},
    {"url": "https://www.canon-europe.com/lenses/", "category": "Lens", "type": "RF Mount"},
    
    # i-SENSYS / Business ranges
    {"url": "https://www.canon.co.uk/business/products/office-printers/i-sensys/", "category": "Printer", "type": "i-SENSYS Laser"},
    {"url": "https://www.canon.co.uk/business/products/office-printers/imagerunner/", "category": "Printer", "type": "imageRUNNER"},
]


def main():
    print("=" * 60)
    print("CANON PRODUCT SCRAPER FOR VIABTECH")
    print("=" * 60)
    
    # Load existing products
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        existing_products = json.load(f)
    
    existing_ids = {p["id"] for p in existing_products}
    existing_names = {p["name"].lower() for p in existing_products}
    
    print(f"Existing products: {len(existing_products)}")
    print(f"Existing Canon IDs: {len([p for p in existing_products if p.get('brand') == 'Canon'])}")
    
    # Scrape all categories
    all_new_products = []
    seen_names = set()
    
    for cat_info in CANON_CATEGORIES:
        cat_url = cat_info["url"]
        category = cat_info["category"]
        product_type = cat_info["type"]
        
        print(f"\n{'='*40}")
        print(f"Category: {category} / {product_type}")
        print(f"URL: {cat_url}")
        
        raw_products = extract_products_from_listing(cat_url, category, product_type)
        time.sleep(DELAY)
        
        for raw in raw_products:
            name = raw.get("name", "").strip()
            if not name:
                continue
            
            # Skip if already exists
            name_lower = name.lower()
            if name_lower in existing_names or name_lower in seen_names:
                print(f"    SKIP (exists): {name}")
                continue
            
            seen_names.add(name_lower)
            
            # Generate ID
            product_id = f"canon-{slugify(name)}"
            if product_id in existing_ids:
                print(f"    SKIP (id exists): {product_id}")
                continue
            
            # Try to get detail page info
            detail = {}
            if raw.get("url"):
                print(f"    Fetching detail: {name[:50]}...")
                detail = scrape_product_detail(raw["url"])
                time.sleep(DELAY)
            
            # Download image
            img_url = detail.get("image_url") or raw.get("image_url")
            local_image = None
            if img_url:
                local_image = download_image(img_url, product_id)
            
            # Build product entry
            description = detail.get("description") or raw.get("description") or f"The {name} from Canon delivers professional-quality performance with advanced features for demanding workflows."
            features = detail.get("features") or []
            specs = detail.get("specs") or {}
            
            product = {
                "id": product_id,
                "name": name,
                "brand": "Canon",
                "category": category,
                "type": product_type,
                "image": local_image or f"/images/products/{slugify(name)}.webp",
                "description": description,
                "features": features,
                "specs": specs,
                "inStock": True,
                "featured": False,
            }
            
            all_new_products.append(product)
            print(f"    + Added: {name}")
    
    # Append new products
    for p in all_new_products:
        existing_products.append(p)
    
    # Save
    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing_products, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print(f"SCRAPING COMPLETE!")
    print(f"  New products added: {len(all_new_products)}")
    print(f"  Total products now: {len(existing_products)}")
    print(f"  Images downloaded to: {IMAGES_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
