// Home section 2, "Our purpose", from docs/copy.md.
//
// The vision line is the placeholder copy.md carries until Emmanuel writes
// the real one (copy.md marks it `[yours — under fifteen words]`). The
// mission is final and verbatim.

const VISION =
  'A world where every student can earn their education by serving their community.';

const MISSION =
  'To protect and empower students by transforming school breaks into structured, community-based service opportunities that generate educational value, reduce vulnerability, and build traceable experience.';

export default function Purpose() {
  return (
    <section className="bg-sm-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sm-terracotta-text">
            Vision
          </p>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-sm-coffee sm:text-xl">
            {VISION}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sm-terracotta-text">
            Mission
          </p>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-sm-coffee sm:text-xl">
            {MISSION}
          </p>
        </div>
      </div>
    </section>
  );
}
