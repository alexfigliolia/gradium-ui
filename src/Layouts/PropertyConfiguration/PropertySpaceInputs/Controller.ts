import { Modals } from "State/Modals";
import type { BaseListCRUDModel } from "Tools/BaseListCrudModel";

export class Controller<T extends Record<string, any>> {
  index: number;
  model: BaseListCRUDModel<T>;
  constructor(model: BaseListCRUDModel<T>, index: number) {
    this.model = model;
    this.index = index;
  }

  public register(index: number) {
    this.index = index;
  }

  public update = <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
    this.model.updateList(this.index, key, value);
  };

  public createKey<K extends Extract<keyof T, string>>(name: K) {
    return `${name}-amenity-${this.index + 1}`;
  }

  public onTrashClick = (amenity: T) => {
    if (this.model.validate(amenity)) {
      this.model.setDeletionScope(amenity.name, this.index);
      return Modals.deleteSpace.open();
    }
    this.model.delete(this.index);
  };
}
