/**
 * Merge Epson Africa scraped data into the website's products.json
 * Filters out POS/receipt/label printer accessories, keeps main products.
 */
const fs = require('fs');
const path = require('path');

const scraped = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scraped_epson_canon.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.json'), 'utf8'));

// Copy Epson Africa images to public
const srcDir = path.join(__dirname, '..', 'scraped_images', 'epson_africa');
const destDir = path.join(__dirname, '..', 'public', 'images', 'products', 'epson_africa');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  let copied = 0;
  for (const file of files) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      copied++;
    }
  }
  console.log(`Copied ${copied} new images to public/images/products/epson_africa/`);
}

// Filter out irrelevant products (POS terminals, receipt printers, cable accessories, etc.)
const skipPatterns = [
  /^Epson TM-/i,        // Receipt/thermal printers
  /^Epson M-\d/i,       // Mini-printers / mechanisms
  /^Epson DM-/i,        // Customer displays
  /^Epson OT-/i,        // Options/accessories for POS
  /^Epson PS-/i,        // Power supplies
  /^Epson BA-/i,        // Battery units
  /PUSB cable/i,
  /PUSB Y cable/i,
  /Power Supply/i,
  /USB Cable/i,
  /Certified USB/i,
  /Wall hanging/i,
  /Authentication Device/i,
  /Paper Feed Roller/i,
  /Pickup roller/i,
  /Paper Cassette Lock/i,
  /Cabinet AMC/i,
  /Medium Cabinet/i,
  /High Cabinet/i,
  /Printer Stand/i,
  /Roller Assembly/i,
  /Network Interface/i,
  /Fluid Mount/i,
  /Rewinder for/i,
  /Half cutter/i,
  /Paper Holder C6/i,
  /OrderController/i,
  /Funnel for Pre/i,
  /External Buz/i,
  /Platen$/i,
  /Small Platen/i,
  /Medium Platen/i,
  /Large Platen/i,
  /Sleeve Platen/i,
  /Polo Platen/i,
  /Extra Small Platen/i,
  /Alignment Unit/i,
  /Maintenance Box$/i,
  /^Epson 500-Sheet/i,
  /^Epson 3000-sheet/i,
  /^Epson 58xx/i,
];

function shouldSkip(name) {
  return skipPatterns.some(p => p.test(name));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').substring(0, 80);
}

function mapCategory(cat) {
  if (cat === 'Inkjet Printer' || cat === 'Business Printer') return 'Office Printer';
  if (cat === 'Large Format Printer') return 'Plotter';
  return cat; // Projector, Scanner stay the same
}

function detectType(name, category) {
  const n = name.toLowerCase();
  if (category === 'Plotter' || category === 'Large Format Printer') return 'Large Format';
  if (category === 'Projector') {
    if (n.includes('laser')) return 'Laser Projector';
    if (n.includes('home') || n.includes('eh-')) return 'Home Cinema';
    return 'Projector';
  }
  if (category === 'Scanner') {
    if (n.includes('flatbed') || n.includes('perfection') || n.includes('expression 1')) return 'Flatbed';
    if (n.includes('portable') || n.includes('ds-7') || n.includes('es-5') || n.includes('es-6')) return 'Portable';
    return 'Document Scanner';
  }
  // Printers
  if (n.includes('ecotank')) return 'EcoTank';
  if (n.includes('workforce pro')) return 'WorkForce Pro';
  if (n.includes('workforce enterprise')) return 'Enterprise';
  if (n.includes('workforce')) return 'WorkForce';
  if (n.includes('surecolor') || n.includes('sc-')) return 'Professional';
  if (n.includes('colorworks') || n.includes('cw-c')) return 'Label Printer';
  if (n.includes('surelab')) return 'Photo Lab';
  if (n.includes('expression')) return 'Home';
  if (n.includes('labelworks') || n.includes('lw-')) return 'Label Printer';
  return 'Color Printer';
}

// Build existing name set for dedup
const existingNames = new Set(existing.map(p => p.name.toLowerCase().trim()));
const usedIds = new Set(existing.map(p => p.id));

const newProducts = [];
let skipped = 0;
let dupes = 0;

for (const s of scraped) {
  if (!s.name || s.name.length < 3) continue;

  // Filter irrelevant
  if (shouldSkip(s.name)) {
    skipped++;
    continue;
  }

  // Dedup
  if (existingNames.has(s.name.toLowerCase().trim())) {
    dupes++;
    continue;
  }

  let id = slugify(s.name);
  let counter = 1;
  while (usedIds.has(id)) {
    id = slugify(s.name) + '-' + counter;
    counter++;
  }
  usedIds.add(id);
  existingNames.add(s.name.toLowerCase().trim());

  const category = mapCategory(s.category);
  const type = detectType(s.name, category);

  // Map image path
  let image = '';
  if (s.local_image) {
    const filename = path.basename(s.local_image);
    const localPath = path.join(destDir, filename);
    if (fs.existsSync(localPath)) {
      image = `/images/products/epson_africa/${filename}`;
    }
  }
  if (!image && s.image_url) {
    image = s.image_url; // Fallback to remote URL
  }

  const description = s.short_description && s.short_description !== '$undefined'
    ? s.short_description
    : `${s.name} — professional-grade ${category.toLowerCase()} designed for business and enterprise use.`;

  newProducts.push({
    id,
    name: s.name.replace(/[\u200B\u200C\u200D\uFEFF]/g, '').trim(),
    brand: 'Epson',
    category,
    type,
    image,
    description,
    features: s.features || ['High-quality performance', 'Professional grade'],
    specs: {},
    inStock: true,
    featured: ['Office Printer', 'Plotter', 'Scanner'].includes(category),
    isConsumable: false,
  });
}

// Merge
const final = [...existing, ...newProducts];

// Sort: non-consumables first, then by category, then name
final.sort((a, b) => {
  const ac = a.isConsumable ? 1 : 0;
  const bc = b.isConsumable ? 1 : 0;
  if (ac !== bc) return ac - bc;
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.name.localeCompare(b.name);
});

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'products.json'),
  JSON.stringify(final, null, 2),
  'utf8'
);

console.log(`\nMerge complete!`);
console.log(`  Previously: ${existing.length} products`);
console.log(`  Scraped from Epson Africa: ${scraped.length}`);
console.log(`  Skipped (POS/accessories): ${skipped}`);
console.log(`  Duplicates: ${dupes}`);
console.log(`  New products added: ${newProducts.length}`);
console.log(`  Total now: ${final.length}`);

// Category breakdown
const cats = {};
final.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
console.log(`\nCategories:`);
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
