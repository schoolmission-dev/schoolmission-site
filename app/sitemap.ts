import type { MetadataRoute } from 'next';
import { SITE_URL, isExternal, navLinks } from '@/lib/nav';

/**
 * Routes are derived from lib/nav.ts rather than listed again here, so the
 * sitemap cannot drift from the site. A page joins it the moment its entry is
 * flipped live — which is also the moment the page exists, since that is what
 * `live` means everywhere else in the config.
 *
 * External entries (the mailto: links, the app, Instagram) are filtered out;
 * only this site's own routes belong in its sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // This route is static, so the date is fixed at build time.
  const lastModified = new Date();

  const paths = Object.values(navLinks)
    .filter((link) => link.live && !isExternal(link.href))
    .map((link) => link.href)
    .sort();

  return [
    { url: SITE_URL, lastModified, priority: 1 },
    ...paths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      priority: 0.7,
    })),
  ];
}
