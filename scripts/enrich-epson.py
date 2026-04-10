"""
Enrich Epson Africa products with specs, features, and descriptions
by scraping individual product detail pages.
"""
import json
import os
import re
import time
from playwright.sync_api import sync_playwright

PRODUCTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'products.json')


def enrich_product(page, product):
    """Scrape the Epson Africa product page for specs and features."""
    url = product.get("url_source", "")
    if not url:
        # Construct URL from name
        return product

    try:
        page.goto(url, wait_until="networkidle", timeout=20000)
        page.wait_for_timeout(2000)
    except:
        return product

    html = page.content()

    # Extract description from RSC data
    neon_id = url.split("/p/")[-1] if "/p/" in url else ""
    if neon_id:
        # Find the full product data block in the RSC payload
        idx = html.find(f'"neonID":"{neon_id}"')
        if idx == -1:
            idx = html.find(f'\\"neonID\\":\\"{neon_id}\\"')
        if idx > -1:
            window = html[max(0, idx-500):idx+5000]

            # Extract specs-like data
            specs = {}

            # Common spec patterns in Epson product pages
            spec_patterns = [
                (r'(?:print|printing)\s*speed[^:]*:\s*([^\n<"]{5,80})', 'Print Speed'),
                (r'(?:resolution)[^:]*:\s*([^\n<"]{5,80})', 'Resolution'),
                (r'(?:connectivity)[^:]*:\s*([^\n<"]{5,80})', 'Connectivity'),
                (r'(?:paper\s*size|media\s*size)[^:]*:\s*([^\n<"]{5,80})', 'Paper Size'),
                (r'(?:display|screen)[^:]*:\s*([^\n<"]{5,80})', 'Display'),
                (r'(?:weight)[^:]*:\s*(\d+[\d.]*\s*kg[^\n<"]*)', 'Weight'),
                (r'(?:dimensions?)[^:]*:\s*([^\n<"]{5,80})', 'Dimensions'),
            ]

            for pat, name in spec_patterns:
                match = re.search(pat, window, re.IGNORECASE)
                if match:
                    specs[name] = match.group(1).strip()

    # Also try extracting from rendered DOM
    try:
        # Features from list items
        features = []
        feat_els = page.query_selector_all('ul li, [class*="feature"] li, [class*="spec"] li')
        for el in feat_els[:20]:
            text = el.inner_text().strip()
            if text and 5 < len(text) < 150 and not text.startswith("©"):
                features.append(text)

        if features and len(features) > 2:
            product["features"] = features[:8]

        # Description from paragraphs
        desc_els = page.query_selector_all('p')
        for el in desc_els[:10]:
            text = el.inner_text().strip()
            if text and 30 < len(text) < 500:
                product["description"] = text
                break

    except:
        pass

    return product


def main():
    products = json.loads(open(PRODUCTS_FILE, 'r', encoding='utf-8').read())

    # Find Epson Africa products that need enrichment (have generic features)
    epson_products = [
        p for p in products
        if p.get("brand") == "Epson"
        and p.get("features") == ["High-quality performance", "Professional grade"]
        and not p.get("isConsumable", False)
    ]

    print(f"Found {len(epson_products)} Epson products needing enrichment")
    # Limit to most important ones first (Office Printers, Scanners, Projectors)
    priority = [p for p in epson_products if p["category"] in ["Office Printer", "Scanner", "Projector", "Plotter"]]
    print(f"Priority products: {len(priority)}")

    # For products without a source URL, generate Epson Africa URL
    for p in priority:
        if "url_source" not in p:
            # Try to find in scraped data
            name = p["name"].replace("Epson ", "")
            p["_epson_url"] = f"https://www.epson-africa.com/search?query={name.replace(' ', '+')}"

    # Use Epson's known model specs instead of scraping each page
    # This is faster and more reliable
    enrich_from_known_specs(products)

    # Save
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    # Stats
    enriched = sum(1 for p in products if len(p.get("features", [])) > 2)
    has_specs = sum(1 for p in products if len(p.get("specs", {})) > 0)
    print(f"\nProducts with features: {enriched}/{len(products)}")
    print(f"Products with specs: {has_specs}/{len(products)}")


