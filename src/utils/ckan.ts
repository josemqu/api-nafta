import { CKAN_API_URL, RESOURCE_ID } from "../config";
import { type Dataset } from "../utils/types.ts";

export const getDataset = async (
  filters: string,
  limit: number
): Promise<Dataset> => {
  const url = `${CKAN_API_URL}?resource_id=${RESOURCE_ID}&filters={${filters}}&limit=${limit}`;

  console.log({ url });

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

// Need to create a function that will return the dataset from the CKAN API
// The function should accept two arguments: filters and limit
// The function should be called getData
// The function should be exported
// The function should be a async function
// The function should use the fetch API to get the data from the CKAN API
// The function should use the CKAN_API_URL and RESOURCE_ID from the config file
// The function should return the data as a JSON object
// The function should return a stream of data that enables to update a progress bar while getting the data from the API

// export const getData = async (
//   filters: string,
//   limit: number
// ): Promise<Dataset> => {
//   const url = `${CKAN_API_URL}?resource_id=${RESOURCE_ID}&filters={${filters}}&limit=${limit}`;

//   console.log({ url });

//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const reader = res.body?.getReader();

//   if (!reader) {
//     throw new Error("No reader");
//   }

//   const contentLength = res.headers?.get("Content-Length")
//     ? +res.headers.get("Content-Length")
//     : 0;
//   let receivedLength = 0;
//   let chunks = [];

//   while (true) {
//     const { done, value } = await reader.read();

//     if (done) {
//       break;
//     }

//     chunks.push(value);
//     receivedLength += value.length;

//     // print a progress bar in the console
//     if (contentLength) {
//       console.log(
//         `Received ${receivedLength} of ${contentLength} bytes (${(
//           (receivedLength / contentLength) *
//           100
//         ).toFixed(2)}%)`
//       );
//     }
//   }

//   const chunksAll = new Uint8Array(receivedLength);
//   let position = 0;

//   for (const chunk of chunks) {
//     chunksAll.set(chunk, position);
//     position += chunk.length;
//   }

//   const data = JSON.parse(new TextDecoder("utf-8").decode(chunksAll));

//   return data;
// };

interface CKANResponse {
  success: boolean;
  result: {
    records: Record<string, any>[];
  };
  error?: string;
}

interface BoundingBox {
  min_latitude: number;
  min_longitude: number;
  max_latitude: number;
  max_longitude: number;
}

// perform a geo-location query with the specified parameters using JavaScript
export const getDataFromBbox = async (
  filters: Object = {},
  limit: number = 100
): Promise<CKANResponse> => {
  // Define your bounding box (min latitude, min longitude, max latitude, max longitude)

  // bbox for these coords -57.610073,-38.033490,-57.530594,-37.956380
  const bbox: BoundingBox = {
    min_latitude: -38.03349,
    min_longitude: -57.610073,
    max_latitude: -37.95638,
    max_longitude: -57.530594,
  };

  // Additional filters
  const allFilters = JSON.stringify({
    idtipohorario: 2,
    ...filters,
  }).toString();

  // Query parameters
  const params = new URLSearchParams({
    resource_id: RESOURCE_ID,
    filters: allFilters,
    limit: limit.toString(),
  });

  const url = `${CKAN_API_URL}?${params.toString()}`;
  console.log({ url });

  // Perform the query
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: CKANResponse) => {
      if (data.success) {
        const records = data.result.records;

        // Apply the bounding box filter on the client side
        const filteredRecords = records.filter((record) => {
          const lat = record.latitud;
          const lon = record.longitud;
          return (
            lat >= bbox.min_latitude &&
            lat <= bbox.max_latitude &&
            lon >= bbox.min_longitude &&
            lon <= bbox.max_longitude
          );
        });

        // return the complete response with the filtered records
        return { ...data, result: { records: filteredRecords } };
      } else {
        console.error("Error:", data.error);
        throw new Error(data.error); // Throw an error when data.success is false
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to ensure the function doesn't return undefined
    });
};
