import re

with open('debug_html/epson_printers.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all class names
classes = re.findall(r'class="([^"]+)"', html)
all_classes = set()
for c in classes:
    for part in c.split():
        all_classes.add(part)

# Filter for product-related classes
product_classes = [c for c in sorted(all_classes) if any(x in c.lower() for x in ['product', 'card', 'listing', 'item', 'tile', 'grid', 'catalog'])]
print("=== Product-related classes ===")
for c in product_classes[:50]:
    print(c)
print(f"\n--- Total unique classes: {len(all_classes)} ---")

# Also find links that look like product pages
links = re.findall(r'href="(/[^"]*?/p/[^"]*)"', html)
if not links:
    links = re.findall(r'href="([^"]*product[^"]*)"', html, re.IGNORECASE)
if not links:
    links = re.findall(r'href="(/[^"]*?/[A-Z][A-Z0-9]+-[A-Z0-9]+[^"]*)"', html)

print(f"\n=== Product-like links ({len(links)}) ===")
for l in sorted(set(links))[:20]:
    print(l)

# Check for JSON data embedded in script tags
json_patterns = re.findall(r'<script[^>]*type="application/json"[^>]*>(.*?)</script>', html[:500000], re.DOTALL)
print(f"\n=== JSON script blocks: {len(json_patterns)} ===")
for i, jp in enumerate(json_patterns[:3]):
    print(f"Block {i}: {jp[:300]}...")
