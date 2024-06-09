import { writable } from "svelte/store";
import { type Record } from "./utils/types.ts";

export const APP_STATUS = {
  INIT: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
};

export const appStatus = writable(APP_STATUS.INIT);

export const appStatusInfo = writable({
  selectedProducto: [] as string[],
  selectedBandera: [] as string[],
  selectedProvincia: [] as string[],
  zone: "",
  records: [] as Record[],
  total: 0,
  page: 1,
  limit: 10,
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
  zone,
  records,
  total,
  page,
  limit,
}: {
  selectedProducto: string[];
  selectedBandera: string[];
  selectedProvincia: string[];
  zone: string;
  records: Record[];
  total: number;
  page: number;
  limit: number;
}) => {
  appStatus.set(APP_STATUS.LOADED);
  appStatusInfo.set({
    selectedProducto,
    selectedBandera,
    selectedProvincia,
    zone,
    records,
    total,
    page,
    limit,
  });
};
