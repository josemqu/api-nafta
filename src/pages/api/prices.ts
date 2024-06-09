import { type APIRoute } from "astro";
import {
  getDataset,
  // getData,
  getDataFromBbox,
} from "../../utils/ckan.ts";

const isArrayOfNonEmptyStrings = (arr: any): boolean => {
  return (
    Array.isArray(arr) &&
    arr.every((el) => typeof el === "string" && el.length > 0)
  );
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const producto = params.get("producto")?.split(",");
  const empresabandera = params.get("empresabandera")?.split(",");
  const provincia = params.get("provincia")?.split(",");

  console.log({ provincia, producto, empresabandera });

  // filters is an object. If any value y null, it will be removed from the object
  const filters: {
    producto?: string[];
    empresabandera?: string[];
    provincia?: string[];
  } = {};

  if (isArrayOfNonEmptyStrings(producto)) {
    filters["producto"] = producto;
  }

  if (isArrayOfNonEmptyStrings(empresabandera)) {
    filters["empresabandera"] = empresabandera;
  }

  if (isArrayOfNonEmptyStrings(provincia)) {
    filters["provincia"] = provincia;
  }

  const limit = 5000;

  const data = await getDataFromBbox(filters, limit);
  return new Response(JSON.stringify(data));
};
