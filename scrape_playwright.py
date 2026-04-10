"""
Epson Africa + Canon CNA Scraper v3
====================================
- Epson Africa: Extract from React RSC data (headless Playwright)
- Canon CNA: Use their product API/sitemap (they block headless browsers)
"""
import re
import json
import os
import hashlib
import requests
import time
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright

IMAGE_DIR = os.path.join(os.path.dirname(__file__), "scraped_images")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "scraped_epson_canon.json")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"


def download_image(img_url, source_name, product_name):
    if not img_url or img_url.startswith("data:"):
        return None
    dest_dir = os.path.join(IMAGE_DIR, source_name)
    os.makedirs(dest_dir, exist_ok=True)
    clean_name = re.sub(r'[^\w\s-]', '', product_name or "product")[:80].strip()
    clean_name = re.sub(r'\s+', '_', clean_name)
    ext = os.path.splitext(urlparse(img_url).path)[1] or ".jpg"
    url_hash = hashlib.md5(img_url.encode()).hexdigest()[:8]
    filename = f"{clean_name}_{url_hash}{ext}"
    filepath = os.path.join(dest_dir, filename)
    if os.path.exists(filepath):
        return filepath
    try:
        resp = requests.get(img_url, headers={"User-Agent": UA}, timeout=30, stream=True)
        resp.raise_for_status()
        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        return filepath
    except Exception as e:
        return None


# ============================================================
# EPSON AFRICA
# ============================================================
EPSON_PAGES = [
    {"url": "https://www.epson-africa.com/printers?Classification=inkjet_home", "category": "Inkjet Printer"},
    {"url": "https://www.epson-africa.com/printers?Classification=inkjet_business", "category": "Business Printer"},
    {"url": "https://www.epson-africa.com/printers?classification=lfpcorporate", "category": "Large Format Printer"},
    {"url": "https://www.epson-africa.com/projectors", "category": "Projector"},
    {"url": "https://www.epson-africa.com/scanners", "category": "Scanner"},
]


