import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  const items = products.slice(0, 3);

  return (
    <section id="nyheter" className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Nyheter</h2>
        <a href="#shop" className="text-sm text-white/70 hover:text-white">
          Visa alla
        </a>
      </div>

      {/* */}
      <div className="mt-5 -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 lg:gap-4 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="min-w-[220px] snap-start lg:min-w-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
