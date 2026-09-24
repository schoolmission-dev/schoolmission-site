import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, P, Reveal, TextLink } from '@/components/site/Prose';

// "Careers" from docs/copy.md. Copy verbatim with one deliberate change:
// copy.md's step 3 reads "contribute [X]% of your earnings". The percentage is
// an unfilled placeholder, so the page says "a share of your earnings" instead
// — no number is published until there is a real one.
//
// copy.md's apply CTA is also an unresolved placeholder
// (`[app.schoolmission.org/register or a form — see decisions]`); both CTAs
// here are mailto links to careers@schoolmission.org.

export const metadata: Metadata = {
  title: 'Careers | SchoolMission',
  description:
    'Paid summer positions at partner camps and churches across the United States. Earn toward your own education and fund a school year in Ghana.',
  openGraph: { title: 'Careers | SchoolMission' },
  alternates: { canonical: canonical('/careers') },
};

const APPLY_HREF =
  'mailto:careers@schoolmission.org?subject=Career%20placement%20application';
const HIRE_HREF =
  'mailto:careers@schoolmission.org?subject=Hiring%20through%20SchoolMission';

const LEAD =
  "You build skills and earn toward your own education. A share of what you earn funds a student's school year in Ghana. You'll know exactly whose.";

const STEPS = [
  {
    n: '1',
    title: 'Apply',
    body: 'Students apply for a summer placement. We match you with a partner camp or church that needs the role you can fill — counselor, program staff, kitchen, facilities, youth ministry support.',
  },
  {
    n: '2',
    title: 'Serve and earn',
    body: "You work a full summer season on your host's payroll, with a supervisor and a defined role. It's a job: a paycheck, a reference, and a season of real responsibility.",
  },
  {
    n: '3',
    title: 'Give a share',
    body: "When you accept the placement, you sign an agreement to contribute a share of your earnings to the SchoolMission credit pool. It's deducted each pay period, so you never have to think about it. The rest is yours — for tuition, for savings, for whatever your own education needs.",
  },
  {
    n: '4',
    title: 'See where it goes',
    body: "You're matched with a student in Ghana. Their placement, their credits, and the vouchers they redeem show up on your dashboard as they happen. At the end of the summer you'll know which school year you helped pay for.",
  },
];

const TAKEAWAY =
  "A paid season on your record. A reference from your host. Skills you'll use for the rest of your life — leadership, childcare, program delivery, working on a team under pressure. And a verified service record on the platform, the same kind every fellow in Ghana earns.";

const HOST = [
  'You get seasonal staff who applied because they wanted the work to mean something. We handle recruitment and matching. You handle the role, the supervision, and the payroll, exactly as you would for any seasonal hire.',
  "Your camp or congregation becomes a funding partner for education in Ghana without writing a check. The giving comes from your staff's own earnings, and we report back on what it funded.",
  'For congregations, this is mission work that starts in your own youth group. Your students serve here, and a share of what they earn supports the ministry at home in Ghana — the churches and missions hosting students on community projects.',
];

const ROLES =
  "We don't have open staff roles at SchoolMission itself right now. When we do, they'll be listed here. If you'd like to be considered before then, send a note and a résumé to careers@schoolmission.org and say what kind of work you're looking for. We keep every message.";

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Earn your summer. Fund a school year."
        sub="Paid summer positions at partner camps and churches across the United States"
      />

      <section className="bg-sm-cream pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-[65ch]">
            <Reveal>
              <Lead>{LEAD}</Lead>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sm-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-sm-terracotta">
              How it works
            </h2>
          </Reveal>

          <ol className="mt-8 space-y-6">
            {STEPS.map((step) => (
              <li key={step.n}>
                <Reveal>
                  <div className="rounded-xl border border-sm-border bg-sm-white p-7">
                    <p className="font-mono text-sm text-sm-terracotta">{step.n}</p>
                    <h3 className="mt-3 text-xl font-semibold text-sm-coffee">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sm-text-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Prose>
        <Block label="What you take with you">
          <P>{TAKEAWAY}</P>
          <TextLink href={APPLY_HREF}>Apply for a placement →</TextLink>
        </Block>
      </Prose>

      <section id="host" className="scroll-mt-20 bg-sm-coffee py-20 text-sm-cream sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-[65ch]">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-sm-terracotta">
                For camps and churches
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Hire through SchoolMission
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {HOST.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-sm-cream/75 sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <a
                href={HIRE_HREF}
                className="inline-block text-sm font-medium text-sm-terracotta transition-colors hover:text-sm-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
              >
                Hire through SchoolMission →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Prose>
        <Block label="Roles at SchoolMission">
          <P>{ROLES}</P>
        </Block>
      </Prose>
    </>
  );
}
