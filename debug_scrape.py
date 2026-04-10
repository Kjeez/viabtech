"""
Debug scraper — capture rendered HTML from both sites to analyze DOM structure.
"""
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "debug_html")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    ("epson_printers.html", "https://www.epson-africa.com/printers?Classification=inkjet_home"),
    ("epson_scanners.html", "https://www.epson-africa.com/scanners"),
    ("canon_inkjet.html", "https://en.canon-cna.com/printers/inkjet-printers/"),
    ("canon_cameras.html", "https://en.canon-cna.com/cameras/mirrorless-cameras/"),
    ("canon_scanners.html", "https://en.canon-cna.com/scanners/"),
]

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
    )
    page = context.new_page()

    for filename, url in PAGES:
        print(f"Loading: {url}")
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(3000)

            # Handle cookie consent
            try:
                cookie_btn = page.query_selector('#onetrust-accept-btn-handler, button:has-text("Accept All")')
                if cookie_btn and cookie_btn.is_visible():
                    cookie_btn.click()
                    page.wait_for_timeout(1000)
            except:
                pass

            # Scroll to trigger lazy loading
            for _ in range(5):
                page.evaluate("window.scrollBy(0, 800)")
                page.wait_for_timeout(500)

            # Save rendered HTML
            html = page.content()
            filepath = os.path.join(OUTPUT_DIR, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"  Saved {len(html)} chars to {filename}")

        except Exception as e:
            print(f"  Failed: {e}")

    browser.close()
    print("Done! Check debug_html/ folder.")
