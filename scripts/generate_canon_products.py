"""
Generate remaining Canon products from known Canon product catalog.
Canon blocks all scraping (403 via Akamai), so we generate from known data.
"""
import json
from pathlib import Path

PRODUCTS_FILE = Path(__file__).resolve().parent.parent / "src" / "data" / "products.json"

# ============================================================
# MISSING CANON PRODUCTS - Comprehensive catalog
# ============================================================
NEW_CANON_PRODUCTS = [

    # ========== CAMERAS ==========
    # Cinema EOS
    {
        "id": "canon-eos-c70",
        "name": "Canon EOS C70",
        "brand": "Canon",
        "category": "Camera",
        "type": "Cinema EOS",
        "image": "/images/products/canon-eos-c70.webp",
        "description": "The Canon EOS C70 is a compact cinema camera that brings the power of Cinema EOS to the RF mount system. Featuring a Super 35mm DGO sensor with 16+ stops of dynamic range, it records Cinema RAW Light and XF-AVC internally. Its compact form factor makes it perfect for documentary, run-and-gun, and indie filmmaking.",
        "features": [
            "Super 35mm Dual Gain Output (DGO) CMOS sensor",
            "16+ stops of dynamic range for cinematic flexibility",
            "4K DCI/UHD 120p slow motion recording",
            "Cinema RAW Light and XF-AVC internal recording",
            "Dual Pixel CMOS AF II with Eye Detection",
            "RF mount for access to Canon's full RF lens lineup",
            "Dual SD card slots and mini-XLR audio inputs",
            "Built-in ND filters (2, 4, 6, 8, 10 stops)"
        ],
        "specs": {
            "sensor": "Super 35mm DGO CMOS",
            "lensMount": "Canon RF",
            "dynamicRange": "16+ stops (Cinema EOS standard)",
            "videoResolution": "4K DCI/UHD up to 120p, 2K up to 180p",
            "recordingFormats": "Cinema RAW Light, XF-AVC",
            "autofocus": "Dual Pixel CMOS AF II",
            "ndFilters": "Built-in 2/4/6/8/10 stops",
            "audioInput": "2x mini-XLR, 3.5mm mic in",
            "weight": "1170g (body only)"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-eos-c400",
        "name": "Canon EOS C400",
        "brand": "Canon",
        "category": "Camera",
        "type": "Cinema EOS",
        "image": "/images/products/canon-eos-c400.webp",
        "description": "The Canon EOS C400 is a next-generation cinema camera with a full-frame back-illuminated stacked CMOS sensor for outstanding image quality and rolling shutter performance. It supports 6K Cinema RAW Light recording internally and features a modular design with triple-base ISO capability for unmatched low-light performance.",
        "features": [
            "Full-frame back-illuminated stacked CMOS sensor",
            "6K Cinema RAW Light internal recording",
            "Triple base ISO (800/3200/12800) for extreme low-light",
            "12-bit 4:2:2 recording up to 6K 60p",
            "Advanced Dual Pixel CMOS AF II",
            "Genlock/sync for multi-camera production",
            "Modular design with full-size SDI and HDMI outputs",
            "Built-in electronic ND (up to 10 stops)"
        ],
        "specs": {
            "sensor": "Full-Frame Back-Illuminated Stacked CMOS",
            "lensMount": "Canon RF",
            "videoResolution": "6K RAW up to 60p, 4K up to 120p",
            "recordingFormats": "Cinema RAW Light, XF-AVC, MP4",
            "baseIso": "800 / 3200 / 12800 (Triple Base)",
            "autofocus": "Dual Pixel CMOS AF II",
            "ndFilters": "Electronic ND up to 10 stops",
            "outputs": "12G-SDI, HDMI 2.0",
            "weight": "1555g (body only)"
        },
        "inStock": True,
        "featured": False,
    },
    # Compact Cameras
    {
        "id": "canon-powershot-v10-2",
        "name": "Canon PowerShot V10 Advanced",
        "brand": "Canon",
        "category": "Camera",
        "type": "Compact",
        "image": "/images/products/canon-powershot-v10-2.webp",
        "description": "The Canon PowerShot V10 Advanced is a premium pocket-sized vlogging camera featuring a 1-inch CMOS sensor and ultra-wide 19mm equivalent lens. Its built-in stand, stereo microphones, and advanced video capabilities make it the ultimate all-in-one content creation tool.",
        "features": [
            "1-inch type CMOS sensor for superior image quality",
            "Ultra-wide 19mm equivalent f/2.8 lens",
            "4K UHD video recording at 30p",
            "Built-in stereo microphones with wind-cut filter",
            "Integrated kickstand for hands-free recording",
            "Vertical video mode for social media content",
            "Wi-Fi and Bluetooth for instant sharing"
        ],
        "specs": {
            "sensor": "1-inch type CMOS (15.2MP)",
            "lens": "19mm f/2.8 (equivalent)",
            "videoResolution": "4K UHD 30p, Full HD 60p",
            "lcd": "2-inch Tilt Touchscreen",
            "connectivity": "Wi-Fi, Bluetooth",
            "weight": "211g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-powershot-sx740-hs",
        "name": "Canon PowerShot SX740 HS",
        "brand": "Canon",
        "category": "Camera",
        "type": "Compact",
        "image": "/images/products/canon-powershot-sx740-hs.webp",
        "description": "The Canon PowerShot SX740 HS is a pocket-sized superzoom camera offering an incredible 40x optical zoom in a travel-friendly form factor. With 4K video recording, 20.3MP sensor, and Bluetooth connectivity, it captures distant subjects with stunning clarity.",
        "features": [
            "40x optical zoom (24-960mm equivalent)",
            "20.3MP CMOS sensor with DIGIC 8 processor",
            "4K UHD video recording",
            "Tilt LCD screen for selfies and vlogging",
            "Optical Image Stabilizer",
            "Bluetooth and Wi-Fi connectivity",
            "Compact pocket-friendly design"
        ],
        "specs": {
            "sensor": "20.3MP 1/2.3-inch CMOS",
            "processor": "DIGIC 8",
            "zoom": "40x Optical (24-960mm equiv.)",
            "videoResolution": "4K UHD 30p",
            "lcd": "3.0-inch Tilt LCD",
            "weight": "299g"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== LENSES ==========
    # Standard Zooms
    {
        "id": "canon-rf-24-50mm-f4-5-6-3-is-stm",
        "name": "Canon RF 24-50mm F4.5-6.3 IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Zoom",
        "image": "/images/products/canon-rf-24-50mm-f4-5-6-3-is-stm.webp",
        "description": "The Canon RF 24-50mm F4.5-6.3 IS STM is an ultra-compact and lightweight standard zoom lens for the EOS R system. Weighing just 210g, it covers a versatile focal range and features optical image stabilization, making it an ideal kit lens for mirrorless photography.",
        "features": [
            "Versatile 24-50mm standard zoom range",
            "Ultra-compact retractable design at just 210g",
            "Optical Image Stabilization up to 4.5 stops",
            "Smooth and quiet STM autofocus for video",
            "Minimum focusing distance of 0.3m",
            "Combined Focus/Control Ring"
        ],
        "specs": {
            "focalLength": "24-50mm",
            "maximumAperture": "f/4.5-6.3",
            "imageStabilizerOis": "4.5 stops",
            "lensConstruction": "8 elements in 6 groups",
            "filterDiameter": "58mm",
            "weight": "210g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-24-105mm-f4l-is-usm",
        "name": "Canon RF 24-105mm F4L IS USM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Zoom",
        "image": "/images/products/canon-rf-24-105mm-f4l-is-usm.webp",
        "description": "The Canon RF 24-105mm F4L IS USM is the essential professional standard zoom lens for the EOS R system. With a constant f/4 aperture, 5-stop image stabilization, and L-series weather sealing, it delivers outstanding versatility for weddings, events, and everyday professional work.",
        "features": [
            "Versatile 24-105mm zoom with constant f/4 aperture",
            "5-stop Optical Image Stabilizer",
            "Nano USM for fast, smooth, and silent autofocus",
            "L-series weather-sealed construction",
            "Customizable Lens Control Ring",
            "Excellent close-up capability (0.45m minimum focus)"
        ],
        "specs": {
            "focalLength": "24-105mm",
            "maximumAperture": "f/4",
            "lensConstruction": "18 elements in 14 groups",
            "imageStabilizerOis": "5.0 stops",
            "afActuator": "Nano USM",
            "filterDiameter": "77mm",
            "weight": "700g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-24-105mm-f4-7-1-is-stm",
        "name": "Canon RF 24-105mm F4-7.1 IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Zoom",
        "image": "/images/products/canon-rf-24-105mm-f4-7-1-is-stm.webp",
        "description": "The Canon RF 24-105mm F4-7.1 IS STM is a lightweight and affordable full-frame standard zoom lens offering incredible versatility from wide-angle to telephoto. With built-in image stabilization and quiet STM motor, it is perfect for everyday photography and video.",
        "features": [
            "Versatile 24-105mm range in a compact design",
            "Optical Image Stabilizer up to 5 stops",
            "Quiet STM motor for smooth video autofocus",
            "Lightweight at just 395g",
            "0.5x macro-like magnification at 105mm",
            "Combined Focus/Control Ring"
        ],
        "specs": {
            "focalLength": "24-105mm",
            "maximumAperture": "f/4-7.1",
            "imageStabilizerOis": "5.0 stops",
            "afActuator": "STM",
            "filterDiameter": "67mm",
            "weight": "395g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-28-70mm-f2l-usm",
        "name": "Canon RF 28-70mm F2L USM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Zoom",
        "image": "/images/products/canon-rf-28-70mm-f2l-usm.webp",
        "description": "The Canon RF 28-70mm F2L USM is the world's first full-frame zoom lens with a constant f/2 maximum aperture, delivering unmatched low-light performance and shallow depth-of-field control across the standard zoom range. Built to L-series professional standards.",
        "features": [
            "World's first f/2 constant aperture full-frame zoom",
            "Exceptional low-light performance and bokeh",
            "Ring USM for fast and precise autofocus",
            "L-series dust and moisture resistance",
            "Customizable Lens Control Ring",
            "Super Spectra Coating for flare control"
        ],
        "specs": {
            "focalLength": "28-70mm",
            "maximumAperture": "f/2",
            "lensConstruction": "19 elements in 13 groups",
            "afActuator": "Ring USM",
            "filterDiameter": "95mm",
            "weight": "1430g"
        },
        "inStock": True,
        "featured": False,
    },
    # Telephoto Zooms
    {
        "id": "canon-rf-70-200mm-f4l-is-usm",
        "name": "Canon RF 70-200mm F4L IS USM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Telephoto Zoom",
        "image": "/images/products/canon-rf-70-200mm-f4l-is-usm.webp",
        "description": "The Canon RF 70-200mm F4L IS USM is a compact and lightweight professional telephoto zoom lens. With a constant f/4 aperture and 5-stop image stabilization, it delivers outstanding image quality in a significantly smaller package than its f/2.8 counterpart.",
        "features": [
            "Compact 70-200mm f/4 L-series telephoto zoom",
            "5-stop Optical Image Stabilizer",
            "Nano USM for fast, smooth autofocus",
            "Dramatically smaller and lighter than predecessor",
            "L-series weather-sealed construction",
            "0.6m minimum focusing distance"
        ],
        "specs": {
            "focalLength": "70-200mm",
            "maximumAperture": "f/4",
            "imageStabilizerOis": "5.0 stops",
            "afActuator": "Nano USM",
            "filterDiameter": "77mm",
            "weight": "695g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-100-400mm-f5-6-8-is-usm",
        "name": "Canon RF 100-400mm F5.6-8 IS USM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Telephoto Zoom",
        "image": "/images/products/canon-rf-100-400mm-f5-6-8-is-usm.webp",
        "description": "The Canon RF 100-400mm F5.6-8 IS USM is an affordable and lightweight super telephoto zoom lens that makes wildlife and sports photography accessible. With built-in image stabilization and Nano USM, it delivers impressive reach in a compact package.",
        "features": [
            "100-400mm telephoto range for wildlife and sports",
            "5.5-stop Optical Image Stabilizer",
            "Nano USM for fast, quiet autofocus",
            "Lightweight at just 635g",
            "Compatible with RF 1.4x and 2x extenders",
            "0.88m minimum focusing distance"
        ],
        "specs": {
            "focalLength": "100-400mm",
            "maximumAperture": "f/5.6-8",
            "imageStabilizerOis": "5.5 stops",
            "afActuator": "Nano USM",
            "filterDiameter": "67mm",
            "weight": "635g"
        },
        "inStock": True,
        "featured": False,
    },
    # Prime Lenses
    {
        "id": "canon-rf-35mm-f1-8-macro-is-stm",
        "name": "Canon RF 35mm F1.8 Macro IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Prime",
        "image": "/images/products/canon-rf-35mm-f1-8-macro-is-stm.webp",
        "description": "The Canon RF 35mm F1.8 Macro IS STM is a versatile wide-angle prime lens with macro capability. With a fast f/1.8 aperture, image stabilization, and 0.5x macro magnification, it excels for street, landscape, food, and close-up photography.",
        "features": [
            "Versatile 35mm wide-angle prime with f/1.8 aperture",
            "0.5x macro magnification for close-up work",
            "Optical Image Stabilizer up to 5 stops",
            "Smooth and quiet STM autofocus",
            "Compact and lightweight design (305g)",
            "Customizable Lens Control Ring"
        ],
        "specs": {
            "focalLength": "35mm",
            "maximumAperture": "f/1.8",
            "imageStabilizerOis": "5.0 stops",
            "afActuator": "STM",
            "maximumMagnification": "0.5x",
            "filterDiameter": "52mm",
            "weight": "305g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-50mm-f1-2l-usm",
        "name": "Canon RF 50mm F1.2L USM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Standard Prime",
        "image": "/images/products/canon-rf-50mm-f1-2l-usm.webp",
        "description": "The Canon RF 50mm F1.2L USM is the ultimate portrait and low-light lens, delivering extraordinary resolving power and dream-like bokeh from its ultra-fast f/1.2 maximum aperture. Built to the highest L-series standards.",
        "features": [
            "Ultra-fast f/1.2 maximum aperture",
            "Exceptional sharpness even wide open",
            "Ring USM for near-silent, precise autofocus",
            "L-series dust and moisture resistance",
            "Customizable Lens Control Ring",
            "10-blade circular aperture for smooth bokeh"
        ],
        "specs": {
            "focalLength": "50mm",
            "maximumAperture": "f/1.2",
            "lensConstruction": "15 elements in 9 groups",
            "afActuator": "Ring USM",
            "numberOfDiaphragmBlades": "10",
            "filterDiameter": "77mm",
            "weight": "950g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-85mm-f2-macro-is-stm",
        "name": "Canon RF 85mm F2 Macro IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "Portrait Prime",
        "image": "/images/products/canon-rf-85mm-f2-macro-is-stm.webp",
        "description": "The Canon RF 85mm F2 Macro IS STM is a versatile portrait lens with 0.5x macro capability. Its fast f/2 aperture, 5-stop image stabilization, and smooth STM motor make it ideal for portraits, close-ups, and video work.",
        "features": [
            "Classic 85mm portrait focal length",
            "f/2 maximum aperture for beautiful bokeh",
            "0.5x macro magnification capability",
            "5-stop Optical Image Stabilizer",
            "Smooth and quiet STM autofocus",
            "Compact and lightweight (500g)"
        ],
        "specs": {
            "focalLength": "85mm",
            "maximumAperture": "f/2",
            "imageStabilizerOis": "5.0 stops",
            "afActuator": "STM",
            "maximumMagnification": "0.5x",
            "filterDiameter": "67mm",
            "weight": "500g"
        },
        "inStock": True,
        "featured": False,
    },
    # RF-S Lenses
    {
        "id": "canon-rf-s-18-150mm-f3-5-6-3-is-stm",
        "name": "Canon RF-S 18-150mm F3.5-6.3 IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "RF-S All-in-One Zoom",
        "image": "/images/products/canon-rf-s-18-150mm-f3-5-6-3-is-stm.webp",
        "description": "The Canon RF-S 18-150mm F3.5-6.3 IS STM is the ultimate all-in-one travel lens for APS-C EOS R cameras. Covering wide-angle to telephoto in a single lightweight package, it features image stabilization and a smooth STM motor.",
        "features": [
            "Massive 18-150mm (29-240mm equiv.) zoom range",
            "4.5-stop Optical Image Stabilizer",
            "Smooth and quiet STM autofocus",
            "Lightweight at just 310g",
            "0.44m minimum focusing distance",
            "Combined Focus/Control Ring"
        ],
        "specs": {
            "focalLength": "18-150mm (29-240mm equiv.)",
            "maximumAperture": "f/3.5-6.3",
            "imageStabilizerOis": "4.5 stops",
            "afActuator": "STM",
            "filterDiameter": "55mm",
            "weight": "310g"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-rf-s-55-210mm-f5-7-1-is-stm",
        "name": "Canon RF-S 55-210mm F5-7.1 IS STM",
        "brand": "Canon",
        "category": "Lens",
        "type": "RF-S Telephoto Zoom",
        "image": "/images/products/canon-rf-s-55-210mm-f5-7-1-is-stm.webp",
        "description": "The Canon RF-S 55-210mm F5-7.1 IS STM is a compact telephoto zoom lens for APS-C EOS R cameras. It provides excellent reach for wildlife, sports, and travel photography in an incredibly lightweight package.",
        "features": [
            "55-210mm telephoto range (88-336mm equiv.)",
            "4.5-stop Optical Image Stabilizer",
            "Smooth STM autofocus for video",
            "Ultra-lightweight at just 270g",
            "Lead Screw-type STM for quiet operation"
        ],
        "specs": {
            "focalLength": "55-210mm (88-336mm equiv.)",
            "maximumAperture": "f/5-7.1",
            "imageStabilizerOis": "4.5 stops",
            "afActuator": "STM",
            "filterDiameter": "55mm",
            "weight": "270g"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== PRINTERS ==========
    # PIXMA Consumer
    {
        "id": "canon-pixma-ts3550i",
        "name": "Canon PIXMA TS3550i",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Home Printer",
        "image": "/images/products/canon-pixma-ts3550i.webp",
        "description": "The Canon PIXMA TS3550i is an affordable wireless all-in-one inkjet printer designed for everyday home printing, copying, and scanning. With Canon PRINT app support, Cloud connectivity, and easy setup, it makes home productivity effortless.",
        "features": [
            "Print, copy, and scan functionality",
            "Wi-Fi and Canon PRINT app support",
            "Cloud printing via PIXMA Cloud Link",
            "Compact design with front paper loading",
            "Auto power on/off for energy saving",
            "1.5-inch LCD display"
        ],
        "specs": {
            "printSpeed": "Up to 7.7 ipm (mono), 4.0 ipm (colour)",
            "printResolution": "4800 x 1200 dpi",
            "scanResolution": "600 x 1200 dpi",
            "connectivity": "Wi-Fi, USB",
            "paperCapacity": "60 sheets rear tray",
            "display": "1.5-inch Mono LCD"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-pixma-ts5350i",
        "name": "Canon PIXMA TS5350i",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Home Printer",
        "image": "/images/products/canon-pixma-ts5350i.webp",
        "description": "The Canon PIXMA TS5350i is a versatile wireless inkjet printer with duplex printing and a colour touchscreen, perfect for families and students. It delivers high-quality photo and document printing with smart connectivity options.",
        "features": [
            "Print, copy, and scan with auto duplex printing",
            "3.0-inch colour touchscreen LCD",
            "5-ink system for vibrant photo prints",
            "Wi-Fi, Bluetooth, and Cloud connectivity",
            "Borderless photo printing up to A4",
            "Canon PRINT and AirPrint support"
        ],
        "specs": {
            "printSpeed": "Up to 13.0 ipm (mono), 6.8 ipm (colour)",
            "printResolution": "4800 x 1200 dpi",
            "scanResolution": "1200 x 2400 dpi",
            "connectivity": "Wi-Fi, Bluetooth, USB",
            "duplexPrinting": "Automatic",
            "display": "3.0-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    # MAXIFY Business Ink
    {
        "id": "canon-maxify-gx3040",
        "name": "Canon MAXIFY GX3040",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "image": "/images/products/canon-maxify-gx3040.webp",
        "description": "The Canon MAXIFY GX3040 is a high-yield refillable ink tank printer designed for small offices requiring low running costs and high-volume output. With auto duplex printing and Wi-Fi connectivity, it delivers business-quality documents efficiently.",
        "features": [
            "Ultra-low cost per page with refillable ink tanks",
            "Print, copy, and scan multifunction capabilities",
            "Automatic duplex printing",
            "Wi-Fi and Ethernet connectivity",
            "Up to 6,000 mono / 14,000 colour pages per ink set",
            "2-line LCD display"
        ],
        "specs": {
            "printSpeed": "Up to 18 ipm (mono), 13 ipm (colour)",
            "printResolution": "600 x 1200 dpi",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "duplexPrinting": "Automatic",
            "inkYield": "6,000 mono / 14,000 colour pages"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-maxify-gx4040",
        "name": "Canon MAXIFY GX4040",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Refillable Ink Tank",
        "image": "/images/products/canon-maxify-gx4040.webp",
        "description": "The Canon MAXIFY GX4040 is the top-of-the-line refillable ink tank all-in-one with print, copy, scan, and fax functionality. With ADF, auto duplex, and ultra-low cost printing, it is designed for busy small offices.",
        "features": [
            "Print, copy, scan, and fax all-in-one",
            "50-sheet ADF for multi-page scanning and copying",
            "Automatic duplex printing",
            "Ultra-low running costs with refillable ink tanks",
            "Wi-Fi, Ethernet, and USB connectivity",
            "2.7-inch colour touchscreen LCD"
        ],
        "specs": {
            "printSpeed": "Up to 18 ipm (mono), 13 ipm (colour)",
            "printResolution": "600 x 1200 dpi",
            "adf": "50-sheet ADF",
            "connectivity": "Wi-Fi, Ethernet, USB, Fax",
            "duplexPrinting": "Automatic",
            "display": "2.7-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    # i-SENSYS Laser MFPs (missing models)
    {
        "id": "canon-i-sensys-mf752cdw",
        "name": "Canon i-SENSYS MF752Cdw",
        "brand": "Canon",
        "category": "Printer",
        "type": "Colour Laser Multifunction",
        "image": "/images/products/canon-i-sensys-mf752cdw.webp",
        "description": "The Canon i-SENSYS MF752Cdw is a high-performance colour laser multifunction printer tailored for productive workgroups. Delivering fast colour output with advanced security and mobile printing, it streamlines office workflows efficiently.",
        "features": [
            "Print, copy, scan, and send capabilities",
            "Fast colour print speeds of up to 33 ppm",
            "Single-pass duplex ADF for rapid scanning",
            "5-inch colour touchscreen interface",
            "Advanced security with Secure PIN printing",
            "Wi-Fi, Ethernet, and mobile printing support"
        ],
        "specs": {
            "printSpeed": "Up to 33 ppm (colour and mono)",
            "printResolution": "1200 x 1200 dpi",
            "scanSpeed": "Up to 56 ipm (duplex)",
            "adf": "50-sheet single-pass duplex ADF",
            "paperCapacity": "Standard 250 sheets + 100 MP tray",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "display": "5-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-i-sensys-mf754cdw",
        "name": "Canon i-SENSYS MF754Cdw",
        "brand": "Canon",
        "category": "Printer",
        "type": "Colour Laser Multifunction",
        "image": "/images/products/canon-i-sensys-mf754cdw.webp",
        "description": "The Canon i-SENSYS MF754Cdw is the flagship colour laser multifunction printer in the i-SENSYS range with print, copy, scan, send, and fax capabilities. With high-yield toner support and comprehensive security, it delivers enterprise-level reliability for demanding workgroups.",
        "features": [
            "Print, copy, scan, send, and fax all-in-one",
            "Fast 33 ppm colour and mono output",
            "Single-pass duplex ADF for rapid document processing",
            "5-inch colour touchscreen with intuitive UI",
            "High-yield toner cartridges for low cost per page",
            "360-degree security with TLS 1.3 support",
            "Wi-Fi Direct and mobile printing ready"
        ],
        "specs": {
            "printSpeed": "Up to 33 ppm (colour and mono)",
            "printResolution": "1200 x 1200 dpi",
            "scanSpeed": "Up to 56 ipm (duplex)",
            "adf": "50-sheet single-pass duplex ADF",
            "paperCapacity": "Standard 250 + 100 sheets, max 800 sheets",
            "connectivity": "Wi-Fi, Wi-Fi Direct, Ethernet, USB, Fax",
            "display": "5-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-i-sensys-mf553dw",
        "name": "Canon i-SENSYS MF553dw",
        "brand": "Canon",
        "category": "Printer",
        "type": "Monochrome Laser Multifunction",
        "image": "/images/products/canon-i-sensys-mf553dw.webp",
        "description": "The Canon i-SENSYS MF553dw is a fast and efficient monochrome laser multifunction printer with print, copy, scan, send, and fax capabilities. Designed for busy offices, it delivers up to 43 ppm with comprehensive security and mobile connectivity.",
        "features": [
            "Print, copy, scan, send, and fax all-in-one",
            "Fast monochrome output at 43 ppm",
            "Single-pass duplex ADF for efficient scanning",
            "5-inch colour touchscreen",
            "Wi-Fi, Ethernet, and mobile printing",
            "360-degree security framework"
        ],
        "specs": {
            "printSpeed": "Up to 43 ppm",
            "printResolution": "1200 x 1200 dpi",
            "adf": "50-sheet single-pass duplex ADF",
            "paperCapacity": "Standard 250 + 100, max 850 sheets",
            "connectivity": "Wi-Fi, Ethernet, USB, Fax",
            "display": "5-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    # Large Format
    {
        "id": "canon-imageprograf-tc-20",
        "name": "Canon imagePROGRAF TC-20",
        "brand": "Canon",
        "category": "Printer",
        "type": "Large Format",
        "image": "/images/products/canon-imageprograf-tc-20.webp",
        "description": "The Canon imagePROGRAF TC-20 is a compact 24-inch large format printer designed for offices, classrooms, and small businesses. It produces high-quality posters, CAD drawings, and signage with minimal footprint and easy operation.",
        "features": [
            "24-inch wide format printing up to A1",
            "Compact desktop design for small spaces",
            "4-colour pigment ink for sharp lines and vivid colours",
            "Auto sheet feeder and roll feed capability",
            "Wi-Fi and Ethernet connectivity",
            "Canon Direct Print & Share app support"
        ],
        "specs": {
            "printWidth": "Up to 24 inches (610mm)",
            "printResolution": "2400 x 1200 dpi",
            "inkSystem": "4-colour pigment inks (BKCMY)",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "mediaHandling": "Roll feed, cut sheet, auto sheet feeder"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-imageprograf-tm-300",
        "name": "Canon imagePROGRAF TM-300",
        "brand": "Canon",
        "category": "Printer",
        "type": "Large Format",
        "image": "/images/products/canon-imageprograf-tm-300.webp",
        "description": "The Canon imagePROGRAF TM-300 is a professional 36-inch large format printer delivering exceptional quality for CAD, GIS, and poster applications. With a 5-colour pigment ink system and fast print speeds, it is built for high-productivity environments.",
        "features": [
            "36-inch wide format printing up to A0",
            "5-colour pigment ink system for precise output",
            "Fast A1 print speed of 28 seconds",
            "3-inch colour touchscreen for easy operation",
            "Optional stacker for unattended printing",
            "Wi-Fi, Ethernet, and USB connectivity"
        ],
        "specs": {
            "printWidth": "Up to 36 inches (914mm)",
            "printResolution": "2400 x 1200 dpi",
            "inkSystem": "5-colour pigment inks",
            "printSpeedA1": "28 seconds",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "display": "3-inch Colour Touchscreen"
        },
        "inStock": True,
        "featured": False,
    },
    # Production Printers
    {
        "id": "canon-imagepress-v1350",
        "name": "Canon imagePRESS V1350",
        "brand": "Canon",
        "category": "Printer",
        "type": "Production Colour",
        "image": "/images/products/canon-imagepress-v1350.webp",
        "description": "The Canon imagePRESS V1350 is a high-volume production colour press delivering stunning print quality at speeds up to 135 ppm. It features advanced finishing options, automated colour management, and robust media support for commercial printing environments.",
        "features": [
            "Production speeds of up to 135 ppm in colour",
            "Exceptional 2400 x 2400 dpi print resolution",
            "Advanced automated colour calibration",
            "Wide media support from 52 to 350 gsm",
            "Versatile inline finishing options",
            "Fiery-based digital front end"
        ],
        "specs": {
            "printSpeed": "Up to 135 ppm (A4 colour)",
            "printResolution": "2400 x 2400 dpi",
            "mediaWeight": "52 to 350 gsm",
            "paperCapacity": "Up to 13,000 sheets",
            "monthlyDutyCycle": "Up to 3,500,000 pages"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== SCANNERS ==========
    {
        "id": "canon-imageformula-dr-g2140",
        "name": "Canon imageFORMULA DR-G2140",
        "brand": "Canon",
        "category": "Scanner",
        "type": "Production Scanner",
        "image": "/images/products/canon-imageformula-dr-g2140.webp",
        "description": "The Canon imageFORMULA DR-G2140 is a high-speed production document scanner designed for centralized scanning operations. With speeds of up to 140 ppm and a 500-sheet ADF, it handles everything from business cards to A3 documents.",
        "features": [
            "Ultra-fast scanning at 140 ppm / 280 ipm",
            "500-sheet automatic document feeder",
            "Handles documents from business card to A3 size",
            "Advanced image processing and clean-up",
            "Reliable separation for mixed-batch scanning",
            "USB 3.1 Gen 1 connectivity"
        ],
        "specs": {
            "scanSpeed": "140 ppm / 280 ipm (200/300 dpi)",
            "adf": "500 sheets",
            "opticalResolution": "600 dpi",
            "dailyDutyCycle": "Up to 60,000 pages",
            "connectivity": "USB 3.1 Gen 1"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-imageformula-dr-c230",
        "name": "Canon imageFORMULA DR-C230",
        "brand": "Canon",
        "category": "Scanner",
        "type": "Desktop Document Scanner",
        "image": "/images/products/canon-imageformula-dr-c230.webp",
        "description": "The Canon imageFORMULA DR-C230 is a compact and reliable desktop document scanner ideal for office document management. With 30 ppm scanning speed and a 60-sheet ADF, it efficiently digitizes daily paperwork.",
        "features": [
            "30 ppm / 60 ipm scanning speed",
            "60-sheet automatic document feeder",
            "Compact desktop design",
            "Mixed batch scanning capability",
            "Advanced text enhancement",
            "USB 2.0 connectivity"
        ],
        "specs": {
            "scanSpeed": "30 ppm / 60 ipm",
            "adf": "60 sheets",
            "opticalResolution": "600 dpi",
            "dailyDutyCycle": "Up to 3,500 pages",
            "connectivity": "USB 2.0"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== PROJECTORS ==========
    {
        "id": "canon-xeed-4k600stm",
        "name": "Canon XEED 4K600STM",
        "brand": "Canon",
        "category": "Projector",
        "type": "Installation Projector",
        "image": "/images/products/canon-xeed-4k600stm.webp",
        "description": "The Canon XEED 4K600STM is a native 4K resolution LCOS installation projector delivering 6,000 lumens for large venue, museum, and corporate applications. It offers exceptional colour accuracy and a wide range of Canon lenses for flexible installation.",
        "features": [
            "Native 4K (4096 x 2160) resolution",
            "6,000 lumens brightness for large venues",
            "LCOS technology for exceptional colour accuracy",
            "Interchangeable Canon lens system",
            "HDBaseT and HDMI connectivity",
            "Advanced edge blending and stacking"
        ],
        "specs": {
            "resolution": "4096 x 2160 (Native 4K)",
            "brightness": "6,000 lumens",
            "technology": "LCOS (Liquid Crystal on Silicon)",
            "contrastRatio": "4500:1",
            "lensMount": "Interchangeable Canon lenses",
            "connectivity": "HDBaseT, 2x HDMI, DVI-D"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-lv-wx370",
        "name": "Canon LV-WX370",
        "brand": "Canon",
        "category": "Projector",
        "type": "Portable Projector",
        "image": "/images/products/canon-lv-wx370.webp",
        "description": "The Canon LV-WX370 is a compact and versatile portable projector for classrooms and meeting rooms. Delivering 3,700 lumens brightness in WXGA resolution, it offers flexible connectivity and easy setup for presentations.",
        "features": [
            "3,700 lumens brightness for well-lit rooms",
            "WXGA (1280 x 800) resolution",
            "10,000-hour lamp life in Eco mode",
            "HDMI, VGA, and USB connectivity",
            "Built-in 10W speaker",
            "Compact and lightweight design"
        ],
        "specs": {
            "resolution": "WXGA (1280 x 800)",
            "brightness": "3,700 lumens",
            "technology": "LCD",
            "lampLife": "Up to 10,000 hours (Eco mode)",
            "connectivity": "HDMI, 2x VGA, USB",
            "weight": "3.6 kg"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== ADDITIONAL i-SENSYS ==========
    {
        "id": "canon-i-sensys-mf267dw-ii",
        "name": "Canon i-SENSYS MF267dw II",
        "brand": "Canon",
        "category": "Printer",
        "type": "Monochrome Laser Multifunction",
        "image": "/images/products/canon-i-sensys-mf267dw-ii.webp",
        "description": "The Canon i-SENSYS MF267dw II is a compact 4-in-1 monochrome laser multifunction with print, copy, scan, and fax. With 28 ppm output, Wi-Fi, and mobile printing, it is ideal for small offices and home businesses.",
        "features": [
            "Print, copy, scan, and fax functionality",
            "28 ppm monochrome print speed",
            "Automatic duplex printing",
            "50-sheet ADF for multi-page scanning",
            "Wi-Fi and mobile printing support",
            "Compact footprint for small offices"
        ],
        "specs": {
            "printSpeed": "Up to 28 ppm",
            "printResolution": "1200 x 1200 dpi",
            "adf": "50-sheet ADF",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "duplexPrinting": "Automatic"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-i-sensys-mf275dw",
        "name": "Canon i-SENSYS MF275dw",
        "brand": "Canon",
        "category": "Printer",
        "type": "Monochrome Laser Multifunction",
        "image": "/images/products/canon-i-sensys-mf275dw.webp",
        "description": "The Canon i-SENSYS MF275dw is a reliable and compact 4-in-1 monochrome laser multifunction with print, copy, scan, and fax. It delivers 29 ppm output with Wi-Fi and advanced security for secure small office workflows.",
        "features": [
            "Print, copy, scan, and fax all-in-one",
            "29 ppm monochrome laser output",
            "Automatic duplex printing",
            "50-sheet ADF for batch scanning",
            "Wi-Fi, Wi-Fi Direct, and Ethernet connectivity",
            "Secure PIN printing"
        ],
        "specs": {
            "printSpeed": "Up to 29 ppm",
            "printResolution": "1200 x 1200 dpi",
            "adf": "50-sheet ADF",
            "connectivity": "Wi-Fi, Wi-Fi Direct, Ethernet, USB",
            "duplexPrinting": "Automatic"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-i-sensys-lbp633cdw",
        "name": "Canon i-SENSYS LBP633Cdw",
        "brand": "Canon",
        "category": "Printer",
        "type": "Single Function Colour Laser",
        "image": "/images/products/canon-i-sensys-lbp633cdw-v2.webp",
        "description": "The Canon i-SENSYS LBP633Cdw is a compact single-function colour laser printer delivering 21 ppm colour output with auto duplex and mobile printing. Perfect for small workgroups needing reliable, high-quality colour documents.",
        "features": [
            "21 ppm colour and mono print speed",
            "Automatic duplex printing",
            "Wi-Fi and mobile printing support",
            "Compact and energy-efficient design",
            "5-line mono LCD display",
            "Up to 800-sheet maximum paper capacity"
        ],
        "specs": {
            "printSpeed": "Up to 21 ppm (colour and mono)",
            "printResolution": "1200 x 1200 dpi",
            "paperCapacity": "Standard 250 + 50, max 800 sheets",
            "connectivity": "Wi-Fi, Ethernet, USB",
            "duplexPrinting": "Automatic"
        },
        "inStock": True,
        "featured": False,
    },

    # ========== imageRUNNER ==========
    {
        "id": "canon-imagerunner-advance-dx-4835i",
        "name": "Canon imageRUNNER ADVANCE DX 4835i",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "image": "/images/products/canon-imagerunner-advance-dx-4835i.webp",
        "description": "The Canon imageRUNNER ADVANCE DX 4835i is a monochrome A3 multifunction device delivering 35 ppm with advanced security, cloud integration, and comprehensive finishing options for mid-sized workgroups.",
        "features": [
            "35 ppm monochrome A3 multifunction",
            "Print, copy, scan, send, and optional fax",
            "10.1-inch colour touchscreen",
            "Advanced 360-degree security",
            "Cloud and mobile printing integration",
            "Professional finishing options"
        ],
        "specs": {
            "printSpeed": "Up to 35 ppm (A4)",
            "printResolution": "1200 x 1200 dpi",
            "display": "10.1-inch Colour Touchscreen",
            "paperCapacity": "Up to 6,350 sheets",
            "connectivity": "Ethernet, USB, Wi-Fi (optional)"
        },
        "inStock": True,
        "featured": False,
    },
    {
        "id": "canon-imagerunner-advance-dx-4845i",
        "name": "Canon imageRUNNER ADVANCE DX 4845i",
        "brand": "Canon",
        "category": "Office Printer",
        "type": "Office Multifunction",
        "image": "/images/products/canon-imagerunner-advance-dx-4845i.webp",
        "description": "The Canon imageRUNNER ADVANCE DX 4845i is a high-performance monochrome A3 multifunction printer delivering 45 ppm with enterprise-grade security and extensive paper handling for demanding office environments.",
        "features": [
            "45 ppm monochrome A3 multifunction",
            "Enterprise-grade 360-degree security",
            "10.1-inch colour touchscreen interface",
            "Up to 6,350-sheet paper capacity",
            "Cloud, mobile, and universal print support",
            "Advanced finishing options including booklet making"
        ],
        "specs": {
            "printSpeed": "Up to 45 ppm (A4)",
            "printResolution": "1200 x 1200 dpi",
            "display": "10.1-inch Colour Touchscreen",
            "paperCapacity": "Up to 6,350 sheets",
            "connectivity": "Ethernet, USB, Wi-Fi (optional)"
        },
        "inStock": True,
        "featured": False,
    },
]


def main():
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        existing_products = json.load(f)

    existing_ids = {p["id"]: i for i, p in enumerate(existing_products)}
    updated = 0
    added = 0

    for new_p in NEW_CANON_PRODUCTS:
        if new_p["id"] in existing_ids:
            existing_products[existing_ids[new_p["id"]]] = new_p
            updated += 1
        else:
            existing_products.append(new_p)
            added += 1

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing_products, f, indent=2, ensure_ascii=False)

    print(f"Updated: {updated} | Added: {added} | Total: {len(existing_products)}")

    # Print summary by category
    canon = [p for p in existing_products if p.get("brand") == "Canon"]
    cats = {}
    for p in canon:
        key = f'{p.get("category")}/{p.get("type")}'
        cats[key] = cats.get(key, 0) + 1
    print(f"\nCanon products by category ({len(canon)} total):")
    for k, v in sorted(cats.items()):
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
