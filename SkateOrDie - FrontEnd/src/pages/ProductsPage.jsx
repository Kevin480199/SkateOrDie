import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { loadDb } from "../services/dbStore";

const QUICK_FILTERS = ["Tröjor", "Byxor", "Brädor", "Hjul"];

const pill = (active) =>
  [
    "rounded-xl px-3 py-2 text-xs font-semibold border transition",
    active
      ? "bg-white text-slate-900 border-transparent"
      : "bg-slate-900/40 text-white/80 border-white/10 hover:border-white/20",
  ].join(" ");

export default function ProductsPage({ onSelectProduct }) {
  const [db, setDb] = useState(() => loadDb());
  const { categories, products } = db;

  useEffect(() => {
    setDb(loadDb());
    }, []);

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const categoryIdByName = useMemo(() => {
    const map = new Map();
    for (const c of categories) map.set(c.name, String(c.id));
    return map;
  }, [categories]);

  const leafCategories = useMemo(() => {
    const hasChildren = new Set(
      categories.map((c) => c.parentId).filter(Boolean)
    );
    return categories.filter(
      (c) => !hasChildren.has(c.id) && c.parentId !== null
    );
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      if (categoryId !== "all" && String(p.categoryId) !== categoryId)
        return false;
      if (!q) return true;

      const name = (p.name ?? "").toLowerCase();
      const desc = (p.description ?? "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [products, categoryId, query]);

  const isDirty = query.trim().length > 0 || categoryId !== "all";
  const reset = () => {
    setQuery("");
    setCategoryId("all");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-white">Alla produkter</h1>
        <p className="mt-1 text-sm text-white/70">
          Sök och filtrera mellan kategorier.
        </p>
      </header>

      {/* Filterpanel */}
      <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-white/10 bg-slate-900/20 p-3 sm:p-4">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={pill(categoryId === "all")}
          >
            Alla
          </button>

          {QUICK_FILTERS.map((name) => {
            const id = categoryIdByName.get(name);
            const active = id && categoryId === id;

            return (
              <button
                key={name}
                type="button"
                onClick={() => id && setCategoryId(id)}
                className={pill(Boolean(active))}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Sök + dropdown + actions */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {/* Sök */}
          <div className="flex w-full sm:w-[280px] items-center rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2 focus-within:ring-2 focus-within:ring-white/20">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök…"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          {/* Alla kategorier */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full sm:w-64 rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="all">Alla kategorier</option>
            {leafCategories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Count + rensa */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/20 px-3 py-2">
            <div className="text-sm text-white/70">
              Visar <span className="text-white">{filtered.length}</span>
            </div>

            {isDirty ? (
              <button
                type="button"
                onClick={reset}
                className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-900 hover:bg-slate-200"
              >
                Rensa
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-white/10 bg-slate-900/15 p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filtered.map((p) => (
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
  );
}
