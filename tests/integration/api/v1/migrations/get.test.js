import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("testa o endpoint de migrations", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");

  expect(res.status).toBe(200);

  console.log(process.env.NODE_ENV);

  const responseBody = await res.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
