test("testa o endpoint de status", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const retorno = await res.json();
  console.log(retorno);
  expect(res.status).toBe(200);
  expect(retorno.update_at).toBeDefined();

  const parsedUpdateAt = new Date(retorno.update_at);
  expect(retorno.update_at).toEqual(parsedUpdateAt.toISOString());

  expect(retorno.dependencies.database.version).toEqual("16.0");
  expect(typeof retorno.dependencies.database.max_connections).toBe("number");
  expect(typeof retorno.dependencies.database.opened_connections).toBe(
    "number",
  );
  expect(retorno.dependencies.database.max_connections).toEqual(100);
  expect(retorno.dependencies.database.opened_connections).toEqual(1);
});
