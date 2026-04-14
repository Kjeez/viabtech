/**
 * Downloads product images for brands using search-based approach,
 * then falls back to a colored placeholder with the product name.
 * For now we generate simple SVG placeholders that look professional.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const productsFile = path.join(__dirname, '..', 'src', 'data', 'products.json');
const imgDir = path.join(__dirname, '..', 'public', 'images', 'products');
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

// Brands we just added
const targetBrands = ['HP', 'Lenovo', 'Dell', 'DJI', 'Godox', 'Unomat', 'APC', 'SanDisk', 'Lexar'];

// Brand accent colors for placeholder SVGs
const brandColors = {
  HP: '#0096D6',
  Lenovo: '#E2231A',
  Dell: '#007DB8',
  DJI: '#333333',
  Godox: '#FF6600',
  Unomat: '#2E3A87',
  APC: '#FF0000',
  SanDisk: '#ED1C24',
  Lexar: '#0066CC',
};

function createPlaceholderSVG(productName, brandColor) {
  // Split name into lines
  const words = productName.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > 22) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());

  const tspans = lines.map((l, i) =>
    `<tspan x="200" dy="${i === 0 ? 0 : 22}">${l}</tspan>`
  ).join('');

  const yOffset = 200 - (lines.length * 11);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#f4f6f9"/>
  <rect x="40" y="40" width="320" height="320" rx="24" fill="white" stroke="${brandColor}" stroke-width="2" opacity="0.9"/>
  <circle cx="200" cy="160" r="50" fill="${brandColor}" opacity="0.12"/>
  <text x="200" y="160" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="40" fill="${brandColor}" font-weight="700" opacity="0.4">
    ${productName.charAt(0)}
  </text>
  <text x="200" y="${yOffset}" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16" fill="#333" font-weight="600">
    ${tspans}
  </text>
</svg>`;
}

let updated = 0;
for (const p of products) {
  if (!targetBrands.includes(p.brand)) continue;
  
  // Check if current image is external URL (CDN)
  if (p.image && (p.image.startsWith('http') || p.image.includes('placeholder'))) {
    const filename = `${p.id}.svg`;
    const filepath = path.join(imgDir, filename);
    const svg = createPlaceholderSVG(p.name, brandColors[p.brand] || '#666');
    fs.writeFileSync(filepath, svg, 'utf8');
    p.image = `/images/products/${filename}`;
    updated++;
    console.log(`Created: ${filename}`);
  }
}

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log(`Updated ${updated} product images to local SVG placeholders.`);
