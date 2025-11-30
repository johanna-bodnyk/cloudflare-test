import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

// export interface Env {
//   // If you set another name in the Wrangler config file for the value for 'binding',
//   // replace "DB" with the variable name you defined.
//   db: D1Database;
// }

app.get("/api/entries/", async (c) => {
  const db = c.env.db;
  const results = await db.prepare("SELECT * FROM entries").all();
  return c.json(results);
});

app.get("/api/", (c) => c.json({ name: "Tracks!" }));

export default app;

// export default {
//   async fetch(request, env): Promise<Response> {
//     const { pathname } = new URL(request.url);

//     if (pathname === "/api/beverages") {
//       // If you did not use `DB` as your binding name, change it here
//       const { results } = await env.db.prepare(
//         "SELECT * FROM Customers WHERE CompanyName = ?",
//       )
//         .bind("Bs Beverages")
//         .run();
//       return Response.json(results);
//     }

//     return new Response(
//       "Call /api/beverages to see everyone who works at Bs Beverages",
//     );
//   },
// } satisfies ExportedHandler<Env>;