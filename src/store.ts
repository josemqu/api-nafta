import { writable } from "svelte/store";
import { type Record } from "./utils/types.ts";

// Key for persisting selected filters in localStorage
const FILTERS_KEY = "nafta_filters_v1";

type PersistedFilters = {
  selectedProducto: string[];
  selectedBandera: string[];
  selectedProvincia: string[];
  selectedLocalidad: string[];
  selectedDate: Date;
  zone: string;
};

const defaultFilters: PersistedFilters = {
  selectedProducto: [],
  selectedBandera: [],
  selectedProvincia: [],
  selectedLocalidad: [],
  selectedDate: new Date(),
  zone: "",
};

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadPersistedFilters(): PersistedFilters {
  if (!isBrowser()) return { ...defaultFilters };
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    if (!raw) return { ...defaultFilters };
    const parsed = JSON.parse(raw);
    const ensureArray = (v: unknown) =>
      Array.isArray(v) ? (v as string[]) : [];
    const ensureString = (v: unknown) =>
      typeof v === "string" ? (v as string) : "";
    const ensureDate = (v: unknown): Date => {
      if (typeof v === "string" && v) {
        const date = new Date(v);
        return isNaN(date.getTime()) ? new Date() : date;
      }
      return new Date();
    };
    return {
      selectedProducto: ensureArray(parsed.selectedProducto),
      selectedBandera: ensureArray(parsed.selectedBandera),
      selectedProvincia: ensureArray(parsed.selectedProvincia),
      selectedLocalidad: ensureArray(parsed.selectedLocalidad),
      selectedDate: ensureDate(parsed.selectedDate),
      zone: ensureString(parsed.zone),
    };
  } catch {
    return { ...defaultFilters };
  }
}

function persistFilters(filters: PersistedFilters) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  } catch {
    // ignore quota/serialization errors
  }
}

export const APP_STATUS = {
  INIT: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
};

export const appStatus = writable(APP_STATUS.INIT);

const persisted = loadPersistedFilters();

export const appStatusInfo = writable({
  ...persisted,
  records: [] as Record[],
  total: 0,
  page: 1,
  limit: 10,
  time: 0,
});

// Persist filters whenever they change in the store
appStatusInfo.subscribe((state) => {
  const filters: PersistedFilters = {
    selectedProducto: state.selectedProducto,
    selectedBandera: state.selectedBandera,
    selectedProvincia: state.selectedProvincia,
    selectedLocalidad: state.selectedLocalidad,
    selectedDate: state.selectedDate,
    zone: state.zone,
  };
  persistFilters(filters);
});

export const setAppStatusLoading = () => {
  appStatus.set(APP_STATUS.LOADING);
};

export const setAppStatusError = () => {
  appStatus.set(APP_STATUS.ERROR);
};

export const setAppStatusLoaded = ({
  selectedProducto,
  selectedBandera,
  selectedProvincia,
  selectedLocalidad,
  selectedDate,
  zone,
  records,
  total,
  page,
  limit,
  time,
}: {
  selectedProducto: string[];
  selectedBandera: string[];
  selectedProvincia: string[];
  selectedLocalidad: string[];
  selectedDate: Date;
  zone: string;
  records: Record[];
  total: number;
  page: number;
  limit: number;
  time: number;
}) => {
  appStatus.set(APP_STATUS.LOADED);
  appStatusInfo.set({
    selectedProducto,
    selectedBandera,
    selectedProvincia,
    selectedLocalidad,
    selectedDate,
    zone,
    records,
    total,
    page,
    limit,
    time,
  });
};