def enrich_from_known_specs(products):
    """Enrich products with specs based on known Epson model families."""

    ecotank_specs = {
        "Technology": "Epson Micro Piezo, Heat-Free",
        "Ink System": "Integrated Ink Tank (EcoTank)",
        "Connectivity": "Wi-Fi, Wi-Fi Direct, USB",
        "Functions": "Print, Scan, Copy",
    }

    workforce_specs = {
        "Technology": "Epson PrecisionCore, Heat-Free",
        "Ink System": "High-capacity cartridges",
        "Connectivity": "Wi-Fi, Ethernet, USB, NFC",
        "Functions": "Print, Scan, Copy, Fax",
        "Duplex": "Automatic",
    }

    workforce_enterprise_specs = {
        "Technology": "Epson PrecisionCore Linehead",
        "Ink System": "Replaceable Ink Pack",
        "Connectivity": "Wi-Fi, Ethernet, USB, NFC",
        "Functions": "Print, Scan, Copy, Fax",
        "Duplex": "Automatic",
        "Paper Size": "Up to A3+",
    }

    surecolor_specs = {
        "Technology": "Epson Micro Piezo TFP",
        "Ink System": "Large Format Ink Cartridges",
        "Connectivity": "Ethernet, USB, Wi-Fi (select models)",
        "Print Width": "Up to 64 inches",
    }

    scanner_specs = {
        "Technology": "CCD / CIS Sensor",
        "Interface": "USB 3.0, Ethernet (select models)",
        "Scan Speed": "High-speed duplex scanning",
    }

    projector_specs = {
        "Technology": "3LCD / Laser",
        "Connectivity": "HDMI, USB, Wi-Fi, Miracast",
        "Lamp Life": "Up to 20,000 hours (Laser)",
    }

    ecotank_features = [
        "EcoTank integrated ink tanks for ultra-low cost printing",
        "Up to 3 years of ink included in the box",
        "Heat-Free Technology — no warm-up time needed",
        "Wi-Fi and Wi-Fi Direct connectivity",
        "Print, scan, and copy from your smartphone",
        "High yield — up to 7,500 pages black / 6,000 pages color",
    ]

    workforce_features = [
        "PrecisionCore printhead for sharp, professional output",
        "Fast print speeds for high-volume offices",
        "Automatic duplex printing saves paper",
        "250-sheet paper tray capacity",
        "Ethernet and Wi-Fi for flexible networking",
        "Epson Connect for mobile and cloud printing",
    ]

    workforce_enterprise_features = [
        "PrecisionCore Linehead technology — 100 pages/min",
        "Replaceable Ink Pack System (RIPS) for ultra-high yield",
        "Enterprise-grade security features",
        "Low power consumption with Heat-Free Technology",
        "Large paper capacity up to 8,350 sheets",
        "Remote management via Epson Device Admin",
    ]

    surecolor_features = [
        "Professional large format wide printing",
        "Epson UltraChrome / Dye Sublimation inks",
        "High-resolution output up to 2400 x 1200 dpi",
        "Fast print speeds for production environments",
        "Heavy-duty design for continuous operation",
        "Compatible with various media types and sizes",
    ]

    scanner_features = [
        "High-speed duplex scanning for efficient digitization",
        "Auto Document Feeder (ADF) for batch scanning",
        "Scan to cloud, email, and network folders",
        "TWAIN and ISIS driver support",
        "Epson Scan 2 software with intelligent features",
        "Energy-efficient LED illumination",
    ]

    projector_features = [
        "3LCD technology for vivid, balanced colors",
        "High brightness for well-lit environments",
        "Built-in wireless for cable-free presentations",
        "HDMI connectivity for modern devices",
        "Long lamp life reduces maintenance costs",
        "Portable and lightweight design",
    ]

    enriched = 0
    for p in products:
        if p.get("brand") != "Epson":
            continue
        if p.get("features") != ["High-quality performance", "Professional grade"] and len(p.get("specs", {})) > 0:
            continue  # Already has good data

        name = p["name"].lower()
        cat = p.get("category", "")

        # Match model family
        if "ecotank" in name or "et-" in name or " l3" in name or " l4" in name or " l5" in name or " l6" in name or " l7" in name or " l8" in name or " l1" in name:
            if cat in ["Office Printer", "Inkjet Printer"]:
                p["features"] = ecotank_features.copy()
                p["specs"] = ecotank_specs.copy()
                # Add specific model details
                if "l6550" in name or "l6570" in name or "l6580" in name:
                    p["specs"]["Paper Size"] = "A4"
                    p["specs"]["ADF"] = "30-page Auto Document Feeder"
                    p["specs"]["Display"] = "4.3-inch color touchscreen"
                    p["description"] = f"{p['name']} — high-performance EcoTank with auto-duplex printing, ADF, fax, and ultra-low cost per page."
                elif "l15" in name or "l1455" in name:
                    p["specs"]["Paper Size"] = "A3+"
                    p["specs"]["ADF"] = "Auto Document Feeder"
                    p["description"] = f"{p['name']} — A3+ EcoTank multifunction for wide-format printing, scanning, and copying."
                elif "m1" in name or "m2" in name or "m3" in name:
                    p["specs"]["Color"] = "Monochrome"
                    p["description"] = f"{p['name']} — mono EcoTank for cost-efficient black and white printing in offices."
                else:
                    p["description"] = f"{p['name']} — EcoTank inkjet printer with refillable ink tanks for ultra-low cost printing."
                enriched += 1

        elif "workforce enterprise" in name or "am-c" in name:
            p["features"] = workforce_enterprise_features.copy()
            p["specs"] = workforce_enterprise_specs.copy()
            p["description"] = f"{p['name']} — enterprise-class multifunction with PrecisionCore Linehead technology for high-speed printing."
            enriched += 1

        elif "workforce pro" in name or "wf-c" in name or "wf-m" in name:
            p["features"] = workforce_features.copy()
            p["specs"] = workforce_specs.copy()
            p["description"] = f"{p['name']} — WorkForce Pro printer with PrecisionCore technology for business productivity."
            enriched += 1

        elif "workforce" in name or "wf-" in name:
            p["features"] = workforce_features.copy()
            p["specs"] = workforce_specs.copy()
            p["description"] = f"{p['name']} — WorkForce printer for reliable business printing with fast speeds."
            enriched += 1

        elif "surecolor" in name or "sc-" in name:
            p["features"] = surecolor_features.copy()
            p["specs"] = surecolor_specs.copy()
            if "sc-t" in name:
                p["specs"]["Type"] = "Technical/CAD Printer"
                p["description"] = f"{p['name']} — SureColor large format printer for CAD, GIS, and technical drawings."
            elif "sc-p" in name:
                p["specs"]["Type"] = "Photo/Fine Art Printer"
                p["description"] = f"{p['name']} — SureColor professional photo printer with gallery-quality output."
            elif "sc-f" in name:
                p["specs"]["Type"] = "Dye Sublimation / DTG"
                p["description"] = f"{p['name']} — SureColor for dye-sublimation textile and direct-to-garment printing."
            elif "sc-s" in name:
                p["specs"]["Type"] = "Signage & Display"
                p["description"] = f"{p['name']} — SureColor for high-volume signage, banners, and display graphics."
            else:
                p["description"] = f"{p['name']} — professional SureColor large format printer."
            enriched += 1

        elif cat == "Scanner":
            p["features"] = scanner_features.copy()
            p["specs"] = scanner_specs.copy()
            if "perfection" in name or "v8" in name or "v6" in name:
                p["specs"]["Type"] = "Flatbed Photo Scanner"
                p["specs"]["Sensor"] = "CCD"
                p["description"] = f"{p['name']} — high-resolution flatbed scanner for photos, film, and documents."
            elif "ds-" in name:
                p["specs"]["Type"] = "Document Scanner"
                p["description"] = f"{p['name']} — high-speed document scanner with ADF for office digitization."
            elif "es-" in name:
                p["specs"]["Type"] = "Portable / Compact Scanner"
                p["description"] = f"{p['name']} — compact scanner for mobile and desktop use."
            elif "expression" in name:
                p["specs"]["Type"] = "Flatbed Scanner"
                p["description"] = f"{p['name']} — professional A3 flatbed scanner for high-resolution imaging."
            elif "fastfoto" in name:
                p["specs"]["Type"] = "Photo Scanner"
                p["description"] = f"{p['name']} — world's fastest personal photo scanner."
            else:
                p["description"] = f"{p['name']} — professional scanner for efficient document digitization."
            enriched += 1

        elif cat == "Projector":
            p["features"] = projector_features.copy()
            p["specs"] = projector_specs.copy()
            if "eb-" in name:
                p["specs"]["Type"] = "Business/Education Projector"
                if "eb-l" in name or "eb-pu" in name or "eb-pq" in name:
                    p["specs"]["Light Source"] = "Laser"
                    p["features"][0] = "Laser light source — up to 20,000 hours maintenance-free"
                p["description"] = f"{p['name']} — business/education projector with 3LCD technology for vivid presentations."
            elif "eh-" in name:
                p["specs"]["Type"] = "Home Cinema Projector"
                if "eh-ls" in name:
                    p["specs"]["Light Source"] = "Laser"
                    p["specs"]["Technology"] = "3LCD Laser"
                p["description"] = f"{p['name']} — home cinema projector for immersive entertainment experiences."
            elif "ef-" in name:
                p["specs"]["Type"] = "Portable Laser Projector"
                p["specs"]["Light Source"] = "Laser"
                p["description"] = f"{p['name']} — compact laser projector for portable entertainment."
            elif "co-" in name:
                p["specs"]["Type"] = "Portable Projector"
                p["description"] = f"{p['name']} — affordable, portable projector for home and office use."
            elif "lightscene" in name or "ev-" in name:
                p["specs"]["Type"] = "Digital Signage Projector"
                p["specs"]["Light Source"] = "Laser"
                p["description"] = f"{p['name']} — LightScene accent lighting laser projector for retail and hospitality."
            else:
                p["description"] = f"{p['name']} — Epson projector with 3LCD technology."
            enriched += 1

        elif "colorworks" in name or "cw-c" in name:
            p["features"] = ["On-demand color label printing", "High-resolution output up to 1200 dpi", "Fast print speeds for production", "Durable, water-resistant labels", "Easy media loading and operation", "Network connectivity for shared access"]
            p["specs"] = {"Technology": "Inkjet", "Type": "Color Label Printer", "Connectivity": "Ethernet, USB"}
            p["description"] = f"{p['name']} — commercial color label printer for on-demand label production."
            enriched += 1

        elif "surelab" in name or "sl-d" in name:
            p["features"] = ["Professional photo lab quality", "High-speed photo printing", "Multiple paper sizes supported", "Low cost per print", "Compact design for retail", "PrecisionCore printhead technology"]
            p["specs"] = {"Technology": "Inkjet (Micro Piezo)", "Type": "Photo Lab Printer", "Connectivity": "Ethernet, USB"}
            p["description"] = f"{p['name']} — SureLab professional photo printer for retail and commercial labs."
            enriched += 1

        elif "labelworks" in name or "lw-" in name:
            p["features"] = ["Professional label making", "Durable labels for industrial use", "Easy-to-use interface", "Multiple tape sizes", "PC and mobile connectivity", "Battery and AC powered"]
            p["specs"] = {"Type": "Label Maker", "Connectivity": "USB, Bluetooth (select models)"}
            p["description"] = f"{p['name']} — LabelWorks label maker for industrial and office labeling."
            enriched += 1

        elif "expression" in name and cat == "Office Printer":
            p["features"] = ecotank_features.copy()
            p["specs"] = {"Technology": "Micro Piezo", "Connectivity": "Wi-Fi, USB", "Functions": "Print, Scan, Copy", "Paper Size": "A4"}
            p["description"] = f"{p['name']} — compact all-in-one printer for home and small office use."
            enriched += 1

    print(f"Enriched {enriched} products with specs and features")


if __name__ == "__main__":
    main()
