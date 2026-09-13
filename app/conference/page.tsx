import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, ButtonLink, Lead, P, Reveal, TextLink } from '@/components/site/Prose';
import TileGrid, { type Tile } from '@/components/site/TileGrid';
import { INSTAGRAM_URL } from '@/lib/nav';

// "Conference" from docs/copy.md draft 9. All copy verbatim.
//
// The Conference has no dates yet, so the dates line points at Instagram
// rather than carrying a placeholder. Mail goes to partners@ with a subject
// per CTA; copy.md leaves a conference@ alias for later.

const TITLE = 'The SchoolMission Conference';
const MAIL = 'mailto:partners@schoolmission.org';
const COME_HREF = `${MAIL}?subject=Conference`;
const GROUP_HREF = `${MAIL}?subject=Conference%20group`;
const MENTOR_HREF = `${MAIL}?subject=Conference%20mentor`;

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description:
    'A gathering for prayer, formation, and care: everything Next Steps offers, plus what a workshop cannot — prayer, teaching, and pastoral care for every fellow.',
  openGraph: { title: `${TITLE} | SchoolMission` },
};

const INTRO =
  'The Conference is where SchoolMission gathers — fellows, partner churches and missions, parents, teachers, and anyone who wants to know us better. It holds everything Next Steps offers, and adds what a workshop can’t: prayer, formation, and care. Chaplains, mentors, and partner ministries lead days of prayer, teaching, and rest, and every fellow leaves known by name.';

const TILES: Tile[] = [
  {
    label: 'Prayer and worship',
    body: "Mornings and evenings gathered in prayer, led by chaplains and partner churches. For many fellows it's the first time adults outside their family have prayed for them by name.",
  },
  {
    label: 'Spiritual formation',
    body: 'Chaplaincy sessions on faith, character, and the questions teenagers actually ask. Not a lecture series: small groups, with a mentor who stays with the same group for the whole conference.',
  },
  {
    label: 'Ministry workshops',
    body: 'Partner ministries lead workshops that hold academics and faith together — study as vocation, service as worship, leadership as stewardship.',
  },
  {
    label: 'Next Steps, in full',
    body: 'The whole Next Steps workshop runs inside the Conference — vocational discernment, college applications, test preparation, scholarships, academic counseling — so a fellow leaves with a next step and not just a feeling. What are you called to do? A trade, a profession, ministry, further study. Here there’s time to find out.',
  },
  {
    label: 'Counseling and spiritual care',
    body: 'Trained mentors offer confidential listening and pastoral care, particularly for fellows carrying abuse, hardship, or the wounds of a broken home. Mentors are not a substitute for professional help; when a fellow needs more, we connect them to it.',
  },
];

const FOR =
  'Open to anyone who wants to know SchoolMission better. Fellows take part in the full Next Steps workshop as part of their fellowship — a plus earned by their service. Everyone else is welcome to the prayer, the teaching, and the conversation.';

const LEADS =
  'Chaplains and mentors from partner churches and missions in Ghana, alongside visiting ministry teams from the United States.';

const CLOSING =
  "The Conference is where SchoolMission stops asking what a fellow can do and asks how they're doing.";

export default function ConferencePage() {
  return (
    <>
      <PageHeader title={TITLE} sub="A gathering for prayer, formation, and care" />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>
      </Prose>

      <section className="bg-sm-cream pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <TileGrid tiles={TILES} />

          <div className="mt-14 max-w-[65ch] space-y-10">
            <Block label="Who it's for">
              <P>{FOR}</P>
            </Block>

            <Block label="Who leads it">
              <P>{LEADS}</P>
            </Block>
          </div>

          <Reveal className="mt-14">
            <p className="max-w-[60ch] font-mono text-sm leading-relaxed text-sm-text-muted">
              {CLOSING}
            </p>

            <p className="mt-6 text-base leading-relaxed text-sm-text-muted">
              The next Conference is announced to fellows and on{' '}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="font-medium text-sm-terracotta underline underline-offset-4 transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta"
              >
                Instagram
              </a>
              .
            </p>

            {/* Button first, the two text links after it: stacked on small
                screens, one row from sm up. */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <ButtonLink href={COME_HREF}>Come to the Conference →</ButtonLink>
              <TextLink href={GROUP_HREF}>Bring your youth group or ministry team →</TextLink>
              <TextLink href={MENTOR_HREF}>Serve as a mentor or chaplain →</TextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
