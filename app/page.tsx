import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';
import Hero from '@/components/marketing/Hero';
import Purpose from '@/components/marketing/Purpose';
import Loop from '@/components/marketing/Loop';
import TwoLoops from '@/components/marketing/TwoLoops';
import Measure from '@/components/marketing/Measure';
import Platform from '@/components/marketing/Platform';

// The home page had no metadata of its own and fell back to the layout's, which
// meant a search result reading "SchoolMission — Community service that pays for
// school." The tagline is the right h1 and the wrong snippet: it never says who
// this is for or where it runs. Both are spelled out here; the layout's short
// pair stays as the fallback for any route that declares none of its own.

const TITLE = 'SchoolMission | Community service that pays for school';
const DESCRIPTION =
  'Senior high students in Ghana serve on supervised community projects during school breaks, earn verified credits, and redeem them at their own schools.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Restated for openGraph: every other route sets openGraph.title, which makes
  // Next fill og:description from its own description. Home set neither, so it
  // inherited the layout's slogan pair and shared as "SchoolMission".
  openGraph: { title: TITLE, description: DESCRIPTION },
  alternates: { canonical: canonical() },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Purpose />
      <Loop />
      <TwoLoops />
      <Measure />
      <Platform />
    </>
  );
}
