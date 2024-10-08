import type { ModalToggle } from "@figliolia/modal-stack";
import type { FocusedKeyListener } from "@figliolia/react-hooks";
import { Dates } from "Tools/Dates";
import { Devices } from "Tools/Devices";
import { ModalStack } from "Tools/ModalStack";
import type { Callback } from "Types/Generics";

export class Controller {
  private FocusListener?: FocusedKeyListener;
  public readonly Toggle: ModalToggle;
  private setState: Callback<[open: boolean]>;
  constructor(setState: Callback<[open: boolean]>) {
    this.setState = setState;
    this.Toggle = ModalStack.create(this.open, this.close);
  }

  public register(listener: FocusedKeyListener) {
    this.FocusListener = listener;
  }

  public static format(value: string) {
    if (Devices.IS_MOBILE_BROWSER) {
      return value;
    }
    return value ? Dates.format(Dates.fromISODateString(value)) : "";
  }

  public static toISODate(value: string) {
    return value ? Dates.ISODateString(value) : value;
  }

  public static toISOString(value: string) {
    return Dates.fromISODateString(value).toISOString();
  }

  public onFocus = () => {
    if (!Devices.IS_MOBILE_BROWSER) {
      this.Toggle.open();
    }
    this.FocusListener?.onFocus?.();
  };

  private open = () => {
    this.setState(true);
  };

  private close = () => {
    this.setState(false);
  };
}
