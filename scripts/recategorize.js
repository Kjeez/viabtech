/**
 * Re-categorize Epson products that were incorrectly dumped into "Office Printer"
 * Moves accessories, label printers, photo lab printers, etc. to correct categories
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(file, 'utf8'));

let recategorized = 0;

for (const p of products) {
  if (p.brand !== 'Epson') continue;
  const name = p.name.toLowerCase();
  const origCat = p.category;

  // ── Accessories (not actual printers) ──
  if (
    name.includes('spindle') || name.includes('take-up reel') || name.includes('coolant') ||
    name.includes('hole punch') || name.includes('cutter unit') || name.includes('auto cutter') ||
    name.includes('staple') || name.includes('stacker') || name.includes('finisher') ||
    name.includes('bridge unit') || name.includes('booklet') || name.includes('spacer') ||
    name.includes('paper roll') || name.includes('dual tension') || name.includes('cleaning cart') ||
    name.includes('garment platen') || name.includes('grip pad') || name.includes('head cleaning') ||
    name.includes('pre-treatment') || name.includes('conditioner') || name.includes('white ink') ||
    name.includes('floor frame') || name.includes('replacement blade') ||
    name.includes('dryer unit') || name.includes('additional') || name.includes('basket') ||
    name.includes('waste ink') || name.includes('catch basket')
  ) {
    p.category = 'Accessory';
    p.type = 'Printer Accessory';
    p.isConsumable = true;
    recategorized++;
    continue;
  }

  // ── Label Printers ──
  if (name.includes('colorworks') || name.includes('cw-c') || name.includes('labelworks') || name.includes('lw-')) {
    p.category = 'Label Printer';
    p.type = 'Label Printer';
    recategorized++;
    continue;
  }

  // ── Photo Lab Printers ──
  if (name.includes('surelab') || name.includes('sl-d')) {
    p.category = 'Photo Printer';
    p.type = 'Photo Lab';
    recategorized++;
    continue;
  }

  // ── Large Format / Plotter ──
  if (name.includes('surecolor') || name.includes('sc-t') || name.includes('sc-p') || name.includes('sc-f') || name.includes('sc-s') || name.includes('sc-r') || name.includes('sc-v')) {
    p.category = 'Plotter';
    p.type = 'Large Format';
    recategorized++;
    continue;
  }

  // ── Garment / DTG / Sublimation ──
  if (name.includes('dtg') || name.includes('sublimation') || name.includes('garment') || name.includes('sc-f2')) {
    p.category = 'Graphic Printer';
    p.type = 'Dye Sublimation';
    recategorized++;
    continue;
  }

  // ── EcoTank Home vs Office ──
  if (name.includes('ecotank') || name.includes(' l3') || name.includes(' l1') && !name.includes('l15')) {
    if (name.includes('home') || name.includes('l32') || name.includes('l31') || name.includes('l11') || name.includes('l12') || name.includes('l30')) {
      p.type = 'Home';
    } else {
      p.type = 'EcoTank';
    }
  }
}

// Add "Label Printer" to the category list if we created it
const categories = new Set(products.map(p => p.category));

// Sort
products.sort((a, b) => {
  const ac = a.isConsumable ? 1 : 0;
  const bc = b.isConsumable ? 1 : 0;
  if (ac !== bc) return ac - bc;
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.name.localeCompare(b.name);
});

fs.writeFileSync(file, JSON.stringify(products, null, 2), 'utf8');

// Summary
const cats = {};
products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });

console.log(`Re-categorized ${recategorized} products\n`);
console.log('Updated categories:');
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
console.log(`\nTotal: ${products.length}`);
