import type { Callback } from "@figliolia/drag-detector";
import type { ModalToggle } from "@figliolia/modal-stack";
import { ModalStack } from "Tools/ModalStack";
import type { IHTMLOption } from "Types/React";
import type { DDValue } from "./types";

export class Controller {
  Toggle: ModalToggle;
  private onOpen?: Callback;
  private onClose?: Callback;
  private setOpen: Callback<[open: boolean]>;
  node: HTMLInputElement | null = null;
  constructor(setOpen: Callback<[open: boolean]>) {
    this.setOpen = setOpen;
    this.Toggle = ModalStack.create(this.open, this.close);
  }

  public registerNode(node: HTMLInputElement | null) {
    this.node = node;
  }

  public registerProxies(onOpen?: Callback, onClose?: Callback) {
    this.onOpen = onOpen;
    this.onClose = onClose;
  }

  public open = () => {
    this.proxy(true);
  };

  public close = () => {
    this.proxy(false);
    this.blurNode();
  };

  public blurNode() {
    if (!this.node) {
      return;
    }
    this.node.blur();
  }

  public static valueLength<M extends boolean | undefined>(value: DDValue<M>) {
    if (typeof value === "string") {
      return 0;
    }
    return value.size;
  }

  public static toTable<T extends IHTMLOption>(list: T[]) {
    return list.reduce<Record<string, string>>((acc, { value, label }) => {
      acc[value] = label || value;
      return acc;
    }, {});
  }

  public static parseValues(
    value: Set<string> | string,
    table: Record<string, string>,
  ) {
    if (typeof value === "string") {
      return table[value] ?? "";
    }
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

  private proxy(state: boolean) {
    if (state) {
      this.onOpen?.();
    } else {
      this.onClose?.();
    }
    this.setOpen(state);
  }
}
