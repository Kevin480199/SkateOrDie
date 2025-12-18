import React from "react";

export default function ProductCard({ product, onSelect, compact = false }) {
  const title = product.title ?? product.name ?? "Produkt";
  const price = product.priceSek;
  const image = product.image;

  const pad = compact ? "p-2.5" : "p-3";
  const titleSize = compact ? "text-[12px]" : "text-sm";
  const priceSize = compact ? "text-[12px]" : "text-sm";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(product)}
      aria-label={`Öppna ${title}`}
      aria-haspopup="dialog"
      className={[
        "group w-full text-left",
        "overflow-hidden rounded-xl border border-white/10 bg-slate-900/25",
        "transition-colors duration-200",
        "hover:border-white/20 hover:bg-slate-900/35",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        "active:scale-[0.99] transition-transform",
      ].join(" ")}
    >
      {/* Bild: contain + lite padding => hela produkten syns */}
      <div className="relative aspect-[4/3] w-full bg-slate-950/30">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={[
              "h-full w-full",
              "object-contain object-center", // <- viktigast
              compact ? "p-2" : "p-3", // ger luft runt produkten
              "transition-transform duration-300",
              "group-hover:scale-[1.01]", // väldigt subtilt
            ].join(" ")}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/0" />
        )}

        {/* hint (ingen mörk “shadow”-overlay) */}
        <div
          className={[
            "pointer-events-none absolute left-2 bottom-2",
            "rounded-lg border border-white/10 bg-black/15 px-2 py-1",
            "text-[11px] font-medium text-white/85",
            "opacity-0 transition-opacity duration-200",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          ].join(" ")}
        >
          Visa detaljer
        </div>
      </div>

      {/* Text */}
      <div className={pad}>
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`${titleSize} font-semibold leading-snug text-white line-clamp-2`}
          >
            {title}
          </h3>

          {typeof price === "number" ? (
            <span
              className={`${priceSize} shrink-0 font-semibold text-white/75`}
            >
              {price} kr
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
