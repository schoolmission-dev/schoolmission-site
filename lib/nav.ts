/**
 * The full menu from docs/copy.md, "Site map and nav" and "Footer".
 *
 * Every entry carries `live`. Pages that need data before they can go live
 * stay in this file with `live: false` so the shape of the finished site is
 * visible in one place — nothing links to an empty page in the meantime.
 *
 * Links are defined once in `navLinks` and composed into both the header and
 * the footer, which group them differently: the header puts Our Mission
 * Theory at the top level, the footer files it under Learn. Flipping `live`
 * in one place therefore updates both menus at once.
 */

export type NavLink = {
  label: string;
  href: string;
  live: boolean;
  /** Opens in a new tab; NavHref adds rel="noopener" with it. */
  newTab?: boolean;
};

export type NavGroup = {
  label: string;
  live: boolean;
  children: NavLink[];
};

export type NavItem = NavLink | NavGroup;

const SUPPORT = 'support@schoolmission.org';
const DONATE_HREF = `mailto:${SUPPORT}?subject=Donation`;

/**
 * Everything that sends someone to the platform points at its landing page,
 * not at /register or /login. People arriving from the marketing site should
 * meet the app's own introduction and choose from there, rather than being
 * dropped straight into a form.
 */
export const APP_URL = 'https://app.schoolmission.org';
export const INSTAGRAM_URL = 'https://www.instagram.com/schoolmissions/';

type LinkKey =
  | 'missionTheory'
  | 'workshops'
  | 'fellows'
  | 'sites'
  | 'partners'
  | 'about'
  | 'donate'
  | 'careers'
  | 'volunteer'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'instagram';

/** The typed record widens `live` to boolean, so callers gating on it read as
    real runtime checks rather than statically dead branches. */
export const navLinks: Record<LinkKey, NavLink> = {
  missionTheory: { label: 'Our Mission Theory', href: '/mission-theory', live: true },
  workshops: { label: 'Workshops', href: '/workshops', live: true },
  fellows: { label: 'Our Fellows', href: '/fellows', live: true },
  sites: { label: 'Our Sites', href: '/sites', live: true },
  partners: { label: 'Partner Institutions', href: '/partners', live: true },
  about: { label: 'About Us', href: '/about', live: true },
  // Donate points at email until the donate page ships.
  donate: { label: 'Donate', href: DONATE_HREF, live: true },
  careers: { label: 'Careers', href: '/careers', live: true },
  // Volunteer is for Ghana students, who mostly arrive at app. directly.
  volunteer: { label: 'Volunteer', href: APP_URL, live: true },
  contact: { label: 'Contact', href: `mailto:${SUPPORT}`, live: true },
  privacy: {
    label: 'Privacy Policy',
    href: `mailto:${SUPPORT}?subject=Privacy%20Policy`,
    live: true,
  },
  terms: {
    label: 'Terms of Service',
    href: `mailto:${SUPPORT}?subject=Terms%20of%20Service`,
    live: true,
  },
  instagram: {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    live: true,
    newTab: true,
  },
};

/** Centre of the header: Our Mission Theory · Learn ▾ · Our Sites · Partner Institutions · About Us · Act ▾ */
export const primaryNav: NavItem[] = [
  navLinks.missionTheory,
  {
    label: 'Learn',
    live: true,
    children: [navLinks.workshops, navLinks.fellows],
  },
  navLinks.sites,
  navLinks.partners,
  navLinks.about,
  {
    label: 'Act',
    live: true,
    children: [navLinks.donate, navLinks.careers, navLinks.volunteer],
  },
];

/** Right of the header. */
export const signIn: NavLink = { label: 'Sign in', href: APP_URL, live: true };
export const donateCta: NavLink = { label: 'Donate', href: DONATE_HREF, live: true };

/**
 * Footer columns. Every group is live and gated purely by its children, so a
 * column appears on its own the moment one of its entries is flipped on.
 * Location and Social from copy.md are deliberately absent: both are
 * placeholders there, and the live site should carry no placeholder text.
 */
export const footerNav: NavGroup[] = [
  {
    label: 'Act',
    live: true,
    children: [navLinks.donate, navLinks.careers, navLinks.volunteer],
  },
  {
    label: 'Learn',
    live: true,
    children: [navLinks.missionTheory, navLinks.workshops, navLinks.fellows],
  },
  {
    label: 'Places',
    live: true,
    children: [navLinks.sites, navLinks.partners],
  },
  {
    label: 'Quick links',
    live: true,
    children: [navLinks.about, navLinks.contact, navLinks.privacy, navLinks.terms],
  },
  {
    label: 'Social',
    live: true,
    children: [navLinks.instagram],
  },
];

export function isGroup(item: NavItem): item is NavGroup {
  return 'children' in item;
}

export function isExternal(href: string): boolean {
  return /^(?:https?:|mailto:|tel:)/.test(href);
}

/**
 * Live entries only. A group survives only if it is itself live and still has
 * at least one live child, so a group empties out of the menu on its own as
 * children are flipped off.
 */
export function visibleNav(items: NavItem[] = primaryNav): NavItem[] {
  return items.flatMap<NavItem>((item) => {
    if (!item.live) return [];
    if (!isGroup(item)) return [item];

    const children = item.children.filter((child) => child.live);
    return children.length > 0 ? [{ ...item, children }] : [];
  });
}

/** The footer's live columns, already filtered down to live entries. */
export function visibleFooterNav(): NavGroup[] {
  return visibleNav(footerNav).filter(isGroup);
}
