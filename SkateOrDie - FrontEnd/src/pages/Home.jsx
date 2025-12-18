import React from "react";

// Bild-URL (Parcel)
const heroImageUrl = new URL(
  "../assets/heroimg.jpg",
  import.meta.url
).toString();

export default function Home() {
  return (
    <section
      className="relative isolate min-h-[calc(100vh-56px)] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      {/* */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-slate-950/85" />

      {/* CTA */}
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col justify-end px-4 pb-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          SkateOrDie
        </h1>

        <p className="mt-3 max-w-xl text-lg text-white/90">
          Skate & streetwear. Nya drops och utvalda favoriter.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#shop"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
          >
            Shoppa
          </a>

          <a
            href="#nyheter"
            className="inline-flex items-center justify-center rounded-xl border border-white/90 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Se nyheter
          </a>
        </div>
      </div>
    </section>
  );
}
