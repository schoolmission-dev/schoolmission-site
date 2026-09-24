import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';
import PageHeader from '@/components/site/PageHeader';
import Prose, { Block, P } from '@/components/site/Prose';

// "Privacy Policy" from docs/copy.md draft 15. All copy verbatim.
//
// copy.md opens the section with an italic note that it is a draft for legal
// review and that a lawyer should read it before it is relied on. That note is
// addressed to the author, not to the reader of the site, so it stays in the
// doc and off the page — as the build-plan bracket convention already does for
// anything unresolved.
//
// Each bold label in copy.md becomes a Block, whose label renders as the h2;
// the page's only h1 is the one PageHeader emits.

const TITLE = 'Privacy Policy';
const EFFECTIVE = 'Effective date: September 24, 2026';
const SUPPORT = 'support@schoolmission.org';

export const metadata: Metadata = {
  title: `${TITLE} | SchoolMission`,
  description:
    'How SchoolMission collects, uses, and protects your information: what we hold, who we share it with, how long we keep it, and your rights.',
  openGraph: { title: `${TITLE} | SchoolMission` },
  alternates: { canonical: canonical('/privacy') },
};

const WHO_WE_ARE =
  'SchoolMission is a 501(c)(3) tax-exempt public charity in the United States (EIN 42-3684753), licensed by the Department of Social Welfare in Ghana. We run schoolmission.org and the platform at app.schoolmission.org. Questions about this policy go to support@schoolmission.org.';

const COLLECT: [string, string][] = [
  [
    'Account information:',
    'your name, email address, and password (stored only in encrypted form), or the name and email Google shares if you sign in with Google. Schools and organisations also give a contact phone number and, for schools, a mobile-money number for reimbursements.',
  ],
  [
    'Applications:',
    'what you tell us when you apply to a cohort or to an opportunity — your school, your reasons for applying, your availability.',
  ],
  [
    'Service records:',
    'placements, supervisor verifications, Community Value Credits, vouchers issued and redeemed. These are the record of your service and they belong to you.',
  ],
  [
    'Payment records (schools only):',
    'the mobile-money number a school registers, the name the payment provider reports as that number’s holder, and every reimbursement attempt. We never collect card numbers or bank passwords.',
  ],
  [
    'Technical information:',
    'the pages you visit on our sites, your device and browser type, and your IP address, used to keep the service secure and working.',
  ],
];

const WHY =
  'To run the platform: place fellows, verify their work, issue vouchers, reimburse schools, and keep an accurate record of every credit from the hour it was earned to the day it was spent. To communicate with you about your account, applications, and vouchers. To keep fellows safe and the platform honest. To meet our legal and financial-reporting obligations as a charity.';

const FELLOWS =
  'Fellows in Ghana join SchoolMission through a partner school, which confirms that a student may take part in the program. Many fellows are between fifteen and nineteen. We collect only what the platform needs, we never sell or advertise with anyone’s information, and we do not publish a fellow’s name or photo on our website. A partner school, or a fellow’s parent or guardian, may contact support@schoolmission.org to see, correct, or delete a fellow’s information.';

const SHARE: [string, string][] = [
  [
    'Service providers that run the platform for us:',
    'Supabase (database and sign-in), Vercel (hosting), Resend (email), Google (sign-in with Google, if you choose it), Hubtel (mobile-money reimbursements to schools in Ghana), and Amazon Web Services (a secure relay for payment requests). Each processes information only to provide its service to us.',
  ],
  [
    'Partner organisations, as the loop requires:',
    'a supervisor sees the fellows placed with them and their work; a school sees the vouchers presented to it and its own reimbursements; an admissions reviewer sees your application. No partner sees more than its role needs.',
  ],
  ['When the law requires it,', 'or to protect the safety of a fellow.'],
];

const SHARE_CLOSING =
  'We do not sell information, and we do not share it with advertisers.';

const STORED =
  'Our database is hosted in the United Kingdom, our website in the United States, and reimbursements are processed in Ghana. Information therefore moves between Ghana, the United States, and Europe. We use providers that protect it in transit and at rest.';

const RETENTION =
  'Account and application information while your account is active and for 12 months after. Records of credits, vouchers, and reimbursements are financial records of a charity and are kept for 7 years as the law requires, even after an account is closed.';

const RIGHTS =
  'You can ask to see the information we hold about you, correct it, or delete it, and you can close your account at any time, subject to the financial records we must keep. If you’re in Ghana, you have these rights under the Data Protection Act, 2012 (Act 843). Write to support@schoolmission.org; we answer within 30 days.';

const SECURITY =
  'Information is encrypted in transit; access inside the platform is limited by role; administrators must use two-factor authentication; and every reimbursement is recorded, attributable, and cannot be altered after the fact.';

const COOKIES =
  'We use only the cookies needed to keep you signed in. No advertising or tracking cookies.';

const CHANGES =
  'If this policy changes in a way that matters, we’ll say so on this page and, for account holders, by email.';

/** copy.md's bullets: an italic lead-in, then the rest of the sentence. */
function LabelledList({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-4">
      {items.map(([label, body]) => (
        <li key={label} className="text-base leading-relaxed text-sm-text-muted sm:text-lg">
          <em className="not-italic font-medium text-sm-coffee">{label}</em> {body}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title={TITLE}
        sub="How SchoolMission collects, uses, and protects your information"
        meta={EFFECTIVE}
      />

      <Prose>
        <Block label="Who we are">
          <P>{WHO_WE_ARE}</P>
        </Block>

        <Block label="What we collect">
          <LabelledList items={COLLECT} />
        </Block>

        <Block label="Why we collect it">
          <P>{WHY}</P>
        </Block>

        <Block label="Fellows and their schools">
          <P>{FELLOWS}</P>
        </Block>

        <Block label="Who we share it with">
          <LabelledList items={SHARE} />
          <P>{SHARE_CLOSING}</P>
        </Block>

        <Block label="Where it's stored">
          <P>{STORED}</P>
        </Block>

        <Block label="How long we keep it">
          <P>{RETENTION}</P>
        </Block>

        <Block label="Your rights">
          <P>{RIGHTS}</P>
        </Block>

        <Block label="Security">
          <P>{SECURITY}</P>
        </Block>

        <Block label="Cookies">
          <P>{COOKIES}</P>
        </Block>

        <Block label="Changes">
          <P>{CHANGES}</P>
        </Block>

        <Block>
          <P>
            Questions about this policy:{' '}
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
