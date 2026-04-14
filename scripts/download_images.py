"""
Download product images from keplertech.ae and Epson CDN,
save them locally, and update products.json paths.

Uses requests + BeautifulSoup for reliable scraping.
"""
import json
import os
import re
import time
import hashlib
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE_DIR = Path(__file__).resolve().parent.parent
PRODUCTS_FILE = BASE_DIR / "src" / "data" / "products.json"
IMAGES_DIR = BASE_DIR / "public" / "images" / "products" / "downloaded"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
}

DELAY = 0.8


def download_image(url, dest_path):
    """Download an image file with proper headers."""
    try:
        resp = requests.get(url, headers={
            **HEADERS,
            "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
            "Referer": "https://www.keplertech.ae/",
        }, timeout=30, stream=True)
        resp.raise_for_status()
        with open(dest_path, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        size = os.path.getsize(dest_path)
        return size
    except Exception as e:
        # Clean up partial file
        if os.path.exists(dest_path):
            os.remove(dest_path)
        raise e


def scrape_kepler_products_page():
    """Scrape the keplertech.ae/products/ page to find all product image URLs."""
    product_images = {}  # product_name_lower -> {url, image_url}
    
    # The site uses /products/ as the main listing
    urls_to_try = [
        "https://www.keplertech.ae/products/",
        "https://www.keplertech.ae/shop/",
    ]
    
    # Also try the category pages (singular form based on scrape_all.py)
    categories = [
        "office-printer", "plotter", "graphic-printer",
        "photo-printer", "scanner", "inkjet-media",
    ]
    for cat in categories:
        urls_to_try.append(f"https://www.keplertech.ae/product-category/{cat}/")
    
    for page_url in urls_to_try:
        print(f"\n🔍 Scraping: {page_url}")
        try:
            resp = requests.get(page_url, headers=HEADERS, timeout=30)
            if resp.status_code == 404:
                print(f"   404 - skipping")
                continue
            resp.raise_for_status()
        except Exception as e:
            print(f"   Error: {e}")
            continue
        
        soup = BeautifulSoup(resp.content, "html.parser")
        
        # Try multiple selectors for product listings
        products = (
            soup.select("ul.products li.product") or
            soup.select("li.product") or
            soup.select(".product-item") or
            soup.select(".wc-block-product") or
            soup.select("[class*='product']")
        )
        
        # Also find all links to individual product pages
        all_links = soup.find_all("a", href=True)
        product_page_links = []
        for link in all_links:
            href = link.get("href", "")
            if "/product/" in href and "/product-category/" not in href:
                product_page_links.append(href)
        
        print(f"   Found {len(products)} product items, {len(product_page_links)} product links")
        
        # Extract from product items
        for p in products:
            # Get name
            name_tag = p.select_one("h2, h3, .product-title, .woocommerce-loop-product__title")
            name = name_tag.get_text(strip=True) if name_tag else None
            
            # Get image
            img_tag = p.select_one("img")
            img_url = None
            if img_tag:
                img_url = (
                    img_tag.get("data-src") or
                    img_tag.get("data-lazy-src") or
                    img_tag.get("src")
                )
                # Try srcset for higher res
                srcset = img_tag.get("srcset", "")
                if srcset:
                    # Get the largest image from srcset
                    parts = srcset.split(",")
                    best_url = None
                    best_w = 0
                    for part in parts:
                        part = part.strip()
                        tokens = part.split()
                        if len(tokens) >= 2 and tokens[1].endswith("w"):
                            w = int(tokens[1][:-1])
                            if w > best_w:
                                best_w = w
                                best_url = tokens[0]
                    if best_url:
                        img_url = best_url
                        
                if img_url and img_url.startswith("data:"):
                    img_url = None
            
            # Get product page link
            link_tag = p.select_one("a[href*='/product/']") or p.select_one("a")
            product_link = link_tag.get("href") if link_tag else None
            
            if name and img_url:
                key = name.lower().strip()
                product_images[key] = {
                    "name": name,
                    "image_url": img_url,
                    "product_url": product_link,
                }
        
        # Also try scraping individual product pages for hi-res images
        unique_links = list(set(product_page_links))
        print(f"   Scraping {min(len(unique_links), 50)} product detail pages...")
        
        for link in unique_links[:50]:
            try:
                detail_resp = requests.get(link, headers=HEADERS, timeout=30)
                if detail_resp.status_code != 200:
                    continue
                detail_soup = BeautifulSoup(detail_resp.content, "html.parser")
                
                # Get product name
                title = detail_soup.select_one("h1.product_title, h1, .product-title")
                name = title.get_text(strip=True) if title else None
                
                # Get high-res image
                img = detail_soup.select_one(
                    ".woocommerce-product-gallery__image img, "
                    ".wp-post-image, "
                    ".product-image img"
                )
                img_url = None
                if img:
                    img_url = (
                        img.get("data-large_image") or
                        img.get("data-src") or
                        img.get("src")
                    )
                    if img_url and img_url.startswith("data:"):
                        img_url = None
                
                if name and img_url:
                    key = name.lower().strip()
                    product_images[key] = {
                        "name": name,
                        "image_url": img_url,
                        "product_url": link,
                    }
                
                time.sleep(DELAY)
            except Exception:
                continue
        
        time.sleep(DELAY)
    
    print(f"\n📊 Total product images found on keplertech: {len(product_images)}")
    return product_images


def match_product(product_name, kepler_data):
    """Find the best matching kepler product for a given product name."""
    name_lower = product_name.lower().strip()
    
    # Direct match
    if name_lower in kepler_data:
        return kepler_data[name_lower]
    
    # Fuzzy match based on word overlap
    name_words = set(re.findall(r'[a-z0-9]+', name_lower))
    
    best_match = None
    best_score = 0
    
    for key, data in kepler_data.items():
        key_words = set(re.findall(r'[a-z0-9]+', key))
        common = name_words & key_words
        # Weight model numbers higher
        model_pattern = re.findall(r'[a-z]*\d+[a-z]*', name_lower)
        model_matches = sum(1 for m in model_pattern if m in key)
        score = len(common) + (model_matches * 2)
        
        if score > best_score:
            best_score = score
            best_match = data
    
    if best_score >= 4:
        return best_match
    return None


def main():
    print("=" * 60)
    print("🚀 PRODUCT IMAGE DOWNLOADER")
    print("=" * 60)
    
    # Load products
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)
    
    # Find products with external images
    external_products = []
    for i, p in enumerate(products):
        img = p.get("image", "")
        if img.startswith("http"):
            external_products.append((i, p))
    
    print(f"\nProducts with external image URLs: {len(external_products)}")
    
    if not external_products:
        print("No external images to download!")
        return
    
    # Step 1: Scrape keplertech for current image URLs
    print("\n" + "─" * 40)
    print("STEP 1: Scraping keplertech.ae for product images...")
    print("─" * 40)
    kepler_data = scrape_kepler_products_page()
    
    # Step 2: Try to download images
    print("\n" + "─" * 40)
    print("STEP 2: Downloading images...")
    print("─" * 40)
    
    success = 0
    failed = 0
    skipped = 0
    
    for idx, product in external_products:
        name = product["name"]
        product_id = product["id"]
        current_url = product["image"]
        
        # Clean filename
        clean_id = re.sub(r'[^\w\-]', '_', product_id)
        ext = os.path.splitext(urlparse(current_url).path)[1] or ".png"
        filename = f"{clean_id}{ext}"
        dest = IMAGES_DIR / filename
        
        if dest.exists() and os.path.getsize(dest) > 1000:
            print(f"  ✓ SKIP (exists): {name[:50]}")
            products[idx]["image"] = f"/images/products/downloaded/{filename}"
            skipped += 1
            continue
        
        # Try 1: Match from keplertech scraped data
        matched = match_product(name, kepler_data)
        if matched:
            img_url = matched["image_url"]
            print(f"  🔗 Matched: {name[:50]}")
            print(f"     -> {img_url[:80]}")
            try:
                size = download_image(img_url, dest)
                print(f"     ✅ Downloaded ({size} bytes)")
                products[idx]["image"] = f"/images/products/downloaded/{filename}"
                success += 1
                time.sleep(DELAY)
                continue
            except Exception as e:
                print(f"     ❌ Failed: {e}")
        
        # Try 2: Direct download of current URL
        print(f"  📥 Direct download: {name[:50]}")
        try:
            size = download_image(current_url, dest)
            print(f"     ✅ Downloaded ({size} bytes)")
            products[idx]["image"] = f"/images/products/downloaded/{filename}"
            success += 1
            time.sleep(DELAY)
            continue
        except Exception as e:
            print(f"     ❌ Failed: {e}")
        
        # Try 3: Search for alternative URL patterns
        # For keplertech URLs, try different upload date folders
        if "keplertech.ae" in current_url:
            original_filename = current_url.split("/")[-1]
            alt_folders = ["2024/01", "2024/06", "2025/01", "2025/02", "2025/03"]
            for folder in alt_folders:
                alt_url = f"https://www.keplertech.ae/wp-content/uploads/{folder}/{original_filename}"
                try:
                    size = download_image(alt_url, dest)
                    print(f"     ✅ Alt URL worked: {folder} ({size} bytes)")
                    products[idx]["image"] = f"/images/products/downloaded/{filename}"
                    success += 1
                    break
                except Exception:
                    continue
            else:
                failed += 1
                continue
        
        # For Epson CDN URLs, try alternative patterns
        elif "cdn-eu.aglty.io" in current_url:
            # Try epson.com product images
            failed += 1
        else:
            failed += 1
    
    # Save updated products.json
    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    # Summary
    print("\n" + "=" * 60)
    print(f"✅ DOWNLOAD COMPLETE!")
    print(f"   Success:  {success}")
    print(f"   Skipped:  {skipped}")
    print(f"   Failed:   {failed}")
    print(f"   Total:    {success + skipped + failed}")
    
    remaining = sum(1 for p in products if p.get("image", "").startswith("http"))
    print(f"\n   Remaining external URLs: {remaining}")
    print("=" * 60)


if __name__ == "__main__":
    main()
