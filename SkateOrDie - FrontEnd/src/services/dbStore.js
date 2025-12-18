import seed from "../data/database.json";

const DB_KEY = "skateordie_db_v1";
const COUNTERS_KEY = "skateordie_counters_v1";

export function loadDb() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);

  localStorage.setItem(DB_KEY, JSON.stringify(seed));

  const maxCatId = Math.max(...seed.categories.map((c) => c.id), 0);
  const maxProdId = Math.max(...seed.products.map((p) => p.id), 0);

  localStorage.setItem(
    COUNTERS_KEY,
    JSON.stringify({
      nextCategoryId: maxCatId + 1,
      nextProductId: maxProdId + 1
    })
  );

  return seed;
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDb() {
  localStorage.setItem(DB_KEY, JSON.stringify(seed));

  const maxCatId = Math.max(...seed.categories.map((c) => c.id), 0);
  const maxProdId = Math.max(...seed.products.map((p) => p.id), 0);

  localStorage.setItem(
    COUNTERS_KEY,
    JSON.stringify({
      nextCategoryId: maxCatId + 1,
      nextProductId: maxProdId + 1
    })
  );

  return seed;
}

function loadCounters() {
  const raw = localStorage.getItem(COUNTERS_KEY);
  return raw ? JSON.parse(raw) : { nextCategoryId: 1, nextProductId: 1 };
}

function saveCounters(c) {
  localStorage.setItem(COUNTERS_KEY, JSON.stringify(c));
}

export function nextCategoryId() {
  const c = loadCounters();
  const id = c.nextCategoryId;
  c.nextCategoryId += 1;
  saveCounters(c);
  return id;
}

export function nextProductId() {
  const c = loadCounters();
  const id = c.nextProductId;
  c.nextProductId += 1;
  saveCounters(c);
  return id;
}
