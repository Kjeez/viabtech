import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_printers():
    base_url = "https://www.keplertech.ae/products/office-printer/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    all_products = []
    current_url = base_url

    while current_url:
        print(f"Scraping {current_url}...")
        try:
            resp = requests.get(current_url, headers=headers)
            resp.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch {current_url}: {e}")
            break

        # Decode properly to avoid decoding errors for special characters
        resp.encoding = resp.apparent_encoding 
        soup = BeautifulSoup(resp.content, "html.parser")

        # Find product cards (Elementor specific or WooCommerce fallback)
        products = soup.find_all("div", class_=lambda c: c and "mgpde-card" in c)
        if not products:
            products = soup.find_all("li", class_=lambda c: c and "product" in c.lower())

        for p in products:
            # 1. Product URL & 2. Main Image
            link_tag = p.find("a")
            product_url = link_tag.get("href") if link_tag else None

            img_tag = p.find("img")
            img_url = None
            if img_tag:
                # Prioritize real image over lazy-loaded SVG placeholder
                img_url = img_tag.get("data-src") or img_tag.get("data-lazy-src") or img_tag.get("src")

            # 3. Product Name
            title_tag = p.find(["h2", "h3"], class_=lambda c: c and ("title" in c.lower() or "name" in c.lower()))
            if not title_tag:
                 title_tag = p.find(class_=lambda c: c and "title" in c.lower())
            
            product_name = title_tag.get_text(strip=True) if title_tag else None
            if not product_name and img_tag:
                product_name = img_tag.get("alt")

            # 4. Price
            price_tag = p.find(class_=lambda c: c and ("price" in c.lower() or "amount" in c.lower()))
            price = price_tag.get_text(strip=True) if price_tag else None

            # 5. Short Description
            desc_tag = p.find(class_=lambda c: c and "desc" in c.lower())
            short_desc = desc_tag.get_text(strip=True) if desc_tag else None

            # Use dictionary representation and avoid duplicates (since grid may have redundant inner elements)
            if product_url and product_name:
                all_products.append({
                    "name": product_name.replace("", ""), # Final cleanup of unknown chars if any
                    "url": product_url,
                    "image": img_url,
                    "price": price,
                    "short_description": short_desc
                })

        # Pagination: find the next page link (generally 'next page-numbers' or 'next')
        next_page = soup.find("a", class_=lambda c: c and "next" in str(c).lower())
        if next_page and next_page.get("href"):
            current_url = next_page.get("href")
        else:
            current_url = None

        if current_url:
            time.sleep(1) # Respectful delay

    # Save to JSON
    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=4, ensure_ascii=False)

    print(f"Scraping complete! Found {len(all_products)} products. Saved to products.json.")

if __name__ == "__main__":
    scrape_printers()
