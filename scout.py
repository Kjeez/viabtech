import requests
from bs4 import BeautifulSoup

url = "https://www.keplertech.ae/products/office-printer/"
headers = {"User-Agent": "Mozilla/5.0"}
resp = requests.get(url, headers=headers)
soup = BeautifulSoup(resp.content, "html.parser")

# Let's see some products. E-commerce sites usually have products in `li` or `div` with class "product" or similar.
products = soup.find_all(class_="product")
if not products:
    products = soup.find_all("div", class_=lambda c: c and "product" in c.lower())

for p in products[:2]:
    print("-----")
    print(p.prettify()[:500])

next_page = soup.find("a", class_=lambda c: c and "next" in c.lower())
if next_page:
    print("Next page:", next_page.get("href"))
