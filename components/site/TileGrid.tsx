import { Reveal } from './Prose';

// Shared tile grid for the descriptive pages. Same treatment as the app's role
// tiles: white card, hairline border, rounded-xl, p-7, with a mono label over a
// paragraph. Two columns from md up, one below.
//
// Not a client component itself — Reveal is, and a server component may render
// it, which keeps the tile markup off the client bundle.

export type Tile = {
  label: string;
  /** Rendered after the label in mono, e.g. the country tag on /partners. */
  tag?: string;
  body: string;
};

export default function TileGrid({
  tiles,
  ring = false,
}: {
  tiles: Tile[];
  /** Adds the small terracotta ring in the tile corner — the site motif. */
  ring?: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {tiles.map((tile) => (
        <li key={tile.label}>
          <Reveal className="h-full">
            <div className="relative h-full rounded-xl border border-sm-border bg-sm-white p-7">
              {ring && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-5 h-8 w-8 rounded-full border-2 border-sm-terracotta/30"
                />
              )}
              <p
                className={`font-mono text-xs uppercase tracking-widest text-sm-terracotta ${
                  ring ? 'pr-12' : ''
                }`}
              >
                {tile.label}
                {tile.tag && <span className="text-sm-text-muted"> — {tile.tag}</span>}
              </p>
              <p className="mt-4 text-base leading-relaxed text-sm-text-muted">
                {tile.body}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
