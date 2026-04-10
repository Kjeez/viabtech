import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryContent from './CategoryContent';

const categoryMap: Record<string, string> = {
  'office-printer': 'Office Printer',
  'plotter': 'Plotter',
  'graphic-printer': 'Graphic Printer',
  'photo-printer': 'Photo Printer',
  'label-printer': 'Label Printer',
  'scanner': 'Scanner',
  'inkjet-media': 'Inkjet Media',
  'ink-cartridges': 'Ink Cartridges',
  'printer-maintenance-box': 'Printer Maintenance Box',
  'camera': 'Camera',
  'lens': 'Lens',
  'accessory': 'Accessory',
  'projector': 'Projector',
};

const categoryDescriptions: Record<string, string> = {
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

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const categoryName = categoryMap[slug];
  if (!categoryName) return {};
  return {
    title: `${categoryName} Collection | Viabtech`,
    description: categoryDescriptions[categoryName] || `Browse our ${categoryName} collection.`,
  };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  if (!categoryMap[slug]) notFound();
  return <CategoryContent slug={slug} />;
}
