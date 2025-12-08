import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("testa o endpoint de migrations", async () => {
  const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(res1.status).toBe(201);

  const responseBody1 = await res1.json();

  console.log(responseBody1);

  expect(Array.isArray(responseBody1)).toBe(true);

  expect(responseBody1.length).toBeGreaterThan(0);

  const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(res2.status).toBe(200);

  const responseBody2 = await res2.json();

  console.log(responseBody2);

  expect(Array.isArray(responseBody2)).toBe(true);

  expect(responseBody2.length).toBe(0);
});
