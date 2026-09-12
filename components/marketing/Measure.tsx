// Home section 5, "What we measure", from docs/copy.md. Intro and all four
// outcomes verbatim. The bracketed note in copy.md is a reminder to swap in
// real figures once any exist, so it stays out of the page.

const INTRO =
  "We're at the start. Every cohort will be measured against these four outcomes, and this section will carry the numbers as they come in.";

const OUTCOMES = [
  'Fewer students exposed to exploitative work during school breaks',
  'More students in safe, structured activity while school is out',
  'More students able to pay for school fees, meals, and books',
  'A verified service record for every student who completes a placement',
];

export default function Measure() {
  return (
    <section className="bg-sm-coffee py-20 text-sm-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          What we measure
        </h2>

        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-sm-cream/70 sm:text-lg">
          {INTRO}
        </p>

        <ul className="mt-10 max-w-[60ch] space-y-5">
          {OUTCOMES.map((outcome) => (
            <li key={outcome} className="flex gap-4">
              {/* A small ring bullet, echoing the rings elsewhere on the page. */}
              <span
                aria-hidden
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-sm-terracotta"
              />
              <span className="text-base leading-relaxed text-sm-cream/85 sm:text-lg">
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
