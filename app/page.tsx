import { AppShell } from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <section
        aria-labelledby="app-title"
        className="relative overflow-hidden rounded-4xl border border-white/10 bg-app-surface/70 p-6 shadow-surface backdrop-blur-xl sm:p-8"
      >
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 size-48 rounded-full bg-brand-lime/10 blur-3xl"
        />

        <div className="relative">
          <p className="font-mono text-xs font-bold tracking-[0.22em] text-brand-cyan uppercase">
            Court ready
          </p>
          <h1
            id="app-title"
            className="mt-4 max-w-sm text-4xl leading-[0.95] font-black tracking-[-0.05em] text-balance sm:text-5xl"
          >
            Pickleball <span className="text-brand-lime">Cuzzies</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
            Fair games. Fast rotations. Zero sideline math.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
