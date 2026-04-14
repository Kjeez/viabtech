import json
import os

new_products = [
  {
    "id": "canon-rf-14-35mm-f4-4l-is-usm",
    "name": "Canon RF 14-35mm F4L IS USM",
    "brand": "Canon",
    "category": "Lens",
    "type": "Ultra-Wide Zoom",
    "image": "/images/products/canon-rf-14-35mm-f4-4l-is-usm.webp",
    "description": "The Canon RF 14-35mm F4L IS USM is an incredibly versatile and compact ultra-wide-angle zoom lens designed for the EOS R system. With a constant f/4 maximum aperture and up to 5.5 stops of optical image stabilization, it excels in landscape, architecture, and travel photography.\n\nBuilt to professional L-series standards, it features outstanding optical performance with UD and aspherical elements to reduce aberrations. The smooth and quiet Nano USM autofocus motor ensures sharp results for both stills and video, while its lightweight design makes it a perfect everyday companion.",
    "features": [
      "14-35mm ultra-wide zoom range for landscapes and architecture",
      "Constant f/4 maximum aperture across the zoom range",
      "5.5-stop Optical Image Stabilizer (up to 7 stops with IBIS)",
      "Nano USM motor for fast, smooth, and quiet autofocus",
      "Customizable Lens Control Ring for exposure settings",
      "L-series build quality with dust and moisture resistance",
      "Compact and lightweight design at just 540g",
      "Class-leading 0.20m minimum focusing distance"
    ],
    "specs": {
      "imageSize": "Full Frame",
      "focalLength": "14-35mm",
      "lensConstruction": "16 elements in 12 groups",
      "specialOptics": "3x Aspherical, 3x UD",
      "numberOfDiaphragmBlades": "9",
      "minimumAperture": "22",
      "closestFocusingDistance": "0.20m",
      "maximumMagnification": "0.38x (at 35mm)",
      "controlRing": "Yes",
      "imageStabilizerOis": "5.5 stops",
      "afActuator": "Nano USM",
      "coatings": "ASC, SWC, Super Spectra, Fluorine",
      "filterDiameter": "77mm",
      "maxDiameterXLength": "84.1 x 99.8 mm",
      "weight": "540g",
      "dustMoistureResistance": "Yes"
    },
    "inStock": True,
    "featured": False
  },
  {
    "id": "canon-rf-14mm-f1-4l-vcm",
    "name": "Canon RF 14mm F1.4L VCM",
    "brand": "Canon",
    "category": "Lens",
    "type": "Ultra-Wide Prime",
    "image": "/images/products/canon-rf-14mm-f1-4l-vcm.webp",
    "description": "The Canon RF 14mm F1.4L VCM is a highly specialized ultra-wide-angle prime lens designed to meet the rigorous demands of professional video and still production. Featuring a groundbreaking f/1.4 aperture for an ultra-wide field of view, it excels in astrophotography, architectural work, and immersive cinematic videography.\n\nEquipped with a Voice Coil Motor (VCM) and Nano USM for exceptionally fast, quiet, and smooth hybrid autofocus, the lens also includes a dedicated Iris Ring for seamless manual aperture control during video capture. Built to L-series standards, it incorporates specialized optics to minimize distortion and features robust weather sealing.",
    "features": [
      "14mm ultra-wide-angle focal length for immersive perspectives",
      "Ultra-fast f/1.4 maximum aperture for low-light mastery",
      "VCM (Voice Coil Motor) and Nano USM for rapid, silent autofocus",
      "Dedicated Iris Ring for smooth manual aperture control in video",
      "11-blade circular diaphragm for cinematic bokeh",
      "Customizable Lens Function button and Control Ring",
      "Advanced optical design with Aspherical and UD elements",
      "L-series weather-sealed construction with Fluorine coating"
    ],
    "specs": {
      "imageSize": "Full Frame",
      "focalLength": "14mm",
      "lensConstruction": "16 elements in 12 groups",
      "specialOptics": "UD elements, Aspherical elements",
      "numberOfDiaphragmBlades": "11",
      "minimumAperture": "16",
      "controlRing": "Yes",
      "irisRing": "Yes",
      "afActuator": "VCM + Nano USM",
      "coatings": "ASC, SWC, Super Spectra, Fluorine",
      "dustMoistureResistance": "Yes"
    },
    "inStock": True,
    "featured": False
  },
  {
    "id": "canon-rf-15-30mm-f4-5-6-3-is-stm",
    "name": "Canon RF 15-30mm F4.5-6.3 IS STM",
    "brand": "Canon",
    "category": "Lens",
    "type": "Ultra-Wide Zoom",
    "image": "/images/products/canon-rf-15-30mm-f4-5-6-3-is-stm.webp",
    "description": "The Canon RF 15-30mm F4.5-6.3 IS STM is an incredibly lightweight and versatile ultra-wide-angle zoom lens, perfect for vlogging, landscapes, and travel photography. Its compact design makes it an ideal everyday lens for EOS R system users looking to expand their creative perspectives.\n\nFeaturing up to 5.5 stops of Optical Image Stabilization and a smooth, quiet STM autofocus motor, it ensures sharp stills and stable video. The lens also offers impressive close-up capabilities, with a 0.52x maximum magnification when focusing manually.",
    "features": [
      "15-30mm ultra-wide focal range perfect for vlogging and landscapes",
      "5.5-stop Optical Image Stabilizer for sharp handheld shooting",
      "Smooth and quiet STM motor optimized for video recording",
      "Incredibly compact and lightweight at only 390g",
      "0.52x maximum magnification for macro-like close-ups (manual focus)",
      "Combined Focus and Control Ring for intuitive operation",
      "Advanced optics with PMo Aspherical elements"
    ],
    "specs": {
      "imageSize": "Full Frame",
      "focalLength": "15-30mm",
      "lensConstruction": "13 elements in 11 groups",
      "specialOptics": "1x PMo Aspherical, 2x UD",
      "numberOfDiaphragmBlades": "7",
      "minimumAperture": "22-32",
      "closestFocusingDistance": "0.16m (MF) / 0.28m (AF)",
      "maximumMagnification": "0.52x (MF at 15mm) / 0.16x (AF at 30mm)",
      "controlRing": "Combined with Focus Ring",
      "imageStabilizerOis": "5.5 stops",
      "afActuator": "STM",
      "coatings": "Super Spectra",
      "filterDiameter": "67mm",
      "maxDiameterXLength": "76.6 x 88.4 mm",
      "weight": "390g",
      "dustMoistureResistance": "No"
    },
    "inStock": True,
    "featured": False
  },
  {
    "id": "canon-rf-15-35mm-f2-8l-is-usm",
    "name": "Canon RF 15-35mm F2.8L IS USM",
    "brand": "Canon",
    "category": "Lens",
    "type": "Ultra-Wide Zoom",
    "image": "/images/products/canon-rf-15-35mm-f2-8l-is-usm.webp",
    "description": "The Canon RF 15-35mm F2.8L IS USM is a professional L-series ultra-wide-angle zoom lens that forms part of Canon's 'holy trinity' of essential RF lenses. Offering a fast, constant f/2.8 maximum aperture, it is perfect for landscape, architecture, and astrophotography, delivering exceptional performance even in low-light conditions.\n\nBuilt for uncompromised image quality, the lens features three aspherical and two UD elements, combined with SWC and ASC coatings to combat flare and ghosting. A 5-stop Optical Image Stabilizer and rapid Nano USM autofocus motor provide filmmakers and photographers with ultimate precision and stability.",
    "features": [
      "15-35mm ultra-wide zoom with a fast f/2.8 constant aperture",
      "5-stop Optical Image Stabilizer for superior handheld shooting",
      "Nano USM motor for high-speed, smooth, and quiet autofocus",
      "Exceptional edge-to-edge sharpness with Aspherical and UD glass",
      "SWC and ASC coatings to minimize ghosting and flare",
      "L-series weather-sealed construction for harsh environments",
      "Customizable Lens Control Ring for direct setting changes",
      "9-blade circular aperture for pleasing bokeh"
    ],
    "specs": {
      "imageSize": "Full Frame",
      "focalLength": "15-35mm",
      "lensConstruction": "16 elements in 12 groups",
      "specialOptics": "3x Aspherical, 2x UD",
      "numberOfDiaphragmBlades": "9",
      "minimumAperture": "22",
      "closestFocusingDistance": "0.28m",
      "maximumMagnification": "0.21x (at 35mm)",
      "controlRing": "Yes",
      "imageStabilizerOis": "5.0 stops",
      "afActuator": "Nano USM",
      "coatings": "ASC, SWC, Super Spectra, Fluorine",
      "filterDiameter": "82mm",
      "maxDiameterXLength": "88.5 x 126.8 mm",
      "weight": "840g",
      "dustMoistureResistance": "Yes"
    },
    "inStock": True,
    "featured": False
  }
]

file_path = 'src/data/products.json'
with open(file_path, 'r', encoding='utf-8') as f:
    existing_products = json.load(f)

# Update or append
existing_ids = {p['id']: i for i, p in enumerate(existing_products)}
updated_count = 0
added_count = 0

for new_p in new_products:
    if new_p['id'] in existing_ids:
        existing_products[existing_ids[new_p['id']]] = new_p
        updated_count += 1
    else:
        existing_products.append(new_p)
        added_count += 1

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(existing_products, f, indent=2, ensure_ascii=False)

print(f'Updated {updated_count} products.')
print(f'Added {added_count} products.')
print(f'Total products now: {len(existing_products)}')
