import { type APIRoute } from "astro";
import { getDataset } from "../../utils/ckan.ts";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const filters = params.get("filters");

  console.log({ filters });

  const data = await getDataset(filters || "");
  console.log({ data });
  return new Response(JSON.stringify(data));
};
