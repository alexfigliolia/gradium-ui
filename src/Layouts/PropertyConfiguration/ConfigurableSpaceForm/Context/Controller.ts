import type { ChangeEvent } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { Debouncer } from "@figliolia/react-hooks";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { Modals } from "State/Modals";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import type { IConfigurableSpace } from "Types/Gradium";

export class Controller<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> {
  model: M;
  ID: number;
  setState!: ILoadingStateSetter;
  private debouncer: Debouncer<Callback>;
  public uploadImages: Callback<[ChangeEvent<HTMLInputElement>]>;
  public uploadFloorPlans: Callback<[ChangeEvent<HTMLInputElement>]>;
  constructor(model: M, ID: number) {
    this.ID = ID;
    this.model = model;
    this.debouncer = new Debouncer(() => {
      void this.model.save(this.ID, this.setState);
    }, 1000);
    this.uploadImages = this.createUploader(this.model.IMAGE_TYPE);
    this.uploadFloorPlans = this.createUploader(this.model.FLOOR_PLAN_TYPE);
  }

  public register(ID: number, setState: ILoadingStateSetter) {
    this.ID = ID;
    this.setState = setState;
  }

  public update = <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
    this.model.updateListItem(this.ID, key, value);
    this.debouncer.execute();
  };

  public destroy() {
    if (this.debouncer.hasActionPending) {
      this.debouncer.cancel();
      void this.model.saveBeforeUnmount(this.ID);
    }
  }

  public createKey<K extends Extract<keyof T, string>>(name: K, base: string) {
    return `${name}-${base}-${this.ID}`;
  }

  public onTrashClick = (item: T) => {
    this.model.setDeletionScope(item);
    return Modals.deleteSpace.open();
  };

  public createUploader(
    type: GradiumImageType,
    dispatcher = this.createDispatcher(type),
  ) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const uploader = new CloudinaryUploader(urls => {
        dispatcher(...urls.map(url => ({ id: -1, url })));
      });
      void uploader.onUpload(e, { entityId: this.ID, type }).then(images => {
        dispatcher(...images);
      });
    };
  }

  public createDispatcher(type: GradiumImageType) {
    return (...images: GradiumImage[]) => {
      this.model.dispatchImage(this.ID, type, ...images);
    };
  }
}
