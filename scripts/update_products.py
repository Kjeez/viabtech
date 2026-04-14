import json
from pathlib import Path

PRODUCTS_FILE = Path(r"E:\viabtech\src\data\products.json")

NEW_PRODUCTS = [
    # ============================================================
    # Canon imageFORMULA P-215II
    # Source: canon-europe.com, canon.com, canon-cna.com, cdw.com
    # ============================================================
    {
        "id": "canon-imageformula-p-215ii",
        "name": "Canon imageFORMULA P-215II",
        "brand": "Canon",
        "category": "Scanner",
        "type": "Portable Document Scanner",
        "image": "/images/products/canon-imageformula-p-215ii.webp",
        "description": "The Canon imageFORMULA P-215II is a compact, ultra-portable USB-powered document scanner designed for professionals on the move. Capable of scanning both sides of a document simultaneously at up to 15 ppm / 30 ipm (USB 3.0), it accepts a wide range of card and document sizes from business cards up to A4. With a 20-sheet ADF, no external power supply required, and bundled CaptureOnTouch software, it is the ideal companion for home office and mobile workers.",
        "features": [
            "Up to 15 ppm / 30 ipm duplex scanning (USB 3.0)",
            "USB bus-powered — no external power adapter required",
            "20-sheet automatic document feeder",
            "Scans from business cards to A4 (up to 3,000 mm long documents)",
            "600 dpi optical resolution for sharp, detailed scans",
            "Compatible with Windows and macOS",
            "Bundled CaptureOnTouch and Card Capture Pro software",
            "Ultra-compact at 285 x 95 x 40 mm and 1.0 kg"
        ],
        "specs": {
            "scannerType": "Portable ADF Document Scanner",
            "scanSpeedUsb3": "Up to 15 ppm / 30 ipm (B&W/Greyscale) | Up to 10 ppm / 20 ipm (Colour) at 300 dpi",
            "scanSpeedUsb2": "Up to 12 ppm / 14 ipm (B&W/Greyscale) | Up to 10 ppm / 10 ipm (Colour) at 300 dpi",
            "opticalResolution": "600 dpi",
            "adfCapacity": "20 sheets",
            "documentSizes": "Min. 50.8 x 53.9 mm to Max. 216 x 3,000 mm (long document mode)",
            "dailyDutyCycle": "500 – 700 scans per day",
            "connectivity": "Hi-Speed USB 2.0 / USB 3.0",
            "power": "USB bus-powered (no external adapter)",
            "scanModes": "Simplex (front/back), Duplex",
            "dimensions": "285 x 95 x 40 mm (W x D x H, trays closed)",
            "weight": "Approx. 1.0 kg",
            "operatingSystemCompatibility": "Windows 11/10/8.1 and macOS",
            "bundledSoftware": "CaptureOnTouch, Card Capture Pro"
        },
        "inStock": True,
        "featured": False
    },

    # ============================================================
    # Canon imageFORMULA R10
    # Source: canon.com, canon-cna.com, pcmag.com, bhphotovideo.com
    # ============================================================
    {
        "id": "canon-imageformula-r10",
        "name": "Canon imageFORMULA R10",
        "brand": "Canon",
        "category": "Scanner",
        "type": "Portable Document Scanner",
        "image": "/images/products/canon-imageformula-r10.webp",
        "description": "The Canon imageFORMULA R10 is an ultra-compact, USB bus-powered portable scanner that requires no driver installation, making it ideal for shared and mobile computing environments. Using the built-in CaptureOnTouch Lite software that runs directly from the scanner, users can start scanning immediately. With a 20-sheet ADF, duplex scanning at up to 12 ppm, and 600 dpi optical resolution, it delivers reliable digitisation of documents and receipts in a remarkably lightweight 0.9 kg body.",
        "features": [
            "No driver installation required — CaptureOnTouch Lite runs from the scanner",
            "USB bus-powered with a single USB-C cable",
            "20-sheet ADF with duplex scanning support",
            "Up to 12 ppm / 14 ipm duplex scanning",
            "600 dpi optical resolution",
            "Daily duty cycle of approx. 500 scans",
            "Ultra-lightweight at just 0.9 kg",
            "Compatible with Windows and macOS"
        ],
        "specs": {
            "scannerType": "Portable ADF Document Scanner",
            "scanSpeed": "B&W/Greyscale: Up to 12 ppm (simplex) / 14 ipm (duplex) | Colour: Up to 9 ppm (simplex) / 10 ipm (duplex) at 300 dpi",
            "opticalResolution": "600 dpi",
            "adfCapacity": "20 sheets",
            "documentSizes": "Min. 50.8 x 70 mm to Max. 216 x 3,000 mm (long document mode)",
            "dailyDutyCycle": "Approx. 500 scans per day",
            "connectivity": "USB 2.0 (USB-C connector)",
            "power": "USB bus-powered (no external adapter)",
            "scanModes": "Simplex (front/back), Duplex",
            "dimensions": "285 x 95 x 40 mm (W x D x H, trays closed)",
            "weight": "Approx. 0.9 kg",
            "operatingSystemCompatibility": "Windows 11/10/8.1 and macOS",
            "bundledSoftware": "CaptureOnTouch Lite (runs from device, no installation required)"
        },
        "inStock": True,
        "featured": False
    },

    # ============================================================
    # Canon imageFORMULA P-208II
    # Source: canon.com, canon-cna.com, bhphotovideo.com, dell.com
    # ============================================================
    {
        "id": "canon-imageformula-p-208ii",
        "name": "Canon imageFORMULA P-208II",
        "brand": "Canon",
        "category": "Scanner",
        "type": "Portable Document Scanner",
        "image": "/images/products/canon-imageformula-p-208ii.webp",
        "description": "The Canon imageFORMULA P-208II is an ultra-compact, pocket-sized portable scanner perfect for digitising receipts, business cards, and A4 documents while travelling. Weighing just 600g and powered entirely via USB, it features a 10-sheet ADF and scans at up to 8 ppm (simplex) / 16 ipm (duplex) with 600 dpi optical resolution. Its slim, lightweight form factor makes it the go-to scanner for true mobility.",
        "features": [
            "Pocket-sized ultra-portable design at just 600g",
            "USB bus-powered — no external power adapter needed",
            "10-sheet ADF with front, back, and duplex scanning",
            "8 ppm simplex / 16 ipm duplex scanning speed",
            "600 dpi optical resolution for crisp, clear scans",
            "Scans documents from 50.8mm wide up to A4 (216mm)",
            "Compatible with Windows and macOS",
            "Bundled CaptureOnTouch software"
        ],
        "specs": {
            "scannerType": "Portable ADF Document Scanner",
            "scanSpeed": "Up to 8 ppm (simplex) / 16 ipm (duplex) at 300 dpi",
            "opticalResolution": "600 dpi",
            "adfCapacity": "10 sheets (at 64 g/m²)",
            "documentWidth": "Min. 50.8 mm to Max. 216 mm (8.5 inches)",
            "documentLength": "Min. 70.9 mm to Max. 355.8 mm (standard) / up to 3,000 mm (long document mode)",
            "dailyDutyCycle": "Up to 500 scans per day",
            "connectivity": "Hi-Speed USB 2.0",
            "power": "USB bus-powered (no external adapter)",
            "scanModes": "Front-side only, Back-side only, Duplex",
            "dimensionsClosed": "40 x 312.5 x 56.5 mm (H x W x D)",
            "dimensionsOpen": "40 x 312.5 x 89.5 mm (H x W x D)",
            "weight": "Approx. 600g",
            "operatingSystemCompatibility": "Windows 11/10/8.1 and macOS",
            "bundledSoftware": "CaptureOnTouch"
        },
        "inStock": True,
        "featured": False
    },
]


def main():
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        existing_products = json.load(f)

    existing_ids = {p["id"]: i for i, p in enumerate(existing_products)}
    updated = 0
    added = 0

    for new_p in NEW_PRODUCTS:
        if new_p["id"] in existing_ids:
            existing_products[existing_ids[new_p["id"]]] = new_p
            print(f"  UPDATED: {new_p['name']}")
            updated += 1
        else:
            existing_products.append(new_p)
            print(f"  ADDED:   {new_p['name']}")
            added += 1

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing_products, f, indent=2, ensure_ascii=False)

    print(f"\nUpdated: {updated} | Added: {added} | Total: {len(existing_products)}")


if __name__ == "__main__":
    main()
