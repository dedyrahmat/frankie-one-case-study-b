import { serve } from "@hono/node-server";
import { Hono } from "hono";
import addressRoute from "./routes/address-route.js";
import { cors } from "hono/cors";

const app = new Hono();
const PORT = 4000;

app.use(
  "*",
  cors({
    origin: "*",
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/addresses", addressRoute);
app.notFound((c) => {
  return c.json({ message: "No Route found" }, 404);
});

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
