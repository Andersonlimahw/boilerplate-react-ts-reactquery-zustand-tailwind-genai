interface SumInput {
  a: number;
  b: number;
}

export const sum = ( { a, b } : SumInput) => {
  return a + b;
}