import { Hono } from "hono";
import { db } from "../db/index.js";
import { addressTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import type { StatusCode } from "hono/utils/http-status";
import { createApiResponse } from "../helpers/ApiResponse.js";

const addressRoute = new Hono();

addressRoute.get("/", async (c) => {
  const addresses = await db.query.addressTable.findMany();
  return c.json(createApiResponse(200, addresses, null), 200);
});

addressRoute.post("/", async (c) => {
  const { countryCode, ...addressData } = await c.req.json();
  await db.insert(addressTable).values({ countryCode, ...addressData });

  return c.json(
    createApiResponse(201, "Address Created successfully", null),
    201,
  );
});
addressRoute.delete("/:id", async (c) => {
  const addressId = parseInt(c.req.param("id"));
  const getAddressById = await db
    .select()
    .from(addressTable)
    .where(eq(addressTable.id, addressId));

  if (!getAddressById[0]) {
    return c.json(createApiResponse(404, null, "No Address found"), 404);
  }
  const deleted = await db
    .delete(addressTable)
    .where(eq(addressTable.id, addressId));

  return c.json(
    createApiResponse(200, "Address Deleted successfully", null),
    200,
  );
});
export default addressRoute;
