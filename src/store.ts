import { writable } from "svelte/store";

export const APP_STATUS = {
  INIT: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
};

export const appStatus = writable(APP_STATUS.INIT);

export const appStatusInfo = writable({});

export const setAppStatusLoading = () => {
  appStatus.set(APP_STATUS.LOADING);
};

export const setAppStatusError = () => {
  appStatus.set(APP_STATUS.ERROR);
};

export const setAppStatusLoaded = ({
  records, // Change 'data' to 'records'
  total,
  page,
  limit,
}: {
  records: any[];
  total: number;
  page: number;
  limit: number;
}) => {
  appStatus.set(APP_STATUS.LOADED);
  appStatusInfo.set({
    records,
    total,
    page,
    limit,
  }); // Change 'data' to 'records'
};
