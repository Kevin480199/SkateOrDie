import React from "react";

export default function ProductCard({ product }) {
  return (
    <article className="rounded-xl border border-white/10 bg-slate-900/35 p-3 hover:border-white/20">
      {/* Fyrkantig bildyta */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-white/5">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-white">
          {product.title}
        </h3>
        <span className="shrink-0 text-sm font-semibold text-white/90">
          {product.priceSek} kr
        </span>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-200"
      >
        Lägg i varukorg
      </button>
    </article>
  );
}
