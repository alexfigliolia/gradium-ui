export interface IMargins {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface Coordinate<X = number, Y = number> {
  x: X;
  y: Y;
}
