"""
Compress slider images from Downloads to public/images/sliders/.
Converts to WebP format with max width 1920px (for full-width banners).
Quality set to 85 for crisp showroom imagery.
"""
import os
import re
from PIL import Image

# Override decompression bomb limit for very large showroom images
Image.MAX_IMAGE_PIXELS = None

SOURCE_DIR = r"C:\Users\yourt\Downloads\New folder (16)"
DEST_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'sliders')
MAX_WIDTH = 1920
QUALITY = 85

def sanitize_filename(folder, idx):
    """Create a clean websafe filename."""
    return f"{folder}-slide-{idx + 1}.webp"

def compress_and_copy(src_path, dest_path):
    """Compress image to WebP format."""
    try:
        img = Image.open(src_path)
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if wider than MAX_WIDTH (keep for full-width banners)
        w, h = img.size
        if w > MAX_WIDTH:
            ratio = MAX_WIDTH / w
            new_size = (MAX_WIDTH, int(h * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        
        # Save as WebP
        img.save(dest_path, 'WEBP', quality=QUALITY, method=6)
        
        orig_size = os.path.getsize(src_path)
        new_size = os.path.getsize(dest_path)
        reduction = ((orig_size - new_size) / orig_size) * 100
        print(f"  {os.path.basename(src_path)}")
        print(f"    -> {os.path.basename(dest_path)} ({orig_size/1024:.0f}KB -> {new_size/1024:.0f}KB, -{reduction:.0f}%)")
        return new_size
    except Exception as e:
        print(f"  ERROR: {src_path}: {e}")
        return 0

def main():
    total_orig = 0
    total_new = 0
    
    for folder in ['slider1', 'slider2', 'slider3', 'slider4']:
        src_dir = os.path.join(SOURCE_DIR, folder)
        dest_dir = os.path.join(DEST_DIR, folder)
        os.makedirs(dest_dir, exist_ok=True)
        
        if not os.path.exists(src_dir):
            print(f"Skipping {folder}: source not found")
            continue
        
        files = sorted([f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        print(f"\n{folder}: {len(files)} images")
        
        for idx, filename in enumerate(files):
            src_path = os.path.join(src_dir, filename)
            dest_name = sanitize_filename(folder, idx)
            dest_path = os.path.join(dest_dir, dest_name)
            
            orig_size = os.path.getsize(src_path)
            total_orig += orig_size
            
            new_size = compress_and_copy(src_path, dest_path)
            total_new += new_size
    
    print(f"\n{'='*50}")
    print(f"Total: {total_orig/(1024*1024):.1f}MB -> {total_new/(1024*1024):.1f}MB")
    print(f"Saved: {(total_orig - total_new)/(1024*1024):.1f}MB ({((total_orig - total_new)/total_orig)*100:.0f}%)")

if __name__ == '__main__':
    main()
