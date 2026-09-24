'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Home section 3, "The Loop", from docs/copy.md. Step bodies and chip text
// are verbatim.
//
// Desktop reads clockwise rather than in grid order: 1 top-left, 2 top-right,
// 3 bottom-right, 4 bottom-left. DOM order stays 1-4 so the mobile stack and
// the reading order for assistive tech are both correct; only the md+ grid
// placement is reordered.
//
// Reduced motion is handled in CSS, not in React — same rule as the hero and
// the app's Encouragements. Server and client emit identical inline styles and
// the motion-reduce: variants override them with !important. Do not branch on
// useReducedMotion() in render.

const STEPS = [
  {
    n: '1',
    title: 'Serve',
    body: 'Students admitted to a cohort are placed on community projects run by partner missions and organizations during school breaks. Every placement has a named supervisor.',
    chips: ['Cohort', 'Placement', 'Supervised'],
    place: 'md:col-start-1 md:row-start-1',
  },
  {
    n: '2',
    title: 'Verify',
    body: 'When the work is done, the supervisor reviews it and assigns Community Value Credits for effort, quality, and collaboration. Only the supervisor can do this.',
    chips: ['Review', 'Credits', 'Supervisor only'],
    place: 'md:col-start-2 md:row-start-1',
  },
  {
    n: '3',
    title: 'Redeem',
    body: "SchoolMission converts credits into a one-time voucher — a QR code and a PIN, valid for thirty days at the student's own school — for tuition, meals, or textbooks.",
    chips: ['Voucher', 'QR + PIN', '30 days'],
    place: 'md:col-start-2 md:row-start-2',
  },
  {
    n: '4',
    title: 'Reimburse',
    body: 'The school confirms the voucher at the counter, delivers the service, and is paid its value by mobile money. Every step is on the record.',
    chips: ['Confirm', 'Mobile money', 'Audit trail'],
    place: 'md:col-start-1 md:row-start-2',
  },
] as const;

const HONEST =
  "No cash ever passes to a student. Vouchers are one-time and expire. Credit records can't be edited or deleted. And nobody but the supervising organization can assign a credit.";

function Step({ n, title, body, chips, place }: (typeof STEPS)[number]) {
  const ref = useRef<HTMLLIElement>(null);

  // Scroll-linked rather than a one-shot entrance, matching Encouragements.
  // The tile is fully in by the time its top sits 45% down the viewport, so a
  // tile that never scrolls further cannot be left half-faded.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 45%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity, y }}
      className={`relative pl-14 motion-reduce:opacity-100! motion-reduce:transform-none! md:pl-0 ${place}`}
    >
      <div className="relative h-full rounded-xl border border-sm-border bg-sm-white p-7">
        {/* On mobile this sits out on the rail; the cream disc masks the line
            behind it. At md+ it returns to normal flow inside the tile. */}
        <p className="absolute -left-14 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-sm-cream font-mono text-sm text-sm-terracotta-text md:static md:block md:h-auto md:w-auto md:bg-transparent">
          {n}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-sm-coffee">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-sm-text-muted">{body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-sm-terracotta/30 px-2.5 py-1 font-mono text-xs text-sm-terracotta-text"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function Loop() {
  return (
    <section
      id="loop"
      className="scroll-mt-20 overflow-hidden bg-sm-cream pb-20 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-sm-coffee sm:text-4xl">
            The Loop
          </h2>
          <p className="mt-3 font-mono text-sm text-sm-text-muted sm:text-base">
            How service becomes education in our system
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Desktop: a hub ring sitting in the cross between the four tiles.
              A large ring behind the whole grid was tried first and rejected —
              the tiles cover all but a few disconnected fragments, and its top
              and bottom arcs cut through the sub-heading and the honesty note.
              At this size the ring reads as one deliberate mark at the centre
              the four steps turn around. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sm-terracotta/30 md:block"
          />
          {/* Mobile: the rail the step numbers sit on. */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-4 left-4 top-4 w-px bg-sm-terracotta/30 md:hidden"
          />

          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
            {STEPS.map((step) => (
              <Step key={step.n} {...step} />
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-16 max-w-[60ch] text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-sm-terracotta-text">
            To keep the loop honest
          </p>
          <p className="mt-4 text-base leading-relaxed text-sm-text-muted">
            {HONEST}
          </p>
        </div>
      </div>
    </section>
  );
}
