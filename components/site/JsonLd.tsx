// Stamps a JSON-LD graph into the page.
//
// A plain <script type="application/ld+json"> in the server-rendered markup:
// no next/script, so it is in the HTML crawlers receive rather than injected
// later, and it costs nothing at runtime.
//
// JSON.stringify output is escaped for the one sequence that could close the
// script element early. The data is authored in lib/seo.ts and never contains
// user input, so this is belt and braces rather than a live risk.

export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
