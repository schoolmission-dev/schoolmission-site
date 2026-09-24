/**
 * Canonical URLs and the site's structured data.
 *
 * Canonicals are built here rather than left to `alternates: { canonical: '/x' }`
 * so the home page comes out as `https://schoolmission.org` and not
 * `https://schoolmission.org/`: metadataBase resolves a bare '/' with the
 * trailing slash attached, and the sitemap has always emitted the bare origin.
 * One shape in both places or search engines see two URLs for one page.
 *
 * The JSON-LD is assembled as plain objects and stamped into the page by
 * components/site/JsonLd.tsx.
 */

import { INSTAGRAM_URL, SITE_URL } from './nav';

/** `https://schoolmission.org` for the home page, `…/about` for a route. */
export function canonical(path = ''): string {
  if (path && !path.startsWith('/')) {
    throw new Error(`canonical() expects a rooted path, got "${path}"`);
  }
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path.replace(/\/$/, '')}`;
}

/** Stable @id anchors, so nodes on a page can reference each other. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const EIN = '42-3684753';

/**
 * The organisation, emitted on every page from the root layout.
 *
 * NGO per the brief. Every value here is already published somewhere on the
 * site — the legal description and EIN are the footer and About lines from
 * docs/copy.md, verbatim — so the structured data makes no claim the visible
 * page doesn't.
 */
export const organizationLd = {
  '@type': 'NGO',
  '@id': ORG_ID,
  name: 'SchoolMission',
  url: SITE_URL,
  slogan: 'Community service that pays for school.',
  description:
    'SchoolMission is a 501(c)(3) tax-exempt public charity in the United States and is licensed by the Department of Social Welfare in Ghana.',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'EIN',
    value: EIN,
  },
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brand/png/mark@2x.png`,
    width: 800,
    height: 800,
  },
  sameAs: [INSTAGRAM_URL],
} as const;

const websiteLd = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'SchoolMission',
  publisher: { '@id': ORG_ID },
} as const;

/** The graph every page carries. */
export function siteLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationLd, websiteLd],
  };
}

/**
 * A page describing one of the programmes.
 *
 * Deliberately not Event: Event's whole value in search is the date, and
 * neither Next Steps nor the Conference has one announced. A dateless Event
 * is an invalid rich result, so the programme is described as the subject of
 * the page instead, and Event schema waits for real dates.
 */
export function programLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = canonical(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name,
        description,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}
