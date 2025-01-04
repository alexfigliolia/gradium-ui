import type { ModalToggle } from "@figliolia/modal-stack";
import type { FocusedKeyListener } from "@figliolia/react-hooks";
import { Devices } from "Tools/Devices";
import { ModalStack } from "Tools/ModalStack";
import type { Callback } from "Types/Generics";

export class AssistedInput {
  public readonly Toggle: ModalToggle;
  protected readonly FocusListener: FocusedKeyListener;
  protected readonly setState: Callback<[open: boolean]>;
  constructor(
    setState: Callback<[open: boolean]>,
    listener: FocusedKeyListener,
  ) {
    this.setState = setState;
    this.FocusListener = listener;
    this.Toggle = ModalStack.create(this.open, this.close);
  }

  public readonly onFocus = () => {
    if (!Devices.IS_MOBILE_BROWSER) {
      this.Toggle.open();
    }
    this.FocusListener.onFocus();
  };

  private readonly open = () => {
    this.setState(true);
  };

  private readonly close = () => {
    this.setState(false);
  };
}
