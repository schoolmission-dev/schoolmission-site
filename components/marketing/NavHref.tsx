import Link from 'next/link';
import { isExternal, type NavLink } from '@/lib/nav';

// Shared by TopNav and Footer. Deliberately not a client component: it holds
// no state, so it renders on the server inside Footer and is pulled into the
// client bundle by TopNav, which does pass handlers.

export type NavHrefProps = {
  item: NavLink;
  className?: string;
  role?: React.AriaRole;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

/** Internal routes go through Link; mailto: and app. links are plain anchors. */
export default function NavHref({ item, ...props }: NavHrefProps) {
  return isExternal(item.href) ? (
    <a href={item.href} {...props}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} {...props}>
      {item.label}
    </Link>
  );
}
