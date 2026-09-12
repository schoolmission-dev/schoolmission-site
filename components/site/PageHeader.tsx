// Coffee band at the top of every prose page: heading plus a mono sub.

export default function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="bg-sm-coffee text-sm-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h1 className="max-w-[22ch] text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-5 max-w-[60ch] font-mono text-sm leading-relaxed text-sm-cream/70 sm:text-base">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
