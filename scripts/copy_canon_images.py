# Copy Canon product images to public/images/products/
# Each subfolder has product images - take the first image from each folder
import os
import shutil
import re
from pathlib import Path

SOURCE_DIR = Path(r"E:\New folder (3)")
DEST_DIR = Path(r"E:\viabtech\public\images\products")

# Map folder names to product IDs
FOLDER_TO_ID = {
    "Canon EOS R1": "canon-eos-r1",
    "Canon EOS R10": "canon-eos-r10",
    "Canon EOS R100": "canon-eos-r100",
    "Canon EOS R3": "canon-eos-r3",
    "Canon EOS R5": "canon-eos-r5",
    "Canon EOS R5 C": "canon-eos-r5c",
    "Canon EOS R5 Mark II": "canon-eos-r5-mark-ii",
    "Canon EOS R50": "canon-eos-r50",
    "Canon EOS R50 V": "canon-eos-r50-v",
    "Canon EOS R6 Mark II": "canon-eos-r6-mark-ii",
    "Canon EOS R6 Mark III": "canon-eos-r6-mark-iii",
    "Canon EOS R7": "canon-eos-r7",
    "Canon EOS R8": "canon-eos-r8",
    "Canon EOS RP": "canon-eos-rp",
    "Canon RF 10-20mm F4L IS STM": "canon-rf-10-20mm-f4l-is-stm",
    "Canon RF 100-300mm F2.8L IS USM": "canon-rf-100-300mm-f2-8l-is-usm",
    "Canon RF 100-400mm F5.6-8 IS USM": "canon-rf-100-400mm-f5-6-8-is-usm",
    "Canon RF 100mm F2.8L Macro IS USM": "canon-rf-100mm-f2-8l-macro-is-usm",
    "Canon RF 1200mm F8L IS USM": "canon-rf-1200mm-f8l-is-usm",
    "Canon RF 135mm F1.8L IS USM": "canon-rf-135mm-f1-8l-is-usm",
    "Canon RF 14-35mm F4L IS USM": "canon-rf-14-35mm-f4-4l-is-usm",
    "Canon RF 14mm F1.4L VCM": "canon-rf-14mm-f1-4l-vcm",
    "Canon RF 15-30mm F4.5-6.3 IS STM": "canon-rf-15-30mm-f4-5-6-3-is-stm",
    "Canon RF 16-28mm F2.8 IS STM": "canon-rf-16-28mm-f2-8-is-stm",
    "Canon RF 16mm F2.8 STM": "canon-rf-16mm-f2-8-stm",
    "Canon RF 200-800mm F6.3-9 IS USM": "canon-rf-200-800mm-f6-3-9-is-usm",
    "Canon RF 70-200mm F2.8L IS USM Z": "canon-rf-70-200mm-f2-8l-is-usm-z",
    "Canon imageFORCE C3150": "canon-imageforce-c3150",
    "Canon imageFORCE C5100 Series": "canon-imageforce-c5100-series",
    "Canon imageFORCE C611 Series": "canon-imageforce-c611-series",
    "Canon imageFORCE C7165": "canon-imageforce-c7165",
    "Canon rf-100-500mm-f-4-5-7-1-l-is-usm": "canon-rf-100-500mm-f4-5-7-1l-is-usm",
    "i-SENSYS LBP122dw": "canon-i-sensys-lbp122dw",
    "i-SENSYS LBP240 II Series": "canon-i-sensys-lbp240-ii-series",
    "i-SENSYS LBP240 Series": "canon-i-sensys-lbp240-series",
    "i-SENSYS LBP325x": "canon-i-sensys-lbp325x",
    "i-SENSYS LBP335dw": "canon-i-sensys-lbp335dw",
    "i-SENSYS LBP361dw": "canon-i-sensys-lbp361dw",
    "i-SENSYS LBP6030B": "canon-i-sensys-lbp6030b",
    "i-SENSYS LBP640 Series": "canon-i-sensys-lbp640-series",
    "i-SENSYS LBP673Cdw II": "canon-i-sensys-lbp673cdw-ii",
    "i-SENSYS LBP722Cdw": "canon-i-sensys-lbp722cdw",
    "i-SENSYS LBP732Cdw": "canon-i-sensys-lbp732cdw",
    "i-SENSYS MF550 Series": "canon-i-sensys-mf550-series",
    "imageFORCE C1333 Series": "canon-imageforce-c1333-series",
    "imageFORCE C1333P": "canon-imageforce-c1333p",
}

IMAGE_EXTS = {'.webp', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.avif'}

copied = 0
errors = 0

for folder_name, product_id in FOLDER_TO_ID.items():
    src_folder = SOURCE_DIR / folder_name
    if not src_folder.exists():
        print(f"  SKIP (not found): {folder_name}")
        continue
    
    # Find the first image file in the folder
    images = sorted([
        f for f in src_folder.iterdir() 
        if f.is_file() and f.suffix.lower() in IMAGE_EXTS
    ])
    
    if not images:
        print(f"  SKIP (no images): {folder_name}")
        continue
    
    src_file = images[0]
    # Use .webp extension for consistency with products.json references
    dest_file = DEST_DIR / f"{product_id}.webp"
    
    # If source is already webp, just copy
    # If not, copy with original extension AND as .webp name (browser will handle it)
    if src_file.suffix.lower() == '.webp':
        shutil.copy2(src_file, dest_file)
    else:
        # Copy with original extension too
        dest_original = DEST_DIR / f"{product_id}{src_file.suffix.lower()}"
        shutil.copy2(src_file, dest_original)
        # Also copy as .webp for products.json references
        shutil.copy2(src_file, dest_file)
    
    size_kb = dest_file.stat().st_size / 1024
    print(f"  OK: {folder_name} -> {dest_file.name} ({size_kb:.0f} KB)")
    copied += 1

print(f"\nDone! Copied {copied} images. Errors: {errors}")
