"""
Canon CNA Product Catalog — Manually compiled from Canon Africa/CNA product lineup.
Adds Canon printers, scanners, and office MFPs to the Viabtech product catalog.
Downloads product images from Canon's CDN.
"""
import json
import os
import hashlib
import urllib.request

PRODUCTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'products.json')
IMG_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'products', 'canon_cna')
os.makedirs(IMG_DIR, exist_ok=True)

def slug(name):
    return name.lower().replace(' ', '-').replace('/', '-').replace('"', '').replace("'", '').replace(',', '').replace('(', '').replace(')', '').replace('---', '-').replace('--', '-')

def download_image(url, name):
    """Download image, return local path."""
    ext = url.split('.')[-1].split('?')[0]
    if ext not in ('jpg', 'jpeg', 'png', 'webp'):
        ext = 'jpg'
    h = hashlib.md5(name.encode()).hexdigest()[:8]
    safe_name = name.replace(' ', '_').replace('/', '_').replace('"', '').replace("'", '')[:60]
    filename = f"{safe_name}_{h}.{ext}"
    filepath = os.path.join(IMG_DIR, filename)
    
    if os.path.exists(filepath):
        return f"/images/products/canon_cna/{filename}"
    
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(filepath, 'wb') as f:
                f.write(resp.read())
        print(f"  ✅ Downloaded: {filename}")
        return f"/images/products/canon_cna/{filename}"
    except Exception as e:
        print(f"  ❌ Failed: {name}: {e}")
        return ""

