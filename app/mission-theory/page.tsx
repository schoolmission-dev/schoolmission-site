import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, P, Reveal } from '@/components/site/Prose';

// "Our Mission Theory" from docs/copy.md. All copy verbatim.

export const metadata: Metadata = {
  title: 'Our Mission Theory | SchoolMission',
  description: 'Why we built a loop instead of a program: the principles behind SchoolMission.',
};

const INTRO =
  'SchoolMission grew out of a question about mission and development work: why do so many well-meaning projects leave communities more dependent than they found them? Our answer is a set of principles we hold ourselves to. They come from asset-based community development, from the practitioners who have written most honestly about where charity fails, and from what students, teachers, and missionaries in Ghana told us when we tested the idea with them.';

const PRINCIPLES = [
  {
    label: 'Earned, not given',
    body: "A student who earns a voucher through verified work is not a recipient of aid. They are a worker being paid in the one currency that can't be taken from them. We don't hand out school fees. We build the system in which a student can earn them.",
  },
  {
    label: 'Verified by the people closest to the work',
    body: 'Credits are assigned by the supervisor who watched the work happen — a missionary, a project lead, a community organizer — never by us, never by the school, never automatically. Authority sits where the knowledge is.',
  },
  {
    label: 'Value that can only become education',
    body: "No cash passes to a student. Credits become one-time vouchers, and vouchers become tuition, meals, and books at the student's own school. The value is real, and it can't be diverted — not by an employer, not by a family member, not by the student.",
  },
  {
    label: 'Every credit accountable',
    body: "Credit records can't be edited or deleted. A donor can trace a dollar from the summer job where it was earned to the school where it was spent. Transparency isn't a report we publish; it's how the system is built.",
  },
  {
    label: 'Built on what communities already have',
    body: "Churches and missions in Ghana already run community projects. Schools already deliver meals and lessons. Students already spend their breaks looking for work. We didn't create any of these — we connected them. The problem was never a lack of work or a lack of need. It was the absence of a safe, structured way to join the two.",
  },
  {
    label: 'Local leadership, not local dependence',
    body: 'The loop is run by Ghanaian supervisors, Ghanaian schools, and Ghanaian students. Funding from the United States enters the credit pool and leaves it as vouchers at Ghanaian schools. It never becomes a project that stops when the funding does.',
  },
  {
    label: 'Two loops, one system',
    body: 'The service loop in Ghana turns work into education. The funding loop in the United States turns summer jobs into the credit pool — and gives American students their own reason to serve. Neither loop is charity to the other.',
  },
];

const READING = [
  { title: 'When Helping Hurts', authors: '(Corbett and Fikkert)' },
  { title: 'Toxic Charity', authors: '(Lupton)' },
  { title: 'Building Communities from the Inside Out', authors: '(Kretzmann and McKnight)' },
  { title: 'Walking with the Poor', authors: '(Myers)' },
  { title: 'Development as Freedom', authors: '(Sen)' },
];

export default function MissionTheoryPage() {
  return (
    <>
      <PageHeader
        title="Our Mission Theory"
        sub="Why we built a loop instead of a program"
      />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>

        {PRINCIPLES.map((principle) => (
          <Block key={principle.label} label={principle.label}>
            <P>{principle.body}</P>
          </Block>
        ))}

        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-sm-terracotta">
            Reading that shaped us
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-sm-text-muted">
            {READING.map((book, i) => (
              <span key={book.title}>
                {i > 0 && ' · '}
                <em>{book.title}</em> {book.authors}
              </span>
            ))}
          </p>
        </Reveal>
      </Prose>
    </>
  );
}
