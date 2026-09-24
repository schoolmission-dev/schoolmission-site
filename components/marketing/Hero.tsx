'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { APP_URL } from '@/lib/nav';

const LOOP_LINK = "Here's how our model works →";

export default function Hero() {
  const { scrollY } = useScroll();
  const patternY = useTransform(scrollY, [0, 600], [0, 140]);
  const contentY = useTransform(scrollY, [0, 600], [0, 40]);

  // Both layers emit the same inline transform on server and client; the
  // motion-reduce: classes below override it with !important rather than
  // branching on useReducedMotion, which would desync the two renders.
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-sm-coffee text-sm-cream">
      <motion.div
        aria-hidden="true"
        style={{ y: patternY }}
        className="pointer-events-none absolute inset-0 motion-reduce:transform-none!"
      >
        <svg
          className="absolute -right-32 -top-32 h-[640px] w-[640px] opacity-20"
          viewBox="0 0 640 640"
          fill="none"
        >
          {[80, 160, 240, 320].map((r) => (
            <circle key={r} cx="320" cy="320" r={r} stroke="#B8622C" strokeWidth="1.5" />
          ))}
        </svg>
        <svg
          className="absolute -bottom-40 -left-40 h-[480px] w-[480px] opacity-10"
          viewBox="0 0 480 480"
          fill="none"
        >
          {[60, 120, 180, 240].map((r) => (
            <circle key={r} cx="240" cy="240" r={r} stroke="#FAF6F1" strokeWidth="1.5" />
          ))}
        </svg>
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center motion-reduce:transform-none!"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Community service that pays for school.
        </h1>

        {/* text-base below sm: at 18px the longer line two wrapped to three
            lines on a 390px screen, overshooting the second by a few pixels. */}
        <p className="mt-4 font-mono text-base font-light tracking-tight text-sm-cream/80 sm:text-xl">
          Built for students, schools, missionaries, and NGOs in Ghana.
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-sm-cream/70 sm:text-lg">
          Most programs treat youth work, school fees, and community development as three
          separate problems. We run them as one loop: during school breaks, students serve
          their own communities — and that service pays for their next term.
        </p>

        {/* Full width with the link beneath it on small screens; both on one
            row from sm up. */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={APP_URL}
            className="w-full rounded-md bg-sm-yellow px-4 py-2.5 text-center text-sm font-semibold text-sm-coffee transition-colors hover:bg-sm-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sm-cream sm:w-auto"
          >
            Join us
          </a>
          <a
            href="#loop"
            className="text-sm font-medium text-sm-terracotta-on-dark transition-colors hover:text-sm-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta-on-dark"
          >
            {LOOP_LINK}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
