import type { ReactNode } from "react";

export interface Propless {
  key?: string | number;
}

export type ExtendableProps = Record<string, any>;

export interface OptionalChildren {
  children?: ReactNode;
}

export interface OptionalRef<T> {
  ref?: T;
}

export interface OptionalClassName {
  className?: string;
}

export interface ActionState {
  error?: boolean;
  loading?: boolean;
  success?: boolean;
}

export interface IOption {
  label?: ReactNode;
  value: string;
}

export interface IHTMLOption {
  label?: string;
  value: string;
}

export type HeaderTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
