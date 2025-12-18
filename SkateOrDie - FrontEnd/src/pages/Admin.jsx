import React, { useMemo, useState } from "react";
import { loadDb, saveDb, resetDb, nextCategoryId, nextProductId } from "../services/dbStore";

export default function Admin() {
  const initial = useMemo(() => loadDb(), []);
  const [db, setDb] = useState(initial);

  const parentCategories = useMemo(
    () => db.categories.filter((c) => c.parentId === null),
    [db.categories]
  );

  const leafCategories = useMemo(
    () => db.categories.filter((c) => c.parentId !== null),
    [db.categories]
  );

  // ----- Add Category -----
  const [catName, setCatName] = useState("");
  const [catParentId, setCatParentId] = useState(""); // "" => null

  function addCategory(e) {
    e.preventDefault();
    const name = catName.trim();
    if (!name) return;

    const parentId = catParentId === "" ? null : Number(catParentId);

    const exists = db.categories.some(
      (c) => c.parentId === parentId && c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) return;

    const newCategory = { id: nextCategoryId(), name, parentId };
    const next = { ...db, categories: [newCategory, ...db.categories] };
    setDb(next);
    saveDb(next);

    setCatName("");
    setCatParentId("");
  }

  // ----- Add Product -----
  const [prod, setProd] = useState({
    categoryId: leafCategories[0]?.id ?? "",
    name: "",
    description: "",
    image: ""
  });

  function setProdField(field, value) {
    setProd((p) => ({ ...p, [field]: value }));
  }

  async function onImageFile(file) {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setProdField("image", base64);
  }

  function addProduct(e) {
    e.preventDefault();
    const categoryId = Number(prod.categoryId);
    const name = prod.name.trim();
    const description = prod.description.trim();
    const image = prod.image.trim();

    if (!categoryId || !name || !description || !image) return;

    const newProduct = { id: nextProductId(), categoryId, name, description, image };
    const next = { ...db, products: [newProduct, ...db.products] };
    setDb(next);
    saveDb(next);

    setProd({
      categoryId: leafCategories[0]?.id ?? "",
      name: "",
      description: "",
      image: ""
    });
  }

  function handleReset() {
    const next = resetDb();
    setDb(next);
    const firstLeaf = next.categories.find((c) => c.parentId !== null)?.id ?? "";
    setProd((p) => ({ ...p, categoryId: firstLeaf }));
  }

  const productsByCategory = useMemo(() => {
    const map = new Map();
    for (const c of db.categories) map.set(c.id, []);
    for (const p of db.products) {
      if (!map.has(p.categoryId)) map.set(p.categoryId, []);
      map.get(p.categoryId).push(p);
    }
    return map;
  }, [db]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
            <p className="mt-1 text-sm text-slate-300">
              All data sparas i <span className="font-semibold text-slate-200">localStorage</span>. Refresh behåller data.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Återställ till seed
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Categories card */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Skapa kategori</h2>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {db.categories.length} st
              </span>
            </div>

            <form onSubmit={addCategory} className="mt-4 grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Kategorinamn</label>
                <input
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Ex: Kepsar"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Parent</label>
                <select
                  value={catParentId}
                  onChange={(e) => setCatParentId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">(Ingen parent) → huvudkategori</option>
                  {parentCategories.map((p) => (
                    <option key={p.id} value={p.id}>
                      Parent: {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white active:scale-[0.98]"
              >
                Lägg till kategori
              </button>
            </form>

            {/* Category list */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-200">Kategorier</h3>
              <div className="mt-3 max-h-72 overflow-auto rounded-xl border border-slate-800">
                <ul className="divide-y divide-slate-800">
                  {db.categories.map((c) => (
                    <li key={c.id} className="flex items-start justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{c.parentId ? "↳" : "•"}</span>
                          <span className="truncate font-semibold text-slate-100">{c.name}</span>
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          id: <span className="text-slate-300">{c.id}</span> · parent:{" "}
                          <span className="text-slate-300">{c.parentId ?? "null"}</span>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
                        {c.parentId ? "Underkategori" : "Huvudkategori"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Products card */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Lägg till produkt</h2>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {db.products.length} st
              </span>
            </div>

            <form onSubmit={addProduct} className="mt-4 grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Underkategori</label>
                <select
                  value={prod.categoryId}
                  onChange={(e) => setProdField("categoryId", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                >
                  {leafCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (id: {c.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Namn</label>
                <input
                  value={prod.name}
                  onChange={(e) => setProdField("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Beskrivning</label>
                <textarea
                  rows={4}
                  value={prod.description}
                  onChange={(e) => setProdField("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">Bild (URL)</label>
                  <input
                    value={prod.image.startsWith("data:") ? "" : prod.image}
                    onChange={(e) => setProdField("image", e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    …eller ladda upp bild
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onImageFile(e.target.files?.[0])}
                    className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950/60 text-sm text-slate-300 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-200 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-white"
                  />
                </div>
              </div>

              {/* Preview */}
              {prod.image && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                  <div className="text-xs font-semibold text-slate-300">Förhandsvisning</div>
                  <img
                    src={prod.image}
                    alt="preview"
                    className="mt-2 h-44 w-full rounded-xl object-cover ring-1 ring-slate-800"
                  />
                </div>
              )}

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-emerald-300 active:scale-[0.98]"
              >
                Spara produkt
              </button>

              <p className="text-xs text-slate-400">
                Tips: Om du laddar upp fil sparas bilden som <span className="text-slate-300">base64</span> i localStorage.
              </p>
            </form>
          </section>
        </div>

        {/* Products by leaf category */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Produkter per underkategori</h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {leafCategories.length} underkategorier
            </span>
          </div>

          <div className="mt-5 space-y-6">
            {leafCategories.map((c) => {
              const list = productsByCategory.get(c.id) ?? [];
              return (
                <div key={c.id}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <h3 className="text-base font-semibold text-slate-100">{c.name}</h3>
                    <div className="text-xs text-slate-400">
                      categoryId: <span className="text-slate-300">{c.id}</span> · antal:{" "}
                      <span className="text-slate-300">{list.length}</span>
                    </div>
                  </div>

                  {list.length === 0 ? (
                    <div className="mt-3 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-4 py-6 text-sm text-slate-400">
                      Inga produkter.
                    </div>
                  ) : (
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {list.map((p) => (
                        <div
                          key={p.id}
                          className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950/60"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                          </div>

                          <div className="p-4">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="truncate text-sm font-semibold text-slate-100">{p.name}</h4>
                              <span className="shrink-0 rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                                id: {p.id}
                              </span>
                            </div>
                            <p className="mt-2 line-clamp-3 text-sm text-slate-300">{p.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-6 text-xs text-slate-500">
          <p>
            Obs: localStorage är per dator/webbläsare. Seed-data kommer från <span className="text-slate-300">database.json</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
