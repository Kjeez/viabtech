"""
Compress all product images to WebP format, max 800px, quality 80.
This reduces ~982 MB of PNGs down to ~30-50 MB of optimized WebPs.
Updates products.json with new file paths.
"""
import os
import json
from PIL import Image

IMG_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'products')
PRODUCTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'products.json')
MAX_SIZE = 800   # Max width/height in pixels
QUALITY = 80     # WebP quality (80 is great for product images)

def compress_image(src_path):
    """Compress image to WebP, return new filename or None if failed."""
    try:
        img = Image.open(src_path)
        # Convert RGBA to RGB with white background for WebP
        if img.mode in ('RGBA', 'LA', 'P'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Resize if too large
        w, h = img.size
        if max(w, h) > MAX_SIZE:
            ratio = MAX_SIZE / max(w, h)
            new_size = (int(w * ratio), int(h * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        # Save as WebP
        base = os.path.splitext(src_path)[0]
        webp_path = base + '.webp'
        img.save(webp_path, 'WEBP', quality=QUALITY, method=6)

        # Delete original if different format
        if src_path != webp_path and os.path.exists(webp_path):
            orig_size = os.path.getsize(src_path)
            new_size_bytes = os.path.getsize(webp_path)
            if new_size_bytes < orig_size:
                os.remove(src_path)
                return os.path.basename(webp_path)
            else:
                # WebP is larger (rare), keep original
                os.remove(webp_path)
                return None
        return os.path.basename(webp_path)
    except Exception as e:
        print(f"  Error: {src_path}: {e}")
        return None


def main():
    # Compress all images in product subdirectories
    compressed = 0
    total_saved = 0
    renames = {}  # old_basename -> new_basename

    for subdir in ['epson_africa', 'keplertech']:
        dir_path = os.path.join(IMG_DIR, subdir)
        if not os.path.exists(dir_path):
            continue

        files = [f for f in os.listdir(dir_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        print(f"\n{subdir}: {len(files)} images to compress")

        for i, filename in enumerate(files):
            filepath = os.path.join(dir_path, filename)
            orig_size = os.path.getsize(filepath)

            new_name = compress_image(filepath)
            if new_name and new_name != filename:
                renames[f"/images/products/{subdir}/{filename}"] = f"/images/products/{subdir}/{new_name}"
                new_size = os.path.getsize(os.path.join(dir_path, new_name))
                saved = orig_size - new_size
                total_saved += saved
                compressed += 1

                if (i + 1) % 50 == 0:
                    print(f"  [{i+1}/{len(files)}] compressed...")

    # Also compress root images that are large
    root_files = [f for f in os.listdir(IMG_DIR) if os.path.isfile(os.path.join(IMG_DIR, f)) and f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    for filename in root_files:
        filepath = os.path.join(IMG_DIR, filename)
        if os.path.getsize(filepath) > 100_000:  # Only compress >100KB
            new_name = compress_image(filepath)
            if new_name and new_name != filename:
                renames[f"/images/products/{filename}"] = f"/images/products/{new_name}"
                compressed += 1

    print(f"\nCompressed {compressed} images, saved {total_saved / (1024*1024):.1f} MB")

    # Update products.json with new paths
    if renames:
        products = json.loads(open(PRODUCTS_FILE, 'r', encoding='utf-8').read())
        updated = 0
        for p in products:
            if p.get('image') in renames:
                p['image'] = renames[p['image']]
                updated += 1
        with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        print(f"Updated {updated} product image paths in products.json")

    # Final size report
    total_size = 0
    total_files = 0
    for root, dirs, files in os.walk(IMG_DIR):
        for f in files:
            fp = os.path.join(root, f)
            total_size += os.path.getsize(fp)
            total_files += 1
    print(f"\nFinal: {total_files} files, {total_size / (1024*1024):.1f} MB total")


if __name__ == '__main__':
    main()
