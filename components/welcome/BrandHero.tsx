export function BrandHero() {
  return (
    <section aria-labelledby="app-title" className="text-center">
      <div className="relative mx-auto grid size-28 place-items-center sm:size-32">
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-full bg-brand-lime/20 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="relative -rotate-6 text-7xl drop-shadow-[0_0_24px_rgb(204_255_0/0.35)] sm:text-8xl"
        >
          🤙
        </span>
      </div>

      <p className="mt-4 font-mono text-xs font-bold tracking-[0.28em] text-brand-cyan uppercase">
        Rally. Rotate. Repeat.
      </p>
      <h1
        id="app-title"
        className="mx-auto mt-4 max-w-md text-5xl leading-[0.88] font-black tracking-[-0.065em] text-balance sm:text-6xl"
      >
        Pickleball <span className="text-brand-lime">Cuzzies</span>
      </h1>
      <p className="mx-auto mt-6 max-w-sm text-base leading-7 text-slate-300">
        Fair games, live scores, and a bench that never forgets whose turn is
        next.
      </p>
    </section>
  );
}
