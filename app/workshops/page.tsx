import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, Lead, P, TextLink } from '@/components/site/Prose';

// "Workshops" from docs/copy.md. All copy verbatim.

export const metadata: Metadata = {
  title: 'Workshops | SchoolMission',
  description:
    'The whole model in seventy-five minutes: students, teachers, and missionaries run the loop as a workshop.',
};

const BOOK_HREF = 'mailto:workshops@schoolmission.org?subject=Workshop%20request';

const INTRO =
  "Before a single student is placed, we run the loop as a workshop. Students, teachers, and missionaries each play the role they'd hold in the real system, and in an hour and a quarter everyone in the room has seen service turn into education.";

const HAPPENS = [
  {
    label: 'Problems, not tasks',
    body: "Students are split into groups and given a real community challenge — post-harvest loss, unsafe water access, young people with no work experience. They plan how they'd address it.",
  },
  {
    label: 'Work, then verification',
    body: 'Groups complete structured tasks and submit them not to their teachers but to a missionary, who reviews the work and assigns Community Value Credits for effort, collaboration, and quality — exactly as a supervisor would on a real placement.',
  },
  {
    label: 'Credits become vouchers become lunch',
    body: "A facilitator converts each group's credits into vouchers — meal, tuition, textbooks, transport. Students take them to their teachers, who deliver the service. A meal voucher opens the dining hall. A tuition voucher comes off the fees. The loop closes in the room.",
  },
  {
    label: 'Then we talk about it',
    body: "The last part is reflection: what felt fair, what didn't, where the confusion was. That's the data we came for.",
  },
];

const AUDIENCE = [
  {
    strong: 'Schools and missions in Ghana',
    rest: ' considering partnership. A workshop is the fastest way to find out whether your teachers and supervisors want to be part of the loop.',
  },
  {
    strong: 'Camps and churches in the United States.',
    rest: " Run one with your youth group or summer staff and they'll understand, in an afternoon, what their summer earnings fund.",
  },
];

const SIZE =
  'A workshop runs with fifteen to twenty students, two or three teachers, and one or two missionaries or supervisors. We bring the materials.';

export default function WorkshopsPage() {
  return (
    <>
      <PageHeader title="Workshops" sub="The whole model in seventy-five minutes" />

      <Prose>
        <Block>
          <Lead>{INTRO}</Lead>
        </Block>

        <Block label="What happens">
          <div className="space-y-8">
            {HAPPENS.map((item) => (
              <div key={item.label}>
                <h3 className="text-lg font-semibold text-sm-coffee">{item.label}</h3>
                <p className="mt-2 text-base leading-relaxed text-sm-text-muted sm:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Who it's for">
          {AUDIENCE.map((item) => (
            <p
              key={item.strong}
              className="text-base leading-relaxed text-sm-text-muted sm:text-lg"
            >
              <strong className="font-semibold text-sm-coffee">{item.strong}</strong>
              {item.rest}
            </p>
          ))}
          <P>{SIZE}</P>
          <TextLink href={BOOK_HREF}>Book a workshop →</TextLink>
        </Block>
      </Prose>
    </>
  );
}
