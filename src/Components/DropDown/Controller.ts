import type { Callback } from "@figliolia/drag-detector";
import type { ModalToggle } from "@figliolia/modal-stack";
import { ModalStack } from "Tools/ModalStack";
import type { IListItem } from "./types";

export class Controller {
  Toggle: ModalToggle;
  setOpen: Callback<[open: boolean]>;
  node: HTMLInputElement | null = null;
  constructor(setOpen: Callback<[open: boolean]>) {
    this.setOpen = setOpen;
    this.Toggle = ModalStack.create(this.open, this.close);
  }

  public register(node: HTMLInputElement | null) {
    this.node = node;
  }

  public open = () => {
    this.setOpen(true);
  };

  public close = () => {
    this.setOpen(false);
    this.blurNode();
  };

  public blurNode() {
    if (!this.node) {
      return;
    }
    this.node.blur();
  }

  public static toTable<T extends IListItem>(list: T[]) {
    return list.reduce<Record<string, string>>((acc, { value, label }) => {
      acc[value] = label || value;
      return acc;
    }, {});
  }

  public static parseValues(value: Set<string>, table: Record<string, string>) {
    return Array.from(value)
      .map(v => table[v])
      .join(", ");
  }

  public static add(value: string, values: Set<string>, multiple?: boolean) {
    const copy = new Set(values);
    if (values.has(value)) {
      copy.delete(value);
    } else if (multiple) {
      copy.add(value);
    } else {
      copy.clear();
      copy.add(value);
    }
    return copy;
  }
}
