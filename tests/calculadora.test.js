test("espero que 1 seja igual a 1", () => {
  expect(1).toBe(1);
});

function soma(a, b) {
  return a + b;
}

test("soma 2 + 2 é igual a 4", () => {
  expect(soma(2, 2)).toBe(4);
});
