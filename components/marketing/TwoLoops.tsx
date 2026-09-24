import { navLinks } from '@/lib/nav';

// Home section 4, "Two loops, one system", from docs/copy.md. Both body lines
// are verbatim.
//
// The two rings are the section's whole design element: same construction as
// the Loop hub ring, overlapping by about a fifth of their width so they read
// as two links of a chain — the service loop in Ghana hooked into the funding
// loop in the US.

const LEAD =
  'The service loop runs in Ghana. The funding loop runs in the United States.';

const BODY =
  "Every summer, SchoolMission places US students in paid positions at partner camps and churches. They earn wages, build skills, and put a share of what they earn toward their own education — and a share toward the credit pool that pays for a student's school year in Ghana. Each of them is matched to the student they're helping fund and can follow their progress.";

const RING = 'h-32 w-32 rounded-full border-2 border-sm-terracotta/30 sm:h-40 sm:w-40';
const LABEL = 'mt-4 font-mono text-xs uppercase tracking-widest text-sm-terracotta-text';

export default function TwoLoops() {
  return (
    <section className="bg-sm-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-sm-coffee sm:text-4xl">
          Two loops, one system
        </h2>

        <div className="mt-12 flex items-start justify-center">
          <div className="flex flex-col items-center">
            <span aria-hidden className={RING} />
            <p className={LABEL}>Ghana</p>
          </div>
          {/* Overlap is a fifth of the ring width at both sizes: 24/128, 32/160. */}
          <div className="-ml-6 flex flex-col items-center sm:-ml-8">
            <span aria-hidden className={RING} />
            <p className={LABEL}>United States</p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[60ch]">
          <p className="text-lg leading-relaxed text-sm-coffee sm:text-xl">{LEAD}</p>
          <p className="mt-6 text-base leading-relaxed text-sm-text-muted">{BODY}</p>

          {/* Renders only once Careers is live, so nothing points at a 404. */}
          {navLinks.careers.live && (
            <a
              href={navLinks.careers.href}
              className="mt-6 inline-block text-sm font-medium text-sm-terracotta-text transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta-text"
            >
              See careers →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
