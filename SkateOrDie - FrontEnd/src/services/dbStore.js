// src/services/dbStore.js
import seed from "../data/database.json";

const DB_KEY = "skateordie_db_v1";
const COUNTERS_KEY = "skateordie_counters_v1";
const VERSION_KEY = "skateordie_db_version";

const CURRENT_VERSION = Number(seed.version ?? 3);

export function loadDb() {
  const storedVersion = Number(localStorage.getItem(VERSION_KEY));
  if (storedVersion !== CURRENT_VERSION) {
    resetDb(); // återställer DB + räknare, sparar version
  }

  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);

  // Om ingen DB finns alls (t.ex. första körningen)
  const initial = seed;
  localStorage.setItem(DB_KEY, JSON.stringify(initial));
  initializeCounters(initial);
  localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  return initial;
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDb() {
  const initial = seed;
  localStorage.setItem(DB_KEY, JSON.stringify(initial));
  initializeCounters(initial);
  localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  return initial;
}

export function nextCategoryId() {
  const counters = loadCounters();
  const id = counters.nextCategoryId;
  counters.nextCategoryId += 1;
  saveCounters(counters);
  return id;
}

export function nextProductId() {
  const counters = loadCounters();
  const id = counters.nextProductId;
  counters.nextProductId += 1;
  saveCounters(counters);
  return id;
}

// ---- helpers --------------------------------------------------

function initializeCounters(dbSeed) {
  const maxCatId = Math.max(...dbSeed.categories.map((c) => c.id), 0);
  const maxProdId = Math.max(...dbSeed.products.map((p) => p.id), 0);

  const counters = {
    nextCategoryId: maxCatId + 1,
    nextProductId: maxProdId + 1,
  };
  localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters));
}

function loadCounters() {
  const raw = localStorage.getItem(COUNTERS_KEY);
  return raw ? JSON.parse(raw) : { nextCategoryId: 1, nextProductId: 1 };
}

function saveCounters(counters) {
  localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters));
}
