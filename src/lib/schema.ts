/**
 * Structured data (schema.org JSON-LD) shared across the site.
 * Business facts live here once so every page — and llms.txt — says the same thing.
 */

export const SITE_URL = 'https://www.viabtech.com';
export const ORG_ID = `${SITE_URL}/#organization`;

export const BUSINESS = {
  name: 'Viabtech',
  legalName: 'Viab Tech Limited',
  foundingDate: '2015',
  email: 'info@viabtech.co.tz',
  phones: ['+255745700500', '+255746000786'],
  logo: `${SITE_URL}/images/viabtechlogo.png`,
  sameAs: [
    'https://www.instagram.com/viabtechcanon',
    'https://www.facebook.com/profile.php?id=61591455479848',
  ],
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
} as const;

export const STORES = [
  {
    id: `${SITE_URL}/#store-canon`,
    name: 'Viabtech Canon Authorized Showroom',
    streetAddress: 'Plot No 1357/208, Ground Floor, next to Peacock Hotel, Bibi Titi Mohamed Road',
    postOfficeBoxNumber: undefined as string | undefined,
    lat: -6.818086744152009,
    lng: 39.28060482480949,
    hasMap: 'https://maps.google.com/?cid=15635631984227566733',
    image: `${SITE_URL}/images/canon.jpg`,
  },
  {
    id: `${SITE_URL}/#store-epson`,
    name: 'Viabtech Epson Experience Zone',
    streetAddress: 'Ground Floor, Uhuru Heights, Bibi Titi Mohamed Road',
    postOfficeBoxNumber: '105047' as string | undefined,
    lat: -6.810614993186932,
    lng: 39.28361067483434,
    hasMap: 'https://maps.google.com/?cid=7711297827740443260',
    image: `${SITE_URL}/images/epson.jpg`,
  },
];

const openingHoursSpecification = BUSINESS.hours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

/** Organization — on every page (root layout). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: ['Viab Tech', 'VIAB TECH LTD'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: BUSINESS.logo, width: 2232, height: 978 },
    foundingDate: BUSINESS.foundingDate,
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0],
    contactPoint: [
      { '@type': 'ContactPoint', telephone: BUSINESS.phones[0], contactType: 'sales', areaServed: 'TZ', availableLanguage: ['en', 'sw'] },
      { '@type': 'ContactPoint', telephone: BUSINESS.phones[1], contactType: 'customer support', areaServed: 'TZ', availableLanguage: ['en', 'sw'] },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: STORES[1].streetAddress,
      postOfficeBoxNumber: STORES[1].postOfficeBoxNumber,
      addressLocality: 'Dar es Salaam',
      addressCountry: 'TZ',
    },
    areaServed: { '@type': 'Country', name: 'Tanzania' },
    sameAs: BUSINESS.sameAs,
    department: STORES.map((s) => ({ '@id': s.id })),
  };
}

/** The two showrooms — on home, contact and the Dar es Salaam showroom page. */
export function storesSchema() {
  return STORES.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    '@id': s.id,
    name: s.name,
    url: SITE_URL,
    image: s.image,
    telephone: BUSINESS.phones[0],
    email: BUSINESS.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.streetAddress,
      ...(s.postOfficeBoxNumber ? { postOfficeBoxNumber: s.postOfficeBoxNumber } : {}),
      addressLocality: 'Dar es Salaam',
      addressRegion: 'Dar es Salaam',
      addressCountry: 'TZ',
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lng },
    hasMap: s.hasMap,
    openingHoursSpecification,
    parentOrganization: { '@id': ORG_ID },
  }));
}

/** BreadcrumbList — pass [name, path] pairs after Home, e.g. [['Services', '/services']]. */
export function breadcrumbSchema(items: Array<[name: string, path: string]>) {
  const all: Array<[string, string]> = [['Home', '/'], ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    })),
  };
}

/** FAQPage from the exact visible questions and answers. */
export function faqSchema(faqs: Array<{ q: string; a: string }>, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** CollectionPage + ItemList for category and brand pages. */
export function collectionSchema(opts: {
  path: string;
  name: string;
  description: string;
  items: Array<{ id: string; name: string }>;
}) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: BUSINESS.name },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      // First 100 products only, to keep large pages (e.g. 900+ Epson products) light.
      itemListElement: opts.items.slice(0, 100).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/products/${p.id}`,
        name: p.name,
      })),
    },
  };
}

/** Service entries for the services pages. */
export function serviceSchema(services: Array<{ id: string; name: string; description: string; path: string }>) {
  return services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${s.path}#${s.id}`,
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Tanzania' },
  }));
}
