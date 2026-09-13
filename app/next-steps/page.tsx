import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, ButtonLink, Lead, Reveal, TextLink } from '@/components/site/Prose';
import TileGrid, { type Tile } from '@/components/site/TileGrid';
import { APP_URL } from '@/lib/nav';

// "Next Steps" from docs/copy.md draft 9. All copy verbatim.
//
// This route replaced /workshops, which draft 9 renamed; next.config.ts keeps
// the old URL alive with a permanent redirect. The workshops@ alias stays, per
// the design note — it fits the new name.

const TITLE = 'Next Steps';
const PRESENT_HREF =
  'mailto:workshops@schoolmission.org?subject=Present%20at%20Next%20Steps';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description:
    'A workshop for college, career, and calling: vocational discernment, applications, test preparation, scholarships, and academic counseling for every fellow.',
  openGraph: { title: `${TITLE} | SchoolMission` },
};

const INTRO =
  'Next Steps is a workshop that helps a fellow answer the question every senior high student eventually faces: what comes after this, and how do I get there? Service pays for school; Next Steps is about what school is for. It runs alongside placements and, in full, at the Conference.';

const TILES: Tile[] = [
  {
    label: 'Vocational discernment',
    body: 'Not "what job" but "what are you for." Structured conversations and assessments that help a fellow name their interests, their strengths, and their calling — whether that leads to a trade, a profession, ministry, or the university.',
  },
  {
    label: 'College and university applications',
    body: 'Choosing courses and institutions, writing applications and personal statements, meeting deadlines. A mentor works through it with the fellow, not for them.',
  },
  {
    label: 'Test preparation',
    body: 'Partner test-prep organizations present what the exams ask and how to prepare — WASSCE first, and for fellows aiming abroad, the SAT and English proficiency tests.',
  },
  {
    label: 'Scholarships and funding',
    body: 'Where the money for the next step comes from: scholarship search, application support, and what a verified SchoolMission service record adds to an application.',
  },
  {
    label: 'Academic counseling',
    body: 'One-to-one sessions with academic counselors on subject choices, study habits, and recovery when results disappoint.',
  },
  {
    label: 'Presentations from partners',
    body: "Universities, training institutions, and employers come to Next Steps to show fellows what's possible — and what it takes.",
  },
];

const CLOSING =
  "Next Steps is part of being a fellow. There's nothing to sign up for beyond the cohort.";

export default function NextStepsPage() {
  return (
    <>
      <PageHeader title={TITLE} sub="A workshop for college, career, and calling" />

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

            {/* Button full width with the link beneath it on small screens,
                both on one row from sm up — the hero's CTA pairing. */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={APP_URL}>Become a fellow →</ButtonLink>
              <TextLink href={PRESENT_HREF}>Present at Next Steps →</TextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
