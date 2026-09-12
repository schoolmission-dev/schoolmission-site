import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, Reveal, TextLink } from '@/components/site/Prose';
import TileGrid, { type Tile } from '@/components/site/TileGrid';

// "Partner Institutions" from docs/copy.md draft 6. All copy verbatim.
//
// The mono label carries the country tag where copy.md gives one, per the
// design note. Churches and missions has none, so it renders without.

const TITLE = 'Partner Institutions';
const PARTNERS_HREF = 'mailto:partners@schoolmission.org';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description: 'Four kinds of partner, one loop. SchoolMission connects hosts, schools, churches, and camps, and keeps the record.',
  openGraph: { title: `${TITLE} | SchoolMission` },
};

const INTRO =
  "SchoolMission doesn't run projects, teach classes, or employ students. Our partners do. We connect them and keep the record.";

const TILES: Tile[] = [
  {
    label: 'NGOs and community organizations',
    tag: 'Ghana',
    body: "Host projects and supervise fellows. If you already run community work in Ghana, you're already doing most of what a host does. You gain supervised hands during school breaks and a verified record of the work.",
  },
  {
    label: 'Senior high schools',
    tag: 'Ghana',
    body: 'Honor SchoolMission vouchers at the counter — tuition, meals, textbooks — and are reimbursed in full by mobile money. Any senior high school in Ghana can register.',
  },
  {
    label: 'Churches and missions',
    body: "Send missionaries and teams to development projects in Ghana, host fellows on those projects, and verify their work. For US congregations, this is also where the funding loop begins: your students' summer earnings support the ministry at home in Ghana.",
  },
  {
    label: 'Summer camps',
    tag: 'United States',
    body: "Employ SchoolMission staff for the summer season. A share of what those staff earn funds the credit pool, so camps become funding partners for education in Ghana through their staff's earnings, not their own budget.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader title={TITLE} sub="Four kinds of partner, one loop" />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>
      </Prose>

      <section className="bg-sm-cream pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <TileGrid tiles={TILES} />

          <Reveal className="mt-14">
            <TextLink href={PARTNERS_HREF}>Partner with SchoolMission →</TextLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
