"""
Downloads real product images using Playwright (headless browser) to bypass CDN restrictions.
Uses Google Images for each product to find and download the first result.
"""
import os
import sys
import json
import asyncio
import time
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Installing playwright...")
    os.system(f"{sys.executable} -m pip install playwright")
    os.system(f"{sys.executable} -m playwright install chromium")
    from playwright.async_api import async_playwright

PRODUCTS_FILE = Path(__file__).parent.parent / "src" / "data" / "products.json"
IMG_DIR = Path(__file__).parent.parent / "public" / "images" / "products"

# Product search terms mapped to IDs for best Google Image results
SEARCH_TERMS = {
    # HP
    "hp-laserjet-pro-mfp-4101fdw": "HP LaserJet Pro MFP 4101fdw printer product photo transparent",
    "hp-color-laserjet-pro-mfp-4301fdw": "HP Color LaserJet Pro MFP 4301fdw printer product transparent",
    "hp-officejet-pro-9130e": "HP OfficeJet Pro 9130e All in One printer transparent",
    "hp-designjet-t650-36": "HP DesignJet T650 36 inch printer product photo transparent",
    "hp-scanjet-pro-3600-f1": "HP ScanJet Pro 3600 f1 scanner product transparent",
    # Lenovo
    "lenovo-thinkcentre-neo-50a": "Lenovo ThinkCentre Neo 50a All in One desktop transparent",
    "lenovo-ideapad-slim-5": "Lenovo IdeaPad Slim 5 14 laptop product transparent",
    "lenovo-thinkpad-x1-carbon-gen-12": "Lenovo ThinkPad X1 Carbon Gen 12 laptop transparent",
    "lenovo-legion-pro-5i-16": "Lenovo Legion Pro 5i 16 gaming laptop product transparent",
    "lenovo-tab-p12": "Lenovo Tab P12 tablet product photo transparent",
    # Dell
    "dell-inspiron-16-5640": "Dell Inspiron 16 5640 laptop product transparent",
    "dell-latitude-5550": "Dell Latitude 5550 business laptop transparent",
    "dell-optiplex-7020-tower": "Dell OptiPlex 7020 Tower desktop transparent",
    "dell-ultrasharp-u2724d": "Dell UltraSharp U2724D 27 monitor transparent",
    "dell-p2425h-monitor": "Dell P2425H 24 monitor product transparent",
    # DJI
    "dji-air-3": "DJI Air 3 drone product photo transparent",
    "dji-mini-4-pro": "DJI Mini 4 Pro drone product transparent",
    "dji-mavic-3-pro": "DJI Mavic 3 Pro drone product transparent",
    "dji-osmo-mobile-6": "DJI Osmo Mobile 6 gimbal product transparent",
    "dji-action-4": "DJI Osmo Action 4 camera transparent",
    # Godox
    "godox-ad600-pro": "Godox AD600Pro TTL flash strobe product transparent",
    "godox-v1-round-head-flash": "Godox V1 round head flash product transparent",
    "godox-sl200-iii": "Godox SL200III LED video light product transparent",
    "godox-xpro-ii-trigger": "Godox XPro II wireless flash trigger transparent",
    "godox-ml60": "Godox ML60 portable LED light product transparent",
    # Unomat
    "unomat-pro-1600-tripod": "professional aluminum camera tripod product transparent",
    "unomat-backpack-pro-300": "camera backpack professional product transparent",
    "unomat-sd-card-reader-usb3": "USB 3.0 multi card reader product transparent",
    "unomat-mini-flexible-tripod": "flexible mini tripod gorilla pod product transparent",
    # APC
    "apc-back-ups-pro-1500va": "APC Back-UPS Pro 1500VA UPS product transparent",
    "apc-smart-ups-smt1500ic": "APC Smart-UPS 1500VA LCD product transparent",
    "apc-essential-surgearrest-pm6u": "APC SurgeArrest surge protector product transparent",
    "apc-back-ups-650va": "APC Back-UPS 650VA product transparent",
    "apc-rack-pdu-basic": "APC Rack PDU 1U rackmount product transparent",
    # SanDisk
    "sandisk-extreme-pro-sdxc-256gb": "SanDisk Extreme PRO SDXC 256GB memory card transparent",
    "sandisk-extreme-pro-microsd-128gb": "SanDisk Extreme PRO microSD 128GB card transparent",
    "sandisk-ultra-dual-drive-go-128gb": "SanDisk Ultra Dual Drive Go USB-C flash drive transparent",
    "sandisk-extreme-portable-ssd-1tb": "SanDisk Extreme Portable SSD 1TB product transparent",
    "sandisk-extreme-pro-cfexpress-256gb": "SanDisk Extreme PRO CFexpress Type B 256GB transparent",
    # Lexar
    "lexar-professional-1800x-sdxc-256gb": "Lexar Professional 1800x SDXC 256GB card transparent",
    "lexar-professional-cfexpress-type-b-512gb": "Lexar Professional CFexpress Type B 512GB transparent",
    "lexar-professional-usb-c-reader": "Lexar Professional USB-C dual card reader transparent",
    "lexar-jumpdrive-m45-256gb": "Lexar JumpDrive M45 256GB USB flash drive transparent",
    "lexar-nm790-2tb-nvme-ssd": "Lexar NM790 2TB NVMe M.2 SSD product transparent",
}

