"""
Comprehensive Product Scraper
==============================
Scrapes products from:
  1. KeplerTech (keplertech.ae) — All product categories, all paginated pages
  2. Viabtech (local data from src/data/products.json)
  3. Epson Africa — JavaScript-rendered, scrapes what's available

Downloads all product images to ./scraped_images/<source>/
Saves full product data to ./products_all.json
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re
import hashlib
from urllib.parse import urljoin, urlparse

# ============ CONFIG ============
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
}
DELAY = 1  # seconds between requests
IMAGE_DIR = os.path.join(os.path.dirname(__file__), "scraped_images")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "products_all.json")


def download_image(img_url, source_name, product_name):
    """Download an image and return the local path."""
    if not img_url or img_url.startswith("data:"):
        return None

    # Create directory
    dest_dir = os.path.join(IMAGE_DIR, source_name)
    os.makedirs(dest_dir, exist_ok=True)

    # Create a clean filename from the product name
    clean_name = re.sub(r'[^\w\s-]', '', product_name or "product")[:80].strip()
    clean_name = re.sub(r'\s+', '_', clean_name)
    ext = os.path.splitext(urlparse(img_url).path)[1] or ".jpg"
    # Add hash to avoid collisions
    url_hash = hashlib.md5(img_url.encode()).hexdigest()[:8]
    filename = f"{clean_name}_{url_hash}{ext}"
    filepath = os.path.join(dest_dir, filename)

    if os.path.exists(filepath):
        return filepath

    try:
        resp = requests.get(img_url, headers=HEADERS, timeout=30, stream=True)
        resp.raise_for_status()
        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        return filepath
    except Exception as e:
        print(f"  ⚠ Failed to download {img_url}: {e}")
        return None


# ============================================================
# 1. KEPLERTECH SCRAPER — All categories, all pages
# ============================================================
KEPLERTECH_CATEGORIES = [
    "https://www.keplertech.ae/product-category/office-printer/",
    "https://www.keplertech.ae/product-category/plotter/",
    "https://www.keplertech.ae/product-category/graphic-printer/",
    "https://www.keplertech.ae/product-category/photo-printer/",
    "https://www.keplertech.ae/product-category/scanner/",
    "https://www.keplertech.ae/product-category/inkjet-media/",
    "https://www.keplertech.ae/product-category/ink-cartridges/",
    "https://www.keplertech.ae/product-category/printer-maintenance-box/",
    "https://www.keplertech.ae/product-category/software/",
]


def scrape_keplertech():
    """Scrape all products from keplertech.ae across all categories."""
    all_products = []
    seen_urls = set()

    for cat_url in KEPLERTECH_CATEGORIES:
        current_url = cat_url
        category_name = cat_url.rstrip("/").split("/")[-1].replace("-", " ").title()
        print(f"\n📁 KeplerTech Category: {category_name}")

        while current_url:
            print(f"  🔍 Scraping: {current_url}")
            try:
                resp = requests.get(current_url, headers=HEADERS, timeout=30)
                resp.raise_for_status()
            except requests.exceptions.RequestException as e:
                print(f"  ❌ Failed: {e}")
                break

            soup = BeautifulSoup(resp.content, "html.parser")

            # WooCommerce product list items
            products = soup.select("ul.products li.product")
            if not products:
                # Fallback: the site may use a different layout
                products = soup.select("li.product")

            for p in products:
                # Product URL
                link_tag = p.select_one("a.woocommerce-LoopProduct-link, a[href*='/product/']")
                if not link_tag:
                    link_tag = p.find("a")
                product_url = link_tag.get("href") if link_tag else None

                if not product_url or product_url in seen_urls:
                    continue
                if "/product-category/" in product_url:
                    continue
                seen_urls.add(product_url)

                # Product Name
                title_tag = p.select_one("h2.woocommerce-loop-product__title, h2, .product-title, h3")
                product_name = title_tag.get_text(strip=True) if title_tag else None
                if not product_name:
                    img = p.find("img")
                    product_name = img.get("alt", "Unknown") if img else "Unknown"

                # Image
                img_tag = p.select_one("img")
                img_url = None
                if img_tag:
                    img_url = (img_tag.get("data-src") or
                               img_tag.get("data-lazy-src") or
                               img_tag.get("srcset", "").split(",")[0].split(" ")[0] or
                               img_tag.get("src"))
                    if img_url and img_url.startswith("data:"):
                        # Try srcset
                        srcset = img_tag.get("srcset", "")
                        if srcset:
                            img_url = srcset.split(",")[0].split(" ")[0]
                        else:
                            img_url = None

                # Price
                price_tag = p.select_one(".price, .amount")
                price = price_tag.get_text(strip=True) if price_tag else None

                # Short Description (often not present in listings)
                desc_tag = p.select_one(".product-description, .short-description, .woocommerce-product-details__short-description")
                short_desc = desc_tag.get_text(strip=True) if desc_tag else None

                # Rating
                rating_tag = p.select_one(".star-rating")
                rating = rating_tag.get("aria-label", "").strip() if rating_tag else None

                all_products.append({
                    "source": "keplertech.ae",
                    "category": category_name,
                    "name": product_name,
                    "url": product_url,
                    "image_url": img_url,
                    "price": price,
                    "short_description": short_desc,
                    "rating": rating,
                })

            # Pagination
            next_link = soup.select_one("a.next.page-numbers")
            if next_link and next_link.get("href"):
                current_url = next_link["href"]
                time.sleep(DELAY)
            else:
                current_url = None

    print(f"\n✅ KeplerTech: Found {len(all_products)} unique products")
    return all_products


# ============================================================
# 2. KEPLERTECH — Scrape individual product pages for full data
# ============================================================
def scrape_keplertech_product_detail(product):
    """Enrich a product dict with full details from its product page."""
    url = product.get("url")
    if not url:
        return product

    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        resp.raise_for_status()
    except requests.exceptions.RequestException:
        return product

    soup = BeautifulSoup(resp.content, "html.parser")

    # Full description
    desc_div = soup.select_one(".woocommerce-product-details__short-description, .product-short-description, .elementor-widget-text-editor")
    if desc_div:
        product["full_description"] = desc_div.get_text(strip=True)[:1000]

    # Better image (full size)
    main_img = soup.select_one(".woocommerce-product-gallery__image img, .wp-post-image")
    if main_img:
        hi_res = (main_img.get("data-large_image") or
                  main_img.get("data-src") or
                  main_img.get("src"))
        if hi_res and not hi_res.startswith("data:"):
            product["image_url"] = hi_res

    # Gallery images
    gallery_imgs = soup.select(".woocommerce-product-gallery__image img")
    gallery_urls = []
    for gi in gallery_imgs:
        gurl = gi.get("data-large_image") or gi.get("data-src") or gi.get("src")
        if gurl and not gurl.startswith("data:") and gurl not in gallery_urls:
            gallery_urls.append(gurl)
    if gallery_urls:
        product["gallery_images"] = gallery_urls

    # Specs / features (from bullet lists)
    features = []
    spec_lists = soup.select(".elementor-icon-list-items li, .product_meta li, .woocommerce-product-attributes td")
    for sl in spec_lists:
        text = sl.get_text(strip=True)
        if text and len(text) > 3:
            features.append(text)
    if features:
        product["features"] = features[:20]

    return product


# ============================================================
# 3. VIABTECH — Load from local JSON
# ============================================================
def load_viabtech_products():
    """Load products from the local Viabtech data file."""
    local_path = os.path.join(os.path.dirname(__file__), "src", "data", "products.json")
    if not os.path.exists(local_path):
        print("⚠ Viabtech products.json not found at", local_path)
        return []

    with open(local_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    products = []
    for item in data:
        img_url = item.get("image", "")
        # Convert relative URLs to absolute
        if img_url.startswith("/"):
            img_url = f"https://viabtech.vercel.app{img_url}"

        products.append({
            "source": "viabtech.vercel.app",
            "category": item.get("category", ""),
            "name": item.get("name", ""),
            "url": f"https://viabtech.vercel.app/products/{item.get('id', '')}",
            "image_url": img_url,
            "price": None,
            "short_description": item.get("description", ""),
            "features": item.get("features", []),
            "specs": item.get("specs", {}),
            "brand": item.get("brand", ""),
            "type": item.get("type", ""),
            "in_stock": item.get("inStock", None),
        })

    print(f"✅ Viabtech: Loaded {len(products)} products from local data")
    return products


# ============================================================
# 4. EPSON AFRICA — Scrape what's available (homepage product links)
# ============================================================
def scrape_epson_africa():
    """Scrape available product links from Epson Africa.
    Note: The site is JavaScript-rendered so static scraping is limited."""
    products = []
    base_url = "https://www.epson-africa.com"

    # Try the main category pages that might have static content
    category_urls = [
        f"{base_url}/printers",
        f"{base_url}/projectors",
        f"{base_url}/scanners",
    ]

    for cat_url in category_urls:
        print(f"  🔍 Epson Africa: {cat_url}")
        try:
            resp = requests.get(cat_url, headers=HEADERS, timeout=30)
            resp.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Failed: {e}")
            continue

        soup = BeautifulSoup(resp.content, "html.parser")

        # Try to find any product links
        links = soup.find_all("a", href=True)
        for link in links:
            href = link.get("href", "")
            full_url = urljoin(base_url, href)
            # Look for individual product pages
            if "/product/" in href or "/p/" in href:
                name = link.get_text(strip=True) or "Epson Product"
                img_tag = link.find("img")
                img_url = None
                if img_tag:
                    img_url = img_tag.get("data-src") or img_tag.get("src")
                    if img_url:
                        img_url = urljoin(base_url, img_url)

                products.append({
                    "source": "epson-africa.com",
                    "category": cat_url.split("/")[-1].title(),
                    "name": name,
                    "url": full_url,
                    "image_url": img_url,
                    "price": None,
                    "short_description": None,
                })

        time.sleep(DELAY)

    # Deduplicate by URL
    seen = set()
    unique = []
    for p in products:
        if p["url"] not in seen:
            seen.add(p["url"])
            unique.append(p)

    print(f"✅ Epson Africa: Found {len(unique)} product links (JS-rendered site — limited results)")
    return unique


# ============================================================
# MAIN
# ============================================================
def main():
    print("=" * 60)
    print("🚀 COMPREHENSIVE PRODUCT SCRAPER")
    print("=" * 60)

    all_products = []

    # 1. KeplerTech — full scrape of all categories
    print("\n" + "─" * 40)
    print("📦 SCRAPING: keplertech.ae (all categories)")
    print("─" * 40)
    kepler_products = scrape_keplertech()

    # 1b. Enrich each KeplerTech product with detail page data + download images
    print(f"\n📄 Fetching detail pages for {len(kepler_products)} KeplerTech products...")
    for i, product in enumerate(kepler_products):
        print(f"  [{i+1}/{len(kepler_products)}] {product['name'][:60]}...")
        product = scrape_keplertech_product_detail(product)
        kepler_products[i] = product

        # Download image
        local_path = download_image(product.get("image_url"), "keplertech", product.get("name"))
        product["local_image"] = local_path

        # Download gallery images
        for j, gurl in enumerate(product.get("gallery_images", [])):
            gpath = download_image(gurl, "keplertech", f"{product.get('name', 'product')}_gallery_{j+1}")
            # We don't store gallery local paths for brevity

        time.sleep(DELAY)

    all_products.extend(kepler_products)

    # 2. Viabtech — load from local JSON + download images
    print("\n" + "─" * 40)
    print("📦 LOADING: viabtech.vercel.app (local data)")
    print("─" * 40)
    viabtech_products = load_viabtech_products()
    for product in viabtech_products:
        local_path = download_image(product.get("image_url"), "viabtech", product.get("name"))
        product["local_image"] = local_path
    all_products.extend(viabtech_products)

    # 3. Epson Africa — limited scrape
    print("\n" + "─" * 40)
    print("📦 SCRAPING: epson-africa.com (limited — JS-rendered)")
    print("─" * 40)
    epson_products = scrape_epson_africa()
    for product in epson_products:
        local_path = download_image(product.get("image_url"), "epson_africa", product.get("name"))
        product["local_image"] = local_path
    all_products.extend(epson_products)

    # Save everything
    print("\n" + "=" * 60)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)

    # Summary
    sources = {}
    for p in all_products:
        src = p.get("source", "unknown")
        sources[src] = sources.get(src, 0) + 1

    print(f"✅ SCRAPING COMPLETE!")
    print(f"📊 Total products: {len(all_products)}")
    for src, count in sources.items():
        print(f"   • {src}: {count} products")
    print(f"💾 Saved to: {OUTPUT_FILE}")
    print(f"🖼️  Images saved to: {IMAGE_DIR}/")
    print("=" * 60)


if __name__ == "__main__":
    main()
