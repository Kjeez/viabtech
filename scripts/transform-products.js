/**
 * Transform products_all.json → src/data/products.json
 * Merges scraped products with existing ones, deduplicating by name.
 * Ink Cartridges & Printer Maintenance Boxes are tagged as consumables.
 */
const fs = require('fs');
const path = require('path');

const scraped = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'products_all.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.json'), 'utf8'));

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function detectBrand(name) {
  const n = name.toLowerCase();
  if (n.startsWith('epson')) return 'Epson';
  if (n.startsWith('canon')) return 'Canon';
  if (n.startsWith('citizen')) return 'Citizen';
  if (n.includes('innova')) return 'Innova';
  if (n.includes('olmec')) return 'Olmec';
  if (n.includes('korejet')) return 'Korejet';
  return 'Epson'; // default for this dataset
}

function detectType(product) {
  const name = product.name.toLowerCase();
  const cat = product.category;

  if (cat === 'Office Printer') {
    if (name.includes('multifunction') || name.includes('mfp')) return 'Multifunction';
    if (name.includes('monochrome')) return 'Monochrome';
    return 'Color Printer';
  }
  if (cat === 'Plotter') return 'Large Format';
  if (cat === 'Graphic Printer') {
    if (name.includes('sublimation')) return 'Dye Sublimation';
    return 'Professional';
  }
  if (cat === 'Photo Printer') return 'Photo';
  if (cat === 'Scanner') {
    if (name.includes('flatbed')) return 'Flatbed';
    if (name.includes('portable')) return 'Portable';
    if (name.includes('wireless') || name.includes('wi-fi')) return 'Wireless';
    return 'Document Scanner';
  }
  if (cat === 'Inkjet Media') return 'Media';
  if (cat === 'Ink Cartridges') return 'Consumable';
  if (cat === 'Printer Maintenance Box') return 'Consumable';
  if (cat === 'Camera') return 'Camera';
  if (cat === 'Lens') return 'Lens';
  if (cat === 'Accessory') return 'Accessory';
  if (cat === 'Projector') return 'Projector';
  return 'Other';
}

