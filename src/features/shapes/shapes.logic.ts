export const rotateLeft = <T,>(array: T[]): T[] =>
  array.length > 0 ? [...array.slice(1), array[0]] : array;

export const rotateRight = <T,>(array: T[]): T[] =>
  array.length > 0 ? [array[array.length - 1], ...array.slice(0, -1)] : array;

export const shuffle = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);
