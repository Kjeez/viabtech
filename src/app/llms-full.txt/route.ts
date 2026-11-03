import fs from 'node:fs';
import path from 'node:path';
import { categories, brandList } from '@/data/categories';
import servicesData from '@/data/services.json';

/**
 * /llms-full.txt — the same facts as /llms.txt, plus a short summary of every
 * product category and service, generated from the site's own data at build time
 * so it never drifts from what the pages say.
 */
export const dynamic = 'force-static';

const SITE = 'https://www.viabtech.com';

export function GET() {
  const base = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8').trimEnd();

  const categoryLines = categories.map((c) => {
    const brands = brandList(c.brands, 3);
    return [
      `### [${c.plural}](${SITE}/products/category/${c.slug})`,
      '',
      `${c.description} Viabtech lists ${c.count} ${c.count === 1 ? 'model' : 'models'} in this category${brands ? `, from ${brands}` : ''}, available from its Dar es Salaam showrooms with delivery across Tanzania.`,
    ].join('\n');
  });

  const serviceLines = servicesData.map((s) =>
    [
      `### ${s.title}`,
      '',
      `${s.description}`,
      '',
      ...s.features.map((f: string) => `- ${f}`),
      '',
      `More: ${SITE}/services`,
    ].join('\n'),
  );

  const body = [
    base,
    '',
    '## Product categories (detailed)',
    '',
    categoryLines.join('\n\n'),
    '',
    '## Services (detailed)',
    '',
    serviceLines.join('\n\n'),
    '',
    '### Authorized service center',
    '',
    'Viabtech is an authorized service center for Canon and Epson in Dar es Salaam. Factory-trained technicians provide diagnostics, genuine parts replacement, official warranty support and preventive maintenance for Canon cameras, lenses and printers, and for Epson printers, EcoTank systems and projectors. Equipment can be dropped off at either showroom on Bibi Titi Mohamed Road, or a repair can be requested online.',
    '',
    `More: ${SITE}/service-center`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
