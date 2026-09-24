'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Shared page shell for the prose routes. Measure is capped at 65ch,
// sub-headings are mono labels, and text links are terracotta.
//
// Reveals are scroll-linked on the same pattern as the home page, mapped so a
// block is fully in once its top sits halfway up the viewport — a block that
// never scrolls further cannot be left half-faded. Reduced motion is handled
// in CSS: server and client emit identical inline styles and the
// motion-reduce: variants override them. Do not branch on useReducedMotion.

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 50%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`motion-reduce:opacity-100! motion-reduce:transform-none! ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Cream band holding the page body, capped to a readable measure. */
export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-sm-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-[65ch] space-y-12">{children}</div>
      </div>
    </section>
  );
}

/** A labelled prose block: mono sub-heading over body copy. */
export function Block({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      {label && (
        <h2 className="font-mono text-xs uppercase tracking-widest text-sm-terracotta-text">
          {label}
        </h2>
      )}
      <div className={label ? 'mt-4 space-y-4' : 'space-y-4'}>{children}</div>
    </Reveal>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-sm-text-muted sm:text-lg">{children}</p>
  );
}

/** Opening paragraph of a page, a step up in size and contrast. */
export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-relaxed text-sm-coffee sm:text-xl">{children}</p>
  );
}

/**
 * The Join-us treatment — the yellow button from the hero and the footer — for
 * a page CTA on the cream band. Focus ring is coffee rather than cream, as in
 * the header, because here it lands on a light background.
 */
export function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-block rounded-md bg-sm-yellow px-4 py-2.5 text-center text-sm font-semibold text-sm-coffee transition-colors hover:bg-sm-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-coffee"
    >
      {children}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-block text-sm font-medium text-sm-terracotta-text transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta-text"
    >
      {children}
    </a>
  );
}
