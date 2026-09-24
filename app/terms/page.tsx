import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, P, TextLink } from '@/components/site/Prose';

// "Terms of Service" from docs/copy.md draft 15. All copy verbatim.
//
// As on /privacy, copy.md's "Draft for legal review" note is a message to the
// author rather than to the reader, so it stays in the doc.
//
// Each bold label in copy.md becomes a Block, whose label renders as the h2.

const TITLE = 'Terms of Service';
const EFFECTIVE = 'Effective date: September 24, 2026';
const SUPPORT = 'support@schoolmission.org';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description:
    'The agreement between you and SchoolMission: who can use the platform, what Community Value Credits are, and what fellows, schools, and hosts agree to.',
  openGraph: { title: `${TITLE} | SchoolMission` },
  alternates: { canonical: canonical('/terms') },
};

const SECTIONS: { label: string; body: string }[] = [
  {
    label: 'Who can use the platform',
    body: 'Students in Ghana take part through a partner school, which confirms that a student may join a cohort. Summer positions in the United States are open to college students. Missions, NGOs, schools, and other organisations join by invitation. You agree to give accurate information and to keep your sign-in details to yourself.',
  },
  {
    label: 'What Community Value Credits are — and aren’t',
    body: 'Credits are assigned by the supervising organisation for verified community service. They are not money, cannot be transferred, and have no cash value. They convert only into vouchers redeemable at a partner school for tuition, meals, books, or the other school costs the voucher names. No cash is ever paid to a fellow. SchoolMission may correct a credit or voucher issued in error and will tell you when it does.',
  },
  {
    label: 'Placements and admission',
    body: 'Applying does not guarantee a placement, and applying to a cohort does not guarantee admission. Placements depend on partner organisations’ needs and on cohort size.',
  },
  {
    label: 'For fellows',
    body: 'Serve honestly, follow your supervisor’s instructions on safety, and report anything that makes you feel unsafe to your supervisor or to support@schoolmission.org. Present a voucher only for yourself and only at the school named on it.',
  },
  {
    label: 'For schools',
    body: 'A school agrees to honour vouchers presented to it and to deliver the service the voucher names. SchoolMission reimburses the voucher’s value by mobile money to the number the school has registered. The school is responsible for the accuracy of that number; a reimbursement sent to the registered number is a completed reimbursement. Changes to the number take effect after SchoolMission confirms the new holder.',
  },
  {
    label: 'For missions, NGOs, and other host organisations',
    body: 'A host agrees to supervise fellows responsibly, to verify only work that was actually done, and to assign credits fairly. Hosts are responsible for the safety of fellows while on placement.',
  },
  {
    label: 'Careers (United States)',
    body: 'Summer positions at partner camps and churches are employment with the host, not with SchoolMission, and are governed by the host’s terms and by the separate contribution agreement you sign when you accept a placement.',
  },
  {
    label: 'Acceptable use',
    body: 'Don’t misuse the platform: no false information, no attempt to access others’ accounts or data, no interference with the service, and no use that could harm a fellow.',
  },
  {
    label: 'Suspension and termination',
    body: 'We may suspend or close an account that breaks these terms or puts a fellow at risk. You may close your account at any time by writing to support@schoolmission.org; the records described in our Privacy Policy are kept as the law requires.',
  },
  {
    label: 'Our responsibility',
    body: 'SchoolMission provides the platform as it is. To the extent the law allows, we are not liable for indirect losses, for the acts of partner organisations, or for a school’s failure to honour a voucher — though we will work with you to put things right.',
  },
  {
    label: 'Governing law',
    body: 'These terms are governed by the laws of the Commonwealth of Massachusetts, United States. If you are in Ghana, nothing in these terms removes the protections you have under the laws of Ghana, including the Data Protection Act, 2012 (Act 843).',
  },
  {
    label: 'Changes and contact',
    body: 'We may update these terms; the effective date above will change when we do. Questions: support@schoolmission.org.',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title={TITLE}
        sub="The agreement between you and SchoolMission when you use the platform"
        meta={EFFECTIVE}
      />

      <Prose>
        {SECTIONS.map((section) => (
          <Block key={section.label} label={section.label}>
            <P>{section.body}</P>
          </Block>
        ))}

        <Block>
          <P>
            The Privacy Policy referred to above sets out what we hold and how long
            we keep it.
          </P>
          <TextLink href="/privacy">Read the Privacy Policy →</TextLink>
        </Block>

        <Block>
          <P>
            Questions about these terms:{' '}
            <a
              href={`mailto:${SUPPORT}`}
              className="font-medium text-sm-terracotta-text underline underline-offset-4 transition-colors hover:text-sm-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sm-terracotta-text"
            >
              {SUPPORT}
            </a>
            .
          </P>
        </Block>
      </Prose>
    </>
  );
}
