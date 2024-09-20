import type { Dispatch, MouseEvent, SetStateAction, TouchEvent } from "react";

export interface State {
  x: number;
  y: number;
  opacity: number;
}

export type SetFrame = Dispatch<SetStateAction<State>>;

export type Interaction =
  | MouseEvent<HTMLDivElement>
  | TouchEvent<HTMLDivElement>;
