import json
import re
import urllib.parse
import urllib.request
import os
import time
import sys

def fetch_image_url(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}+product+white+background"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
    try:
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
        matches = re.findall(r'm=\"({.*?murl.*?:.*?})\"', html)
        for match in matches:
            match = match.replace('&quot;', '"')
            data = json.loads(match)
            if 'murl' in data:
                return data['murl']
    except Exception as e:
        print(f"Error fetching url for {query}: {e}")
    return None

def download_image(url, save_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
    try:
        data = urllib.request.urlopen(req, timeout=5).read()
        with open(save_path, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

with open('e:/viabtech/src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

brands_to_update = ['dell', 'hp', 'dji', 'godox', 'unomat', 'apc', 'sandisk', 'lexar', 'lenovo']

for p in products:
    brand = p.get('brand', '').lower()
    needs_update = False
    
    if brand in brands_to_update or any(p['id'].lower().startswith(b + '-') for b in brands_to_update):
        if 'generic-tech-product' in p.get('image', '') or p['id'] == 'lenovo-tab-p12':
            needs_update = True

    if needs_update:
        query = p['name']
        print(f"Fetching: {query}...", end=' ')
        sys.stdout.flush()
        img_url = fetch_image_url(query)
        if img_url:
            ext = img_url.split('/')[-1].split('?')[0].split('.')[-1]
            if len(ext) > 4 or not ext.isalnum():
                ext = 'jpg'
            filename = f"{p['id']}.{ext}"
            save_path = f"e:/viabtech/public/images/products/{filename}"
            print("Found! Downloading...", end=' ')
            sys.stdout.flush()
            if download_image(img_url, save_path):
                p['image'] = f"/images/products/{filename}"
                print("OK")
            else:
                print("Fail")
        else:
            print("No URL found.")
        sys.stdout.flush()
        time.sleep(1)

with open('e:/viabtech/src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Done updating products.")
