import { CKAN_API_URL, RESOURCE_ID } from "../config";
import { type Dataset } from "../utils/types.ts";

export const getDataset = async (filters: string): Promise<Dataset> => {
  const url = `${CKAN_API_URL}?resource_id=${RESOURCE_ID}&${filters}`;
  console.log({ url });
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};
