'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  donateCta,
  isExternal,
  isGroup,
  signIn,
  visibleNav,
  type NavGroup,
  type NavLink as NavLinkItem,
} from '@/lib/nav';

type NavHrefProps = {
  item: NavLinkItem;
  className?: string;
  role?: React.AriaRole;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

/** Internal routes go through Link; mailto: and app. links are plain anchors. */
function NavHref({ item, ...props }: NavHrefProps) {
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

const DESKTOP_LINK =
  'text-sm text-sm-text-muted transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta';

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Index to focus once the menu has mounted; null when there is nothing pending.
  const pendingFocus = useRef<number | null>(null);
  const menuId = useId();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const focusItem = useCallback((index: number) => {
    const items = containerRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
    if (!items || items.length === 0) return;
    items[(index + items.length) % items.length].focus();
  }, []);

  // Focus the requested item once the menu has actually mounted.
  useEffect(() => {
    if (!open || pendingFocus.current === null) return;
    const index = pendingFocus.current;
    pendingFocus.current = null;
    focusItem(index);
  }, [open, focusItem]);

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const index = event.key === 'ArrowUp' ? -1 : 0;
    if (open) {
      focusItem(index);
    } else {
      pendingFocus.current = index;
      setOpen(true);
    }
  };

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(-1);
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className={`inline-flex cursor-pointer items-center gap-1 ${DESKTOP_LINK} ${
          open ? 'text-sm-coffee' : ''
        }`}
      >
        {group.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform duration-150 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={group.label}
          className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-md border border-sm-border bg-sm-white py-1 shadow-lg shadow-sm-coffee/5"
        >
          {group.children.map((child, index) => (
            <NavHref
              key={child.label}
              item={child}
              role="menuitem"
              onClick={() => setOpen(false)}
              onKeyDown={(event) => onItemKeyDown(event, index)}
              className="block px-4 py-2 text-sm text-sm-text transition-colors hover:bg-sm-cream hover:text-sm-coffee focus:bg-sm-cream focus:text-sm-coffee focus:outline-none"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const items = visibleNav();
  const drawerId = useId();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    // Resizing up to desktop hides the drawer, so release the lock with it.
    const desktop = window.matchMedia('(min-width: 768px)');
    const onDesktop = () => {
      if (desktop.matches) setDrawerOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled || drawerOpen
          ? 'border-b border-sm-border bg-sm-cream/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
        >
          SchoolMission
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {items.map((item) =>
            isGroup(item) ? (
              <NavDropdown key={item.label} group={item} />
            ) : (
              <NavHref key={item.label} item={item} className={DESKTOP_LINK} />
            ),
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <NavHref
            item={signIn}
            className="text-sm font-medium text-sm-coffee transition-colors hover:text-sm-terracotta focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
          />
          <NavHref
            item={donateCta}
            className="rounded-md bg-sm-yellow px-4 py-2 text-sm font-semibold text-sm-coffee transition-colors hover:bg-sm-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-coffee"
          />
        </div>

        <button
          type="button"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen((value) => !value)}
          className="-mr-2 inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-terracotta md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {drawerOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {drawerOpen && (
        <div className="md:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={closeDrawer}
            className="fixed inset-x-0 bottom-0 top-16 z-40 cursor-default bg-sm-coffee/40"
          />
          <div
            id={drawerId}
            className="relative z-50 border-t border-sm-border bg-sm-cream px-6 pb-6 pt-2 shadow-lg shadow-sm-coffee/5"
          >
            {items.map((item) =>
              isGroup(item) ? (
                <div key={item.label} className="py-2">
                  <p className="px-1 pb-1 font-mono text-xs uppercase tracking-wide text-sm-text-muted">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <NavHref
                      key={child.label}
                      item={child}
                      onClick={closeDrawer}
                      className="block rounded-md px-1 py-2.5 text-base text-sm-text transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-terracotta"
                    />
                  ))}
                </div>
              ) : (
                <NavHref
                  key={item.label}
                  item={item}
                  onClick={closeDrawer}
                  className="block rounded-md px-1 py-2.5 text-base text-sm-text transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-terracotta"
                />
              ),
            )}

            <div className="mt-3 flex flex-col gap-3 border-t border-sm-border pt-4">
              <NavHref
                item={signIn}
                onClick={closeDrawer}
                className="px-1 text-base font-medium text-sm-coffee transition-colors hover:text-sm-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-terracotta"
              />
              <NavHref
                item={donateCta}
                onClick={closeDrawer}
                className="rounded-md bg-sm-yellow px-4 py-3 text-center text-base font-semibold text-sm-coffee transition-colors hover:bg-sm-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-coffee"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
