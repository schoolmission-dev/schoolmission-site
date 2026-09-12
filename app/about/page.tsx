import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, P, TextLink } from '@/components/site/Prose';
import QuoteCard from '@/components/site/QuoteCard';

// "About Us" from docs/copy.md. The three opening paragraphs, the registration
// sentence and Contact, all verbatim.
//
// copy.md's "How it started" and "Who we are" blocks are bracketed
// placeholders waiting on Emmanuel's own words, so neither is rendered. The
// live site carries no placeholder text.

export const metadata: Metadata = {
  title: 'About Us | SchoolMission',
  description:
    'SchoolMission connects supervised community work in Ghana to the school fees students need to return to class.',
  openGraph: { title: 'About Us | SchoolMission' },
};

const CONTACT_HREF = 'mailto:support@schoolmission.org';

const OPENING = [
  'Every school break, students across Ghana go looking for money so they can return to class. Without safe, structured options, many end up in unsafe labor, transactional relationships, or work that is never recognized and leaves no record behind. Some never make it back to school.',
  'At the same time, churches, missions, and community organizations run projects that need hands — water points, gardens, literacy programs, health outreach. The work exists. The need exists. What had been missing was a safe, structured way to connect the two, and to make sure the value a student creates comes back to them as education.',
  'SchoolMission is that system. Students serve on supervised community projects during school breaks, earn verified credits, and redeem them at their own schools. In the United States, students work paid summers at partner camps and churches and fund the credit pool with a share of what they earn. Neither side is charity to the other.',
];

// copy.md marks this quote "Draft — these are your words to edit." That note is
// editorial, addressed to Emmanuel, so it is not rendered.
const QUOTE =
  "Youth ministry was never about keeping young people busy until they grow up. It's about trusting them with real work in their own community, and letting them see what their hands can build.";
const QUOTE_BY = '— Emmanuel Segbedzi, Founder';

const REGISTRATION =
  'SchoolMission is a registered non-profit in the United States and Ghana.';

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About SchoolMission" />

      <Prose>
        <Block>
          <Lead>{OPENING[0]}</Lead>
        </Block>

        {OPENING.slice(1).map((paragraph) => (
          <Block key={paragraph.slice(0, 24)}>
            <P>{paragraph}</P>
          </Block>
        ))}

        <QuoteCard quote={QUOTE} attribution={QUOTE_BY} />

        <Block>
          <P>{REGISTRATION}</P>
        </Block>

        <Block label="Contact">
          <TextLink href={CONTACT_HREF}>support@schoolmission.org</TextLink>
        </Block>
      </Prose>
    </>
  );
}