function extractFeatures(desc) {
  if (!desc) return ['High-quality performance', 'Professional grade'];
  
  // Try to find bullet-like features in the description
  const features = [];
  
  // Look for key specs patterns
  const patterns = [
    /Print speed[s]?[\s:]+([^\n,]+)/i,
    /Resolution[\s:]+([^\n,]+)/i,
    /Connectivity[\s:]+([^\n,]+)/i,
    /(\d+[\s-]?(?:ppm|ipm|pages per minute)[\w\s]*)/i,
    /(PrecisionCore[^,.\n]*)/i,
    /(Wi-Fi[^,.\n]*|Ethernet[^,.\n]*|USB[^,.\n]*|Bluetooth[^,.\n]*)/i,
    /(A[0-4]\+?[\s](?:printing|format|size)[^,.\n]*)/i,
    /(Auto[matic]?\s*[Dd]uplex[^,.\n]*)/i,
    /((?:\d+[\s-]?(?:inch|"|″))[^,.\n]*)/i,
    /(ENERGY STAR[^,.\n]*)/i,
  ];

  for (const pat of patterns) {
    const match = desc.match(pat);
    if (match && match[1]) {
      const feat = match[1].trim();
      if (feat.length > 5 && feat.length < 80 && !features.includes(feat)) {
        features.push(feat);
      }
    }
  }

  // If we didn't find enough, extract from sentences
  if (features.length < 3) {
    const sentences = desc.split(/[.!]/).filter(s => s.trim().length > 10 && s.trim().length < 100);
    for (const s of sentences.slice(0, 6 - features.length)) {
      const trimmed = s.trim();
      if (trimmed && !features.includes(trimmed)) {
        features.push(trimmed);
      }
    }
  }

  return features.length > 0 ? features.slice(0, 6) : ['High-quality performance', 'Professional grade'];
}

function extractSpecs(desc, name) {
  const specs = {};
  
  const speedMatch = desc?.match(/(?:print speed|speed)[s]?[\s:of]+(?:up to\s+)?(\d+\s*(?:ppm|ipm|ISO ppm|m2\/hr)[^\n,]*)/i);
  if (speedMatch) specs.printSpeed = speedMatch[1].trim();

  const resMatch = desc?.match(/(?:resolution|printing resolution)[\s:]+(\d[\d,]+\s*x\s*\d[\d,]+\s*(?:dpi)?)/i);
  if (resMatch) specs.resolution = resMatch[1].trim();

  const sizeMatch = name.match(/(\d{2,3}[\s"″''])/);
  if (sizeMatch) specs.printWidth = sizeMatch[1].trim().replace(/[""]/g, '"');

  const connMatch = desc?.match(/(?:connectivity|connection)[\s:]+([^\n]+)/i);
  if (connMatch && connMatch[1].length < 80) specs.connectivity = connMatch[1].trim();

  if (Object.keys(specs).length === 0) {
    specs.type = detectType({ name, category: '' });
  }

  return specs;
}

function mapLocalImage(localPath) {
  if (!localPath) return '';
  const filename = path.basename(localPath);
  return `/images/products/keplertech/${filename}`;
}

// Build existing name set for dedup
const existingNameSet = new Set(existing.map(p => p.name.toLowerCase().trim()));
const usedIds = new Set(existing.map(p => p.id));

// Mark consumable categories
const consumableCategories = new Set(['Ink Cartridges', 'Printer Maintenance Box']);

const transformed = [];
let dupeCount = 0;

for (const s of scraped) {
  const nameLower = s.name.toLowerCase().trim();
  
  // Skip if already exists
  if (existingNameSet.has(nameLower)) {
    dupeCount++;
    // But update the existing product's image if it uses a remote URL
    const existingProduct = existing.find(p => p.name.toLowerCase().trim() === nameLower);
    if (existingProduct && s.local_image) {
      const localImg = mapLocalImage(s.local_image);
      // Only update if the local image file exists
      const imgPath = path.join(__dirname, '..', 'public', localImg);
      if (fs.existsSync(imgPath)) {
        existingProduct.image = localImg;
      }
    }
    continue;
  }

  let id = slugify(s.name);
  // Ensure unique ID
  let counter = 1;
  while (usedIds.has(id)) {
    id = slugify(s.name) + '-' + counter;
    counter++;
  }
  usedIds.add(id);

  const isConsumable = consumableCategories.has(s.category);
  const brand = detectBrand(s.name);
  const description = s.full_description 
    ? s.full_description.substring(0, 300).trim() + (s.full_description.length > 300 ? '...' : '')
    : `${s.name} - professional grade ${s.category.toLowerCase()} for business needs.`;

  const product = {
    id,
    name: s.name.replace(/[\u200B\u200C\u200D\uFEFF]/g, '').trim(), // Remove zero-width chars
    brand,
    category: s.category,
    type: detectType(s),
    image: s.local_image ? mapLocalImage(s.local_image) : (s.image_url || ''),
    description,
    features: extractFeatures(s.full_description),
    specs: extractSpecs(s.full_description, s.name),
    inStock: true,
    featured: !isConsumable && ['Office Printer', 'Plotter', 'Scanner'].includes(s.category),
    isConsumable,
  };

  transformed.push(product);
}

// Merge: existing (updated images) + new
const finalProducts = [...existing, ...transformed];

// Sort: non-consumables first, then by category, then by name
finalProducts.sort((a, b) => {
  const aConsumable = a.isConsumable ? 1 : 0;
  const bConsumable = b.isConsumable ? 1 : 0;
  if (aConsumable !== bConsumable) return aConsumable - bConsumable;
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.name.localeCompare(b.name);
});

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'products.json'),
  JSON.stringify(finalProducts, null, 2),
  'utf8'
);

console.log(`\n✅ Product transformation complete!`);
console.log(`   Existing products: ${existing.length}`);
console.log(`   Scraped products: ${scraped.length}`);
console.log(`   Duplicates skipped: ${dupeCount}`);
console.log(`   New products added: ${transformed.length}`);
console.log(`   Total in products.json: ${finalProducts.length}`);

// Category breakdown
const catCount = {};
finalProducts.forEach(p => {
  catCount[p.category] = (catCount[p.category] || 0) + 1;
});
console.log(`\n📊 Categories:`);
Object.entries(catCount).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});
