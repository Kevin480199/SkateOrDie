import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { loadDb } from "../services/dbStore";

const heroImageUrl = new URL(
  "../assets/heroimg.jpg",
  import.meta.url
).toString();

export default function Home({ onSelectProduct }) {
  const db = useMemo(() => loadDb(), []);

  // “Nyheter”:
  const latestProducts = useMemo(() => {
    const allowed = new Set([2, 5]);
    return [...(db.products ?? [])]
      .filter((p) => allowed.has(Number(p.categoryId)))
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
      .slice(0, 3);
  }, [db]);

  return (
    <>
      <section
        className="relative isolate min-h-[calc(100vh-56px)] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-slate-950/85" />

        <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col justify-end px-4 pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            SkateOrDie
          </h1>

          <p className="mt-3 max-w-xl text-lg text-white/90">
            Skate & streetwear. Nya drops och utvalda favoriter.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
            >
              Shoppa
            </Link>

            <a
              href="#nyheter"
              className="inline-flex items-center justify-center rounded-xl border border-white/90 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Se nyheter
            </a>
          </div>
        </div>
      </section>

      {/* NYHETER – samma “grid wrapper”-känsla som ProductsPage */}
      <section id="nyheter" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Nyheter</h2>
          <Link
            to="/products"
            className="text-sm text-white/70 hover:text-white"
          >
            Visa alla
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/15 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {latestProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                compact
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
