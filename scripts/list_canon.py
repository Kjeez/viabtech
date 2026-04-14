import json
data = json.load(open('src/data/products.json', 'r', encoding='utf-8'))
canon = [p for p in data if p.get('brand') == 'Canon']
print('Existing Canon product names:')
for p in sorted(canon, key=lambda x: x['name']):
    cat = p.get("category", "?")
    typ = p.get("type", "?")
    print(f'  [{cat}/{typ}] {p["name"]}')
