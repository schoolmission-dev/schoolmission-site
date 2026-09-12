import { visibleFooterNav } from '@/lib/nav';
import Lockup from '@/components/brand/Lockup';
import NavHref from './NavHref';

// Footer from docs/copy.md, driven by the same lib/nav.ts config as the header
// so it can never show a dead link. Columns come from visibleFooterNav(), which
// drops entries that are not live and drops a column once nothing in it is, so
// Learn and Places stay off the page until their pages exist.
//
// copy.md also lists Location and Social. Both are placeholders there
// (`[Accra, Ghana]`, `[the ones that exist]`), so neither is rendered — the
// live site carries no placeholder text.

export default function Footer() {
  const columns = visibleFooterNav();
  // Server component, so this is the year at build time.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sm-coffee text-sm-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Lockup variant="dark" className="h-8 w-auto" />
            <p className="mt-3 font-mono text-xs leading-relaxed text-sm-cream/60">
              Community service that pays for school.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.label}>
              <p className="font-mono text-xs uppercase tracking-widest text-sm-terracotta">
                {column.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.children.map((child) => (
                  <li key={child.label}>
                    <NavHref
                      item={child}
                      className="text-sm text-sm-cream/70 transition-colors hover:text-sm-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-sm-cream/10 pt-8">
          <p className="font-mono text-xs text-sm-cream/50">
            © {year} SchoolMission. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
