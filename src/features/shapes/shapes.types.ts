export type ShapeKind =
  | "circle"
  | "square"
  | "rounded"
  | "pill"
  | "diamond"
  | "triangle";

export interface ShapeItem {
  id: string;
  kind: ShapeKind;
  order: number;
}
