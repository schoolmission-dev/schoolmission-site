'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

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

        <p className="mt-4 font-mono text-2xl font-light tracking-tight text-sm-cream/80 sm:text-3xl">
          Designed with students, missions, and schools in Ghana.
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-sm-cream/70 sm:text-lg">
          Most programs treat youth work, school fees, and community development as three
          separate problems. We run them as one loop — because the same school break that
          pushes a student toward unsafe work is the one when community projects need hands
          most.
        </p>
      </motion.div>
    </section>
  );
}
