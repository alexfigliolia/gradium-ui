import { State } from "@figliolia/galena";
import type { ModalToggle } from "@figliolia/modal-stack";
import { ModalStack } from "Tools/ModalStack";
import type { IModals } from "./types";

export class ModalsModel extends State<IModals> {
  public newProperty: ModalToggle;
  constructor() {
    super("Modals", {
      newProperty: false,
    });
    this.newProperty = ModalStack.create(
      this.openNewProperty,
      this.closeNewProperty,
    );
  }

  private openNewProperty = () => {
    this.update(state => {
      state.newProperty = true;
    });
  };

  private closeNewProperty = () => {
    this.update(state => {
      state.newProperty = false;
    });
  };
}
