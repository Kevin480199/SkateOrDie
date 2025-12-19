import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], onSelectProduct }) {
  const items = products.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section id="nyheter" className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Nyheter</h2>
        <Link to="/products" className="text-sm text-white/70 hover:text-white">
          Visa alla
        </Link>
      </div>

      <div className="mt-5 -mx-4 px-4">
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-px-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0">
          {items.map((p) => (
            <div key={p.id} className="min-w-[220px] snap-start lg:min-w-0">
              <ProductCard product={p} onSelect={onSelectProduct} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
