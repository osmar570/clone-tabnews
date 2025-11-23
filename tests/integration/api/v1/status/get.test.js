test("testa o endpoint de status", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const json = await res.json();
  console.log(json);
  expect(res.status).toBe(200);
});
