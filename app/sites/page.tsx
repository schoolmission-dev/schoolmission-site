import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, P, Reveal, TextLink } from '@/components/site/Prose';
import TileGrid, { type Tile } from '@/components/site/TileGrid';

// "Our Sites" from docs/copy.md draft 6. All copy verbatim.
//
// Each tile carries a small terracotta ring in its corner — the site motif —
// rather than an icon, per the design note. No icon set, no emoji.

const TITLE = 'Our Sites';
const PARTNERS_HREF = 'mailto:partners@schoolmission.org';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description: 'Where the loop runs: a host organization running projects, a school that honors vouchers, and a cohort of fellows.',
  openGraph: { title: `${TITLE} | SchoolMission` },
};

const INTRO =
  'A site is a community where three things are in place: a host organization running projects, a school that honors vouchers, and a cohort of fellows serving during school breaks.';

const PROXIMITY =
  "Every site is close to the school and the homes of the fellows who serve there. That's deliberate. Students learn in the classroom, come home for the break, and put what they've learned to work in their own community alongside the missionaries and organizations already there — instead of leaving to find work somewhere else. The village they grow up in is the one they build.";

const KINDS = 'The work falls into a few kinds.';

const TILES: Tile[] = [
  {
    label: 'Agriculture',
    body: 'Farm plots, post-harvest handling, gardens that feed a school. Fellows work alongside farmers on the problems the community already knows it has.',
  },
  {
    label: 'Clean water',
    body: 'Water points, storage, sanitation. The projects with the most direct effect on whether children stay healthy and in school.',
  },
  {
    label: 'Technology',
    body: 'Digital skills for students and community groups, and the practical work of helping schools and hosts run the SchoolMission platform itself.',
  },
  {
    label: 'Infrastructure',
    body: 'Classrooms, latrines, paths, repairs — the physical work hosts have always needed hands for, now supervised and credited.',
  },
  {
    label: 'Camps',
    body: "Structured, multi-week programs during the break where a cohort serves together on one host's projects: set days, a supervisor on site, and a group that finishes as a team.",
  },
];

const CLOSING =
  "Every site, whatever the work, runs on the same rules: a named supervisor, verified credits, and vouchers honored at the fellow's own school.";

export default function SitesPage() {
  return (
    <>
      <PageHeader title={TITLE} sub="Where the loop runs" />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>
        <Block>
          <P>{PROXIMITY}</P>
          <P>{KINDS}</P>
        </Block>
      </Prose>

      <section className="bg-sm-cream pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <TileGrid tiles={TILES} ring />

          <Reveal className="mt-14">
            <p className="max-w-[60ch] font-mono text-sm leading-relaxed text-sm-text-muted">
              {CLOSING}
            </p>
            <div className="mt-5">
              <TextLink href={PARTNERS_HREF}>
                Bring SchoolMission to your community →
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
