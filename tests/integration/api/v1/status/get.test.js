test("testa o endpoint /api/v1/status", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const json = await res.json();
  console.log(json);
  expect(res.status).toBe(200);
  expect(json).toEqual({
    data: { status: "OK", message: "API is running" },
  });
});