async def download_with_browser():
    """Use Playwright to search Google Images and download the first result."""
    with open(PRODUCTS_FILE, encoding="utf-8") as f:
        products = json.load(f)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        success = 0
        failed = 0

        for prod_id, search_term in SEARCH_TERMS.items():
            filename = f"{prod_id}.webp"
            dest = IMG_DIR / filename
            local_path = f"/images/products/{filename}"

            # Skip if already downloaded successfully
            if dest.exists() and dest.stat().st_size > 5000:
                print(f"[SKIP] {prod_id} - already exists")
                for prod in products:
                    if prod["id"] == prod_id:
                        prod["image"] = local_path
                        break
                success += 1
                continue

            print(f"Searching: {prod_id}...")
            try:
                # Go to Google Images
                search_url = f"https://www.google.com/search?q={search_term}&tbm=isch&tbs=ic:trans"
                await page.goto(search_url, wait_until="domcontentloaded", timeout=15000)
                await page.wait_for_timeout(2000)

                # Get image sources from thumbnail results
                img_srcs = await page.evaluate("""
                    () => {
                        const images = document.querySelectorAll('img[data-src], img.YQ4gaf');
                        const srcs = [];
                        for (const img of images) {
                            const src = img.getAttribute('data-src') || img.getAttribute('src');
                            if (src && src.startsWith('http') && !src.includes('google') && src.length > 100) {
                                srcs.push(src);
                            }
                        }
                        return srcs.slice(0, 3);
                    }
                """)

                if not img_srcs:
                    # Try alternative selector
                    img_srcs = await page.evaluate("""
                        () => {
                            const images = document.querySelectorAll('img');
                            const srcs = [];
                            for (const img of images) {
                                const src = img.src;
                                if (src && src.startsWith('http') && !src.includes('google') && !src.includes('gstatic') && src.length > 50) {
                                    srcs.push(src);
                                }
                            }
                            return srcs.slice(0, 5);
                        }
                    """)

                downloaded = False
                for img_url in img_srcs:
                    try:
                        resp = await page.request.get(img_url, timeout=10000)
                        if resp.ok:
                            body = await resp.body()
                            if len(body) > 3000:
                                with open(dest, "wb") as f:
                                    f.write(body)
                                downloaded = True
                                break
                    except Exception:
                        continue

                if downloaded:
                    for prod in products:
                        if prod["id"] == prod_id:
                            prod["image"] = local_path
                            break
                    success += 1
                    print(f"  [OK] Saved: {filename} ({dest.stat().st_size / 1024:.0f}KB)")
                else:
                    failed += 1
                    print(f"  [FAIL] No usable image found")

            except Exception as e:
                failed += 1
                print(f"  [FAIL] {e}")

            await page.wait_for_timeout(1500)  # Rate limit

        await browser.close()

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"\nDone! Downloaded: {success}, Failed: {failed}")


if __name__ == "__main__":
    asyncio.run(download_with_browser())
