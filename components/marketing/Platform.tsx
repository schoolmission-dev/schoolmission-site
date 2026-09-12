import { APP_URL } from '@/lib/nav';

// Home section 6, "The platform", from docs/copy.md. Heading and paragraph
// verbatim.

const BODY =
  'Placements, verification, vouchers, reimbursements, summer earnings, and contributions all run on the SchoolMission platform, so a student in Ghana, a supervisor, a school, a student in the US, and a donor are all looking at the same record.';

export default function Platform() {
  return (
    <section className="bg-sm-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-[60ch]">
          <h2 className="text-3xl font-bold tracking-tight text-sm-coffee sm:text-4xl">
            One platform runs both loops
          </h2>

          <p className="mt-6 text-base leading-relaxed text-sm-text-muted sm:text-lg">
            {BODY}
          </p>

          <a
            href={APP_URL}
            className="mt-6 inline-block text-sm font-medium text-sm-terracotta transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
          >
            Open the platform →
          </a>
        </div>
      </div>
    </section>
  );
}
