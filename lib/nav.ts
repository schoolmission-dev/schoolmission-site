/**
 * The full menu from docs/copy.md, "Site map and nav".
 *
 * Every entry carries `live`. Pages that need data before they can go live
 * stay in this file with `live: false` so the shape of the finished nav is
 * visible in one place — nothing links to an empty page in the meantime.
 */

export type NavLink = {
  label: string;
  href: string;
  live: boolean;
};

export type NavGroup = {
  label: string;
  live: boolean;
  children: NavLink[];
};

export type NavItem = NavLink | NavGroup;

const DONATE_HREF = 'mailto:support@schoolmission.org?subject=Donation';
const APP_REGISTER = 'https://app.schoolmission.org/register';
const APP_LOGIN = 'https://app.schoolmission.org/login';

/** Center of the nav: Our Mission Theory · Learn ▾ · Our Sites · Partner Institutions · About Us · Act ▾ */
export const primaryNav: NavItem[] = [
  { label: 'Our Mission Theory', href: '/mission-theory', live: false },
  {
    label: 'Learn',
    live: false,
    children: [
      { label: 'Workshops', href: '/workshops', live: false },
      { label: 'Our Fellows', href: '/fellows', live: false },
    ],
  },
  { label: 'Our Sites', href: '/sites', live: false },
  { label: 'Partner Institutions', href: '/partners', live: false },
  { label: 'About Us', href: '/about', live: false },
  {
    label: 'Act',
    live: true,
    children: [
      // Donate points at email until the donate page ships.
      { label: 'Donate', href: DONATE_HREF, live: true },
      { label: 'Careers', href: '/careers', live: false },
      // Volunteer is for Ghana students, who mostly arrive at app. directly.
      { label: 'Volunteer', href: APP_REGISTER, live: true },
    ],
  },
];

/** Right of the nav. */
export const signIn: NavLink = { label: 'Sign in', href: APP_LOGIN, live: true };
export const donateCta: NavLink = { label: 'Donate', href: DONATE_HREF, live: true };

export function isGroup(item: NavItem): item is NavGroup {
  return 'children' in item;
}

export function isExternal(href: string): boolean {
  return /^(?:https?:|mailto:|tel:)/.test(href);
}

/**
 * Live entries only. A group survives only if it is itself live and still has
 * at least one live child, so a group empties out of the nav on its own as
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