# ===== Canon CNA Product Catalog =====
canon_products = [
    # ── PIXMA Home Printers ──
    {
        "name": "Canon PIXMA TS3440",
        "category": "Office Printer",
        "type": "Home Printer",
        "description": "Canon PIXMA TS3440 — compact wireless all-in-one printer for everyday home printing, scanning, and copying with Wi-Fi connectivity.",
        "image_url": "https://static-cdn.canon-cna.com/product/PIXMA_TS3440/PIXMA_TS3440_default_tcm14-2471858.png",
        "specs": {"Technology": "Inkjet", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4", "Display": "1.5-inch LCD"},
        "features": ["Wireless printing from mobile devices", "Compact design for small spaces", "Easy setup with Canon PRINT app", "Borderless photo printing"]
    },
    {
        "name": "Canon PIXMA TS5340a",
        "category": "Office Printer",
        "type": "Home Printer",
        "description": "Canon PIXMA TS5340a — versatile 3-in-1 wireless printer with 5-ink system for vibrant photos and crisp documents.",
        "image_url": "https://static-cdn.canon-cna.com/product/PIXMA_TS5340a/PIXMA_TS5340a_default_tcm14-2569990.png",
        "specs": {"Technology": "Inkjet (5-ink)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, Bluetooth, USB", "Paper Size": "A4", "Display": "3.5-inch touchscreen"},
        "features": ["5 individual ink tanks for cost efficiency", "3.5-inch touchscreen display", "Duplex printing", "SD card slot for direct printing"]
    },
    {
        "name": "Canon PIXMA TS7440a",
        "category": "Office Printer",
        "type": "Home Printer",
        "description": "Canon PIXMA TS7440a — premium all-in-one home printer with 6-ink system for exceptional photo quality and versatile media handling.",
        "image_url": "https://static-cdn.canon-cna.com/product/PIXMA_TS7440/PIXMA_TS7440_default_tcm14-2569994.png",
        "specs": {"Technology": "Inkjet (6-ink)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, Bluetooth, USB, Ethernet", "Paper Size": "A4", "Display": "4.3-inch touchscreen"},
        "features": ["6-ink system with dedicated photo inks", "4.3-inch touchscreen", "Auto duplex printing", "Rear and front paper trays"]
    },
    {
        "name": "Canon PIXMA TS8340",
        "category": "Office Printer",
        "type": "Home Printer",
        "description": "Canon PIXMA TS8340 — premium 6-ink all-in-one for stunning borderless photos up to A4 and everyday document printing.",
        "specs": {"Technology": "Inkjet (6-ink)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, Bluetooth, USB", "Paper Size": "A4", "Display": "4.3-inch touchscreen"},
        "features": ["6-ink system for vivid photos", "CD/DVD disc printing", "4.3-inch touchscreen", "Borderless printing up to A4"]
    },
    {
        "name": "Canon PIXMA TS3340",
        "category": "Office Printer",
        "type": "Home Printer",
        "description": "Canon PIXMA TS3340 — affordable wireless all-in-one for basic home printing, scanning, and copying needs.",
        "specs": {"Technology": "Inkjet", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4"},
        "features": ["Affordable home printing", "Wireless connectivity", "Canon PRINT app support", "Compact design"]
    },

    # ── PIXMA MegaTank / Refillable Ink ──
    {
        "name": "Canon PIXMA G1430",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G1430 — high-yield refillable ink tank single function printer delivering ultra-low cost per page for high-volume printing.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print", "Connectivity": "USB", "Paper Size": "A4", "Yield": "Up to 6,000 pages black"},
        "features": ["Refillable ink tanks", "Ultra-low cost per page", "6,000+ page black yield", "Compact single-function design"]
    },
    {
        "name": "Canon PIXMA G2430",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G2430 — refillable ink tank all-in-one with print, scan, and copy for cost-effective high-volume home and office use.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy", "Connectivity": "USB", "Paper Size": "A4", "Yield": "Up to 6,000 pages black"},
        "features": ["Refillable ink tanks", "Print, scan, and copy", "6,000+ page black yield", "Cost-effective for busy homes"]
    },
    {
        "name": "Canon PIXMA G3430",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G3430 — wireless refillable ink tank all-in-one with Wi-Fi for affordable high-volume printing from any device.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4", "Yield": "Up to 6,000 pages black"},
        "features": ["Refillable ink tanks with Wi-Fi", "Wireless mobile printing", "6,000+ page black yield", "Canon PRINT app support"]
    },
    {
        "name": "Canon PIXMA G4470",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G4470 — 4-in-1 refillable ink tank printer with fax, ADF, and wireless connectivity for small offices.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy, Fax", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4", "ADF": "35-sheet", "Yield": "Up to 6,000 pages black"},
        "features": ["4-in-1 with fax capability", "35-sheet ADF", "Refillable ink tanks", "Wi-Fi and cloud printing"]
    },
    {
        "name": "Canon PIXMA G640",
        "category": "Photo Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G640 — 6-ink MegaTank photo printer for stunning A4 photo prints at ultra-low cost with refillable ink tanks.",
        "specs": {"Technology": "Inkjet (6-ink Refillable)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4", "Yield": "Up to 3,800 photos"},
        "features": ["6-ink system for photo quality", "3,800+ 4x6 photos per fill", "Refillable MegaTank system", "Borderless photo printing"]
    },
    {
        "name": "Canon PIXMA G540",
        "category": "Photo Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G540 — 6-ink MegaTank single-function photo printer for high-quality wireless photo printing at minimal cost.",
        "specs": {"Technology": "Inkjet (6-ink Refillable)", "Functions": "Print", "Connectivity": "Wi-Fi, USB", "Paper Size": "A4", "Yield": "Up to 3,800 photos"},
        "features": ["6-ink system for vivid photos", "Single-function photo printer", "Wireless printing", "MegaTank refillable system"]
    },
    {
        "name": "Canon PIXMA G7040",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon PIXMA G7040 — business-grade refillable ink tank all-in-one with fax, ADF, Ethernet, and duplex printing.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy, Fax", "Connectivity": "Wi-Fi, Ethernet, USB", "Paper Size": "A4", "ADF": "35-sheet", "Duplex": "Auto"},
        "features": ["Business-grade MegaTank", "Ethernet + Wi-Fi connectivity", "Auto duplex printing", "35-sheet ADF"]
    },
    {
        "name": "Canon MAXIFY GX6040",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon MAXIFY GX6040 — business MegaTank all-in-one delivering 6,000+ page yield with fast duplex printing and dual paper trays.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy", "Connectivity": "Wi-Fi, Ethernet, USB", "Paper Size": "A4", "Duplex": "Auto", "Display": "2.7-inch touchscreen"},
        "features": ["High-yield MegaTank for business", "Dual paper trays (front + rear)", "Auto duplex printing", "2.7-inch touchscreen"]
    },
    {
        "name": "Canon MAXIFY GX7040",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "description": "Canon MAXIFY GX7040 — premium business MegaTank 4-in-1 with fax, 50-sheet ADF, and Ethernet for demanding office environments.",
        "specs": {"Technology": "Inkjet (Refillable)", "Functions": "Print, Scan, Copy, Fax", "Connectivity": "Wi-Fi, Ethernet, USB", "Paper Size": "A4", "ADF": "50-sheet", "Duplex": "Auto"},
        "features": ["50-sheet ADF for high-volume scanning", "Fax capability", "Dual paper trays", "Business-grade reliability"]
    },

    # ── Portable / SELPHY ──
    {
        "name": "Canon SELPHY CP1500",
        "category": "Photo Printer",
        "type": "Portable Photo Printer",
        "description": "Canon SELPHY CP1500 — compact Wi-Fi photo printer producing water-resistant, lab-quality 4x6 prints in approximately 47 seconds.",
        "specs": {"Technology": "Dye-sublimation", "Print Size": "4x6 inch", "Connectivity": "Wi-Fi, USB", "Print Speed": "~47 seconds", "Display": "3.5-inch LCD"},
        "features": ["Dye-sublimation lab-quality prints", "Water and fade resistant output", "3.5-inch tilt-up LCD", "Wi-Fi and direct USB printing"]
    },
    {
        "name": "Canon SELPHY QX20",
        "category": "Photo Printer",
        "type": "Portable Photo Printer",
        "description": "Canon SELPHY QX20 — pocket-sized wireless photo printer for square prints from your smartphone, perfect for creative on-the-go printing.",
        "specs": {"Technology": "Dye-sublimation", "Print Size": "2.7x2.7 inch square", "Connectivity": "Wi-Fi", "Battery": "Built-in rechargeable"},
        "features": ["Pocket-sized portable design", "Square format prints", "Built-in rechargeable battery", "Canon PRINT Inkjet/SELPHY app"]
    },
    {
        "name": "Canon SELPHY SQUARE QX10",
        "category": "Photo Printer",
        "type": "Portable Photo Printer",
        "description": "Canon SELPHY SQUARE QX10 — ultra-compact square photo printer with peel-and-stick backing for creative sticker printing.",
        "specs": {"Technology": "Dye-sublimation", "Print Size": "2.7x2.7 inch square", "Connectivity": "Wi-Fi", "Battery": "Built-in rechargeable"},
        "features": ["Sticker-back prints", "Ultra-compact and portable", "Smartphone app control", "Water-resistant output"]
    },

    # ── Professional Photo Printers ──
    {
        "name": "Canon imagePROGRAF PRO-300",
        "category": "Photo Printer",
        "type": "Professional Photo Printer",
        "description": "Canon imagePROGRAF PRO-300 — professional A3+ photo printer with 10-ink LUCIA PRO system for gallery-quality prints.",
        "specs": {"Technology": "Inkjet (10-ink LUCIA PRO)", "Paper Size": "A3+", "Connectivity": "Wi-Fi, Ethernet, USB", "Resolution": "4800x2400 dpi"},
        "features": ["10-ink LUCIA PRO ink system", "A3+ borderless printing", "Matte black for fine art prints", "Professional Print & Layout software"]
    },
    {
        "name": "Canon imagePROGRAF PRO-1000",
        "category": "Photo Printer",
        "type": "Professional Photo Printer",
        "description": "Canon imagePROGRAF PRO-1000 — professional 17-inch photo printer with 12-ink LUCIA PRO system for museum-quality prints.",
        "specs": {"Technology": "Inkjet (12-ink LUCIA PRO)", "Paper Size": "17 inch (A2)", "Connectivity": "Wi-Fi, Ethernet, USB", "Resolution": "2400x1200 dpi"},
        "features": ["12-ink LUCIA PRO ink system", "17-inch wide format printing", "L-COA PRO image processing", "Anti-clog technology"]
    },

    # ── Canon Office Laser Printers (imageRUNNER / i-SENSYS) ──
    {
        "name": "Canon imageRUNNER ADVANCE DX C5860i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C5860i — high-performance A3 color multifunction printer for large workgroups with 60 ppm output.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "60 ppm (color & B/W)", "Paper Size": "A3", "Duplex": "Auto", "ADF": "150-sheet DADF"},
        "features": ["60 ppm color and B/W printing", "A3 multifunction capability", "150-sheet duplex ADF", "Advanced security features"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C5850i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C5850i — A3 color multifunction with 50 ppm speed, ideal for mid-to-large office environments.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "50 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["50 ppm color printing", "A3 multifunction", "Cloud-connected workflows", "Touchscreen operation"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C5840i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C5840i — A3 color multifunction with 40 ppm output for efficient document management.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "40 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["40 ppm color printing", "Advanced workflow integration", "Secure printing", "Energy efficient"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX 6860i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX 6860i — high-volume A3 B/W multifunction delivering 60 ppm for demanding enterprise environments.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print, Scan, Copy, Fax", "Speed": "60 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["60 ppm B/W printing", "Enterprise-grade security", "Cloud and mobile printing", "High-volume paper handling"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX 6870i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX 6870i — high-speed A3 B/W multifunction with 70 ppm for large enterprise deployments.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print, Scan, Copy, Fax", "Speed": "70 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["70 ppm B/W printing", "Large-capacity paper drawers", "Advanced finishing options", "Enterprise security"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C3835i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C3835i — compact A3 color multifunction with 35 ppm for growing businesses.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "35 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["35 ppm compact A3 color MFP", "Intuitive touchscreen", "Secure print release", "Cloud integration"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C3830i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C3830i — reliable A3 color MFP with 30 ppm for mid-size office productivity.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "30 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["30 ppm color printing", "Compact A3 footprint", "Mobile-ready workflow", "Low running costs"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C3826i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C3826i — cost-effective A3 color multifunction with 26 ppm for small office teams.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "26 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["26 ppm color printing", "Budget-friendly A3 MFP", "Duplex scanning", "Wi-Fi connectivity"]
    },
    {
        "name": "Canon imageRUNNER ADVANCE DX C3822i",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon imageRUNNER ADVANCE DX C3822i — entry-level A3 color multifunction with 22 ppm for space-conscious offices.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "22 ppm", "Paper Size": "A3", "Duplex": "Auto"},
        "features": ["22 ppm color printing", "Compact A3 design", "Standard wireless", "Eco-friendly operation"]
    },
    {
        "name": "Canon i-SENSYS MF655Cdw",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon i-SENSYS MF655Cdw — compact A4 color laser multifunction with 21 ppm, 50-sheet ADF, and mobile printing.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy", "Speed": "21 ppm", "Paper Size": "A4", "ADF": "50-sheet", "Duplex": "Auto"},
        "features": ["Compact A4 color laser MFP", "50-sheet ADF", "Auto duplex printing", "Apple AirPrint and Mopria"]
    },
    {
        "name": "Canon i-SENSYS MF657Cdw",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon i-SENSYS MF657Cdw — feature-rich A4 color laser all-in-one with fax, 5-inch touchscreen, and advanced security.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print, Scan, Copy, Fax", "Speed": "21 ppm", "Paper Size": "A4", "ADF": "50-sheet", "Display": "5-inch touchscreen"},
        "features": ["5-inch color touchscreen", "Fax capability", "Secure print release", "Cloud connectivity"]
    },
    {
        "name": "Canon i-SENSYS MF453dw",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon i-SENSYS MF453dw — reliable A4 B/W laser multifunction with 38 ppm duplex printing for small business efficiency.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print, Scan, Copy", "Speed": "38 ppm", "Paper Size": "A4", "Duplex": "Auto"},
        "features": ["38 ppm B/W printing", "Auto duplex printing", "Compact design", "Mobile printing support"]
    },
    {
        "name": "Canon i-SENSYS MF461dw",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon i-SENSYS MF461dw — efficient A4 B/W laser MFP with 36 ppm, 50-sheet ADF, and 5-inch touchscreen for small offices.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print, Scan, Copy", "Speed": "36 ppm", "Paper Size": "A4", "ADF": "50-sheet", "Display": "5-inch touchscreen"},
        "features": ["5-inch touchscreen", "50-sheet ADF", "Secure printing", "Energy Star certified"]
    },
    {
        "name": "Canon i-SENSYS MF465dw",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "description": "Canon i-SENSYS MF465dw — advanced A4 B/W laser MFP with 40 ppm, fax, and enhanced security for growing businesses.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print, Scan, Copy, Fax", "Speed": "40 ppm", "Paper Size": "A4", "ADF": "50-sheet", "Duplex": "Auto"},
        "features": ["40 ppm B/W printing", "Fax capability included", "Advanced security features", "Cloud-ready workflows"]
    },
    {
        "name": "Canon i-SENSYS LBP236dw",
        "category": "Office Printer",
        "type": "Office Laser",
        "description": "Canon i-SENSYS LBP236dw — compact A4 B/W laser printer with 38 ppm duplex printing and wireless connectivity.",
        "specs": {"Technology": "Laser (B/W)", "Functions": "Print", "Speed": "38 ppm", "Paper Size": "A4", "Duplex": "Auto", "Connectivity": "Wi-Fi, USB, Ethernet"},
        "features": ["38 ppm single-function laser", "Auto duplex printing", "Wireless and Ethernet", "Small footprint for desks"]
    },
    {
        "name": "Canon i-SENSYS LBP631Cw",
        "category": "Office Printer",
        "type": "Office Laser",
        "description": "Canon i-SENSYS LBP631Cw — compact A4 color laser printer with 18 ppm for quality color output in small offices.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print", "Speed": "18 ppm", "Paper Size": "A4", "Connectivity": "Wi-Fi, USB, Ethernet"},
        "features": ["Compact color laser", "Wi-Fi and Ethernet", "Mobile printing ready", "Low energy consumption"]
    },
    {
        "name": "Canon i-SENSYS LBP633Cdw",
        "category": "Office Printer",
        "type": "Office Laser",
        "description": "Canon i-SENSYS LBP633Cdw — versatile A4 color laser with 21 ppm duplex printing for productive home and small offices.",
        "specs": {"Technology": "Laser (Color)", "Functions": "Print", "Speed": "21 ppm", "Paper Size": "A4", "Duplex": "Auto", "Connectivity": "Wi-Fi, USB, Ethernet"},
        "features": ["21 ppm color laser", "Auto duplex printing", "5-line LCD display", "Cloud-ready printing"]
    },

    # ── Canon Document Scanners ──
    {
        "name": "Canon imageFORMULA DR-C225II",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA DR-C225II — compact desktop document scanner with 25 ppm speed and 30-sheet ADF for small offices.",
        "specs": {"Type": "Sheet-fed", "Speed": "25 ppm / 50 ipm", "ADF": "30-sheet", "Sensor": "CMOS CIS", "Duty Cycle": "1,500 pages/day"},
        "features": ["Compact upright design", "25 ppm scanning speed", "Auto document size detection", "ISIS/TWAIN drivers included"]
    },
    {
        "name": "Canon imageFORMULA DR-C230",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA DR-C230 — reliable desktop scanner with 30 ppm and 60-sheet ADF for busy small office workflows.",
        "specs": {"Type": "Sheet-fed", "Speed": "30 ppm / 60 ipm", "ADF": "60-sheet", "Sensor": "CMOS CIS", "Duty Cycle": "3,500 pages/day"},
        "features": ["30 ppm high-speed scanning", "60-sheet ADF capacity", "Passport and card scanning", "CaptureOnTouch software"]
    },
    {
        "name": "Canon imageFORMULA DR-M260",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA DR-M260 — high-speed desktop scanner with 60 ppm and 80-sheet ADF for demanding office environments.",
        "specs": {"Type": "Sheet-fed", "Speed": "60 ppm / 120 ipm", "ADF": "80-sheet", "Sensor": "CMOS CIS", "Duty Cycle": "7,000 pages/day"},
        "features": ["60 ppm high-speed scanning", "80-sheet ADF", "Mixed batch scanning", "Passport and ID scanning"]
    },
    {
        "name": "Canon imageFORMULA DR-S150",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA DR-S150 — network-ready desktop scanner with Wi-Fi, 45 ppm speed, and 60-sheet ADF for shared office use.",
        "specs": {"Type": "Sheet-fed", "Speed": "45 ppm / 90 ipm", "ADF": "60-sheet", "Connectivity": "Wi-Fi, Ethernet, USB", "Duty Cycle": "4,000 pages/day"},
        "features": ["Wi-Fi and Ethernet connectivity", "45 ppm scanning speed", "Network-shared scanning", "Touchscreen operation"]
    },
    {
        "name": "Canon imageFORMULA DR-S130",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA DR-S130 — compact versatile scanner with 30 ppm, Wi-Fi, and USB-C for modern office setups.",
        "specs": {"Type": "Sheet-fed", "Speed": "30 ppm / 60 ipm", "ADF": "60-sheet", "Connectivity": "Wi-Fi, USB-C", "Duty Cycle": "4,000 pages/day"},
        "features": ["USB-C connectivity", "Wi-Fi scanning", "15.6 cm touchscreen", "Compact design"]
    },
    {
        "name": "Canon imageFORMULA R50",
        "category": "Scanner",
        "type": "Document Scanner",
        "description": "Canon imageFORMULA R50 — portable document scanner with 25 ppm, Wi-Fi, and USB-C for flexible scanning anywhere.",
        "specs": {"Type": "Sheet-fed", "Speed": "25 ppm / 50 ipm", "ADF": "60-sheet", "Connectivity": "Wi-Fi, USB-C"},
        "features": ["Portable and compact design", "Wi-Fi scanning to devices", "USB-C connectivity", "CaptureOnTouch Mobile app"]
    },
]

def main():
    # Load existing products
    products = json.loads(open(PRODUCTS_FILE, 'r', encoding='utf-8').read())
    existing_ids = {p['id'] for p in products}
    
    added = 0
    for cp in canon_products:
        product_id = slug(cp['name'])
        if product_id in existing_ids:
            print(f"  ⏭️ Already exists: {cp['name']}")
            continue
        
        # Try to download image
        image_path = ""
        if cp.get('image_url'):
            image_path = download_image(cp['image_url'], cp['name'])
        
        product = {
            "id": product_id,
            "name": cp['name'],
            "brand": "Canon",
            "category": cp['category'],
            "type": cp['type'],
            "image": image_path,
            "url": f"https://en.canon-cna.com/printers/{product_id}/",
            "description": cp['description'],
            "specifications": cp.get('specs', {}),
            "features": cp.get('features', []),
            "isConsumable": False,
            "featured": False
        }
        products.append(product)
        existing_ids.add(product_id)
        added += 1
        print(f"  ✅ Added: {cp['name']}")
    
    # Save
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Added {added} Canon CNA products")
    print(f"   Total products now: {len(products)}")

if __name__ == '__main__':
    main()
