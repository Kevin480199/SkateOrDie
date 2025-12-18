import React from "react";

export default function ProductModalContent({ product }) {
  const title = product?.name ?? product?.title ?? "Produkt";
  const description = product?.description ?? "Ingen beskrivning ännu.";
  const image = product?.image;

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-950 text-slate-100">
      {image ? (
        <div className="bg-slate-950/40 p-4 sm:p-6">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain object-center p-4"
            />
          </div>
        </div>
      ) : (
        <div className="h-56 w-full bg-white/5" />
      )}

      <div className="space-y-4 p-5">
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-sm leading-relaxed text-white/75">{description}</p>

        <div className="pt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
          >
            Lägg i kundvagn
          </button>
        </div>
      </div>
    </div>
  );
}