def scrape_epson(page):
    all_products = []
    seen_ids = set()

    for cat in EPSON_PAGES:
        print(f"\n[Epson] {cat['category']}: {cat['url']}")
        try:
            page.goto(cat["url"], wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(3000)
        except Exception as e:
            print(f"  FAIL: {e}")
            continue

        # Scroll + load more
        for _ in range(10):
            page.evaluate("window.scrollBy(0, 600)")
            page.wait_for_timeout(400)
        for _ in range(15):
            try:
                btn = page.query_selector('button:has-text("Load more"), button:has-text("Show more")')
                if btn and btn.is_visible():
                    btn.click()
                    page.wait_for_timeout(2000)
                else:
                    break
            except:
                break

        html = page.content()

        # Method 1: Extract from RSC embedded data
        pattern1 = re.findall(r'"neonID":"(\d+)","productName":"([^"]+)"', html)
        pattern2 = re.findall(r'\\"neonID\\":\\"(\d+)\\",\\"productName\\":\\"([^\\]+)\\"', html)
        matches = pattern1 + pattern2

        # Also try to extract the full product objects with more fields
        # Look for basicheadline near each product
        for neon_id, raw_name in matches:
            if neon_id in seen_ids:
                continue
            seen_ids.add(neon_id)

            name = raw_name.replace('\u200b', '').replace('\u200B', '').strip()
            if len(name) < 3:
                continue

            # Find associated data
            idx = html.find(f'"neonID":"{neon_id}"')
            if idx == -1:
                idx = html.find(f'\\"neonID\\":\\"{neon_id}\\"')
            window = html[max(0, idx-200):idx+3000] if idx > -1 else ""

            # headline
            hl = re.search(r'(?:"basicheadline"|"basicheadline"):"([^"]+)"', window)
            if not hl:
                hl = re.search(r'\\"basicheadline\\":\\"([^\\]+)\\"', window)
            headline = hl.group(1) if hl and hl.group(1) != "$undefined" else None

            # image
            img_url = None
            img_m = re.findall(r'(https://cdn-eu\.aglty\.io/[^"\\]+\.(?:png|jpg|jpeg|webp))', window)
            if img_m:
                img_url = img_m[0]
            if not img_url:
                img_m = re.findall(r'(https://[^"\\]+epson[^"\\]*\.(?:png|jpg|jpeg|webp))', window, re.IGNORECASE)
                if img_m:
                    img_url = img_m[0]

            full_name = f"Epson {name}" if not name.lower().startswith("epson") else name

            all_products.append({
                "source": "epson-africa.com",
                "category": cat["category"],
                "name": full_name,
                "url": f"https://www.epson-africa.com/p/{neon_id}",
                "image_url": img_url,
                "short_description": headline,
                "brand": "Epson",
            })

        print(f"  Found {len(matches)} products ({len([m for m in matches if m[0] not in seen_ids or True])} new)")

    # Also try extracting directly from DOM (h4 + anchor combos)
    # Some products are visible as rendered cards
    print(f"\n[Epson] Total unique: {len(all_products)}")
    return all_products


# ============================================================
# CANON CNA — Scrape from their sitemap XML
# ============================================================
def scrape_canon_sitemap():
    """Canon CNA blocks headless browsers but their sitemap is accessible."""
    all_products = []

    # Try to get sitemap
    sitemap_urls = [
        "https://en.canon-cna.com/sitemap.xml",
        "https://en.canon-cna.com/sitemap_index.xml",
        "https://en.canon-cna.com/robots.txt",
    ]

    product_urls = []

    # First try robots.txt to find sitemaps
    try:
        resp = requests.get("https://en.canon-cna.com/robots.txt", headers={"User-Agent": UA}, timeout=15)
        if resp.ok:
            print(f"[Canon] robots.txt:\n{resp.text[:500]}")
            sitemap_matches = re.findall(r'Sitemap:\s*(https?://[^\s]+)', resp.text)
            sitemap_urls = sitemap_matches + sitemap_urls
    except:
        pass

    # Try each sitemap URL
    for surl in sitemap_urls:
        print(f"[Canon] Trying sitemap: {surl}")
        try:
            resp = requests.get(surl, headers={"User-Agent": UA}, timeout=15)
            if resp.ok:
                # Find product page URLs
                urls = re.findall(r'<loc>(https://en\.canon-cna\.com/[^<]+)</loc>', resp.text)
                product_like = [u for u in urls if any(p in u for p in ['/p/', '/products/', 'printers/', 'cameras/', 'lenses/', 'scanners/'])]
                print(f"  Found {len(urls)} URLs, {len(product_like)} product-like")
                product_urls.extend(product_like)

                # Also look for nested sitemaps
                nested = re.findall(r'<loc>(https://[^<]+sitemap[^<]*\.xml)</loc>', resp.text)
                for ns in nested[:5]:
                    print(f"  Nested sitemap: {ns}")
                    try:
                        nresp = requests.get(ns, headers={"User-Agent": UA}, timeout=15)
                        if nresp.ok:
                            nurls = re.findall(r'<loc>(https://en\.canon-cna\.com/[^<]+)</loc>', nresp.text)
                            nproduct = [u for u in nurls if any(p in u for p in ['/p/', '/products/', 'printers/', 'cameras/', 'lenses/', 'scanners/'])]
                            print(f"    Found {len(nurls)} URLs, {len(nproduct)} product-like")
                            product_urls.extend(nproduct)
                    except:
                        pass
        except Exception as e:
            print(f"  Failed: {e}")

    if not product_urls:
        print("[Canon] No sitemap available. Trying direct category page scrape...")
        return scrape_canon_direct()

    # Process found URLs
    seen = set()
    for url in product_urls:
        if url in seen:
            continue
        seen.add(url)

        # Extract product name from URL
        parts = url.rstrip('/').split('/')
        name_part = parts[-1] if parts else ""
        name = name_part.replace('-', ' ').title()

        # Determine category
        category = "Other"
        if 'printer' in url.lower() or '/printers/' in url:
            category = "Printer"
        elif 'camera' in url.lower() or '/cameras/' in url:
            category = "Camera"
        elif 'lens' in url.lower() or '/lenses/' in url:
            category = "Lens"
        elif 'scanner' in url.lower() or '/scanners/' in url:
            category = "Scanner"
        elif 'projector' in url.lower():
            category = "Projector"

        all_products.append({
            "source": "en.canon-cna.com",
            "category": category,
            "name": f"Canon {name}" if not name.lower().startswith("canon") else name,
            "url": url,
            "image_url": None,
            "brand": "Canon",
        })

    print(f"[Canon] Found {len(all_products)} products from sitemap")
    return all_products


def scrape_canon_direct():
    """Fallback: scrape Canon product pages directly with requests + BeautifulSoup."""
    from bs4 import BeautifulSoup
    all_products = []

    # Canon CNA category pages that might work with regular requests
    canon_cats = [
        ("https://en.canon-cna.com/printers/inkjet-printers/", "Inkjet Printer"),
        ("https://en.canon-cna.com/printers/laser-printers/", "Laser Printer"),
        ("https://en.canon-cna.com/cameras/mirrorless-cameras/", "Camera"),
        ("https://en.canon-cna.com/cameras/dslr-cameras/", "Camera"),
        ("https://en.canon-cna.com/lenses/rf-lenses/", "Lens"),
        ("https://en.canon-cna.com/scanners/", "Scanner"),
    ]

    # Try Canon's internal API
    api_urls = [
        "https://en.canon-cna.com/api/products",
        "https://en.canon-cna.com/api/v1/products",
    ]

    for api_url in api_urls:
        print(f"[Canon] Trying API: {api_url}")
        try:
            resp = requests.get(api_url, headers={"User-Agent": UA, "Accept": "application/json"}, timeout=15)
            if resp.ok:
                data = resp.json()
                print(f"  Got API data: {type(data)}")
                if isinstance(data, list):
                    for item in data[:5]:
                        print(f"    {item}")
        except Exception as e:
            print(f"  {e}")

    print(f"[Canon] Direct scrape got {len(all_products)} products")
    return all_products


# ============================================================
# MAIN
# ============================================================
def main():
    print("=" * 60)
    print("SCRAPER v3 - Epson Africa + Canon CNA")
    print("=" * 60)

    all_products = []

    # 1. Epson Africa (Playwright)
    print("\n--- EPSON AFRICA (Playwright) ---")
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent=UA,
        )
        page = ctx.new_page()
        epson_products = scrape_epson(page)
        browser.close()

    # Download Epson images
    print(f"\nDownloading {len(epson_products)} Epson images...")
    for i, p in enumerate(epson_products):
        img_path = download_image(p.get("image_url"), "epson_africa", p.get("name"))
        p["local_image"] = img_path
        if img_path:
            print(f"  [{i+1}] {p['name'][:40]}... OK")
    all_products.extend(epson_products)

    # 2. Canon CNA (sitemap/API approach)
    print("\n--- CANON CNA (sitemap/API) ---")
    canon_products = scrape_canon_sitemap()
    for p in canon_products:
        img_path = download_image(p.get("image_url"), "canon_cna", p.get("name"))
        p["local_image"] = img_path
    all_products.extend(canon_products)

    # Save
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)

    # Summary
    sources = {}
    cats = {}
    for p in all_products:
        sources[p.get("source", "?")] = sources.get(p.get("source", "?"), 0) + 1
        cats[p.get("category", "?")] = cats.get(p.get("category", "?"), 0) + 1

    print("\n" + "=" * 60)
    print(f"TOTAL: {len(all_products)} products")
    for src, count in sources.items():
        print(f"  {src}: {count}")
    print(f"\nBy category:")
    for cat, count in sorted(cats.items()):
        print(f"  {cat}: {count}")
    print(f"\nSaved to: {OUTPUT_FILE}")
    print("=" * 60)


if __name__ == "__main__":
    main()
