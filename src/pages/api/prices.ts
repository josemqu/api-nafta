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

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const url = new URL(request.url);
  const params = url.searchParams;
  const producto = params.get("producto")?.split(",");
  const empresabandera = params.get("empresabandera")?.split(",");
  const provincia = params.get("provincia")?.split(",");
  const localidad = params.get("localidad")?.split(",");
  const fecha = params.get("fecha_vigencia")?.toString() || "";
  const zone = formData.get("zone")?.toString() || "";

  console.log({ producto, empresabandera, provincia, localidad, fecha, zone });

  // filters is an object. If any value y null, it will be removed from the object
  const filters: {
    producto?: string[];
    empresabandera?: string[];
    provincia?: string[];
    localidad?: string[];
    fecha_vigencia?: string;
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

  if (isArrayOfNonEmptyStrings(localidad)) {
    filters["localidad"] = localidad;
  }

  if (fecha) {
    filters["fecha_vigencia"] = fecha;
  }

  console.log({ filters });

  const limit = 10000;

  const data = await getDataFromBbox(filters, limit, zone);
  return new Response(JSON.stringify(data));
};
