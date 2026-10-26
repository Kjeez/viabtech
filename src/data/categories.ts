import productsData from '@/data/products.json';

/**
 * Single source of truth for product categories.
 * Every category that has products in products.json gets a real page,
 * so the sitemap, header links and product breadcrumbs never point at a missing page.
 */

export const categorySlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const customDescriptions: Record<string, string> = {
  'Office Printer': 'Discover top-quality office printers from leading brands, designed to enhance productivity and efficiency for businesses of all sizes.',
  'Plotter': 'Professional large format plotters for CAD, engineering, architectural drawings, and technical printing needs.',
  'Graphic Printer': 'High-performance graphic printers for professional photography, fine art reproduction, and commercial printing.',
  'Photo Printer': 'Premium photo printers delivering stunning, gallery-quality prints with exceptional color accuracy.',
  'Label Printer': 'Commercial and industrial label printers for on-demand color label production, barcode printing, and asset management.',
  'Scanner': 'High-speed document and photo scanners for offices, businesses, and professional digitization workflows.',
  'Inkjet Media': 'Premium inkjet media including fine art papers, canvas, and specialty substrates for professional printing.',
  'Ink Cartridges': 'Genuine ink cartridges and consumables for Epson printers — original quality, reliable performance.',
  'Printer Maintenance Box': 'Genuine maintenance boxes and accessories to keep your printers running at peak performance.',
  'Camera': 'Professional Canon cameras for photography and videography — from DSLRs to mirrorless systems.',
  'Lens': 'Canon RF and EF lenses for every shooting scenario — wide-angle, telephoto, macro, and prime.',
  'Accessory': 'Essential printer and camera accessories, parts, and gear for your professional setup.',
  'Projector': 'Epson projectors for boardrooms, classrooms, and home cinema — vivid colors, brilliant presentations.',
};

const pluralOverrides: Record<string, string> = {
  'Lens': 'Lenses',
  'Inkjet Media': 'Inkjet Media',
  'Printer Maintenance Box': 'Printer Maintenance Boxes',
  'Power Distribution': 'Power Distribution Units',
  'Large Format': 'Large Format Printers',
};

/** "Plotter" → "Plotters", "Accessory" → "Accessories", "Drones" stays "Drones". */
export function pluralCategory(name: string): string {
  if (pluralOverrides[name]) return pluralOverrides[name];
  if (/s$/i.test(name)) return name;
  if (/[^aeiou]y$/i.test(name)) return name.slice(0, -1) + 'ies';
  if (/(x|ch|sh)$/i.test(name)) return name + 'es';
  return name + 's';
}

export interface CategoryInfo {
  slug: string;
  name: string;
  plural: string;
  count: number;
  brands: string[];
  description: string;
}

function buildCategories(): CategoryInfo[] {
  const byName = new Map<string, { count: number; brands: Map<string, number> }>();
  for (const p of productsData) {
    const entry = byName.get(p.category) ?? { count: 0, brands: new Map<string, number>() };
    entry.count += 1;
    entry.brands.set(p.brand, (entry.brands.get(p.brand) ?? 0) + 1);
    byName.set(p.category, entry);
  }
  return Array.from(byName.entries())
    .map(([name, { count, brands }]) => {
      const topBrands = Array.from(brands.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([b]) => b);
      const plural = pluralCategory(name);
      return {
        slug: categorySlug(name),
        name,
        plural,
        count,
        brands: topBrands,
        description:
          customDescriptions[name] ??
          `Shop genuine ${plural.toLowerCase()} from ${topBrands.slice(0, 3).join(', ')} at Viabtech, Dar es Salaam — authorized dealer with warranty and delivery across Tanzania.`,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export const categories: CategoryInfo[] = buildCategories();

export const categoryBySlug: Record<string, CategoryInfo> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

/** slug → display name, kept for components that only need the name. */
export const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.slug, c.name]),
);

/** "Epson & Canon" or "Epson, Canon & HP" for titles. */
export function brandList(brands: string[], max = 2): string {
  const list = brands.slice(0, max);
  if (list.length <= 1) return list.join('');
  return `${list.slice(0, -1).join(', ')} & ${list[list.length - 1]}`;
}
