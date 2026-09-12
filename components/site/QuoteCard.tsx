import { Reveal } from './Prose';

// Coffee card on cream: the quote set large and light in cream, a mono
// attribution beneath it, and one terracotta ring sitting behind the top-left
// corner. No quotation marks are drawn — the card itself does that work, and
// the copy carries none.

export default function QuoteCard({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <Reveal>
      <figure className="relative">
        {/* Rendered before the card and left unpositioned in the stack, so the
            card paints over it and only the corner of the ring shows. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 rounded-full border-2 border-sm-terracotta/30 sm:-left-6 sm:-top-6 sm:h-28 sm:w-28"
        />
        <blockquote className="relative rounded-xl bg-sm-coffee px-8 py-10 sm:px-10 sm:py-12">
          <p className="text-2xl font-light leading-relaxed text-sm-cream sm:text-3xl">
            {quote}
          </p>
          <figcaption className="mt-6 font-mono text-xs text-sm-cream/70">
            {attribution}
          </figcaption>
        </blockquote>
      </figure>
    </Reveal>
  );
}
