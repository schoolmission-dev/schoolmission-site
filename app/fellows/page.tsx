import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, Reveal } from '@/components/site/Prose';
import TileGrid, { type Tile } from '@/components/site/TileGrid';
import { INSTAGRAM_URL } from '@/lib/nav';

// "Our Fellows" from docs/copy.md draft 6. All copy verbatim.
//
// No photos and no names, per the design note and the closing line: fellows are
// fifteen to nineteen and most are minors.

const TITLE = 'Our Fellows';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description:
    'Who a SchoolMission fellow is: senior high students in Ghana who serve on supervised projects, earn credits, and leave with a verified record.',
  openGraph: { title: `${TITLE} | SchoolMission` },
  alternates: { canonical: canonical('/fellows') },
};

const INTRO =
  'Fellows are the students admitted to a SchoolMission cohort. Every fellow is placed with a named supervisor, on a real project, at a school that has agreed to honor their vouchers. Being a fellow means being trusted with work that matters.';

const TILES: Tile[] = [
  {
    label: 'Who they are',
    body: 'Senior high school students in Ghana, most between fifteen and nineteen, who would otherwise spend the school break looking for money to come back to class.',
  },
  {
    label: 'How they join',
    body: 'By application and admission to a cohort. Cohorts are kept small on purpose, so every fellow has a supervisor who knows their name and a school that has agreed to honor their vouchers.',
  },
  {
    label: 'What they do',
    body: 'Supervised community work during school breaks: water points, farm plots, classrooms, clinics — the practical projects partner missions and organizations already run.',
  },
  {
    label: 'What they earn',
    body: "Community Value Credits, assigned by the supervisor who watched the work. Credits become vouchers at the fellow's own school — tuition, meals, textbooks. No cash, ever.",
  },
  {
    label: 'What they leave with',
    body: "A verified service record: every placement, every credit, every voucher, on the platform, in their name. It's the first line of a résumé most of them didn't know they were writing.",
  },
  {
    label: 'What happens after',
    body: "Fellows who complete a placement move to alumni status and keep their record for good. The loop doesn't end when the placement does.",
  },
];

const CLOSING =
  'We describe our fellows as a group, not as individuals. Most are minors, and their stories are theirs to tell.';

export default function FellowsPage() {
  return (
    <>
      <PageHeader title={TITLE} sub="The students at the center of the loop" />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>
      </Prose>

      <section className="bg-sm-cream pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <TileGrid tiles={TILES} />

          <Reveal className="mt-14">
            <p className="max-w-[60ch] font-mono text-sm leading-relaxed text-sm-text-muted">
              {CLOSING}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-block text-sm font-medium text-sm-terracotta-text transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta-text"
            >
              Follow each cohort on Instagram →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
