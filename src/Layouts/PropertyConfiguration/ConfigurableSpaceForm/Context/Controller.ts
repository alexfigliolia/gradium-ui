import type { ChangeEvent } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { Debouncer } from "@figliolia/react-hooks";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { GradiumImageType } from "GraphQL/Types";
import { Modals } from "State/Modals";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import { Dates } from "Tools/Dates";
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
    this.setState("loading", true);
    this.model.updateListItem(this.ID, key, value);
    this.debouncer.execute();
  };

  public updateInt = <K extends Extract<keyof T, string>>(
    key: K,
    value: string,
  ) => {
    return this.update(key, parseInt(value) as T[K]);
  };

  public updateTimeToDate = <K extends Extract<keyof T, string>>(
    key: K,
    value: T[K],
  ) => {
    if (!value) {
      return this.model.updateListItem(this.ID, key, value);
    }
    if (typeof value === "string") {
      const date = Dates.timeToDate(value);
      if (date === "Invalid Date") {
        return this.update(key, value);
      }
      return this.update(key, Dates.timeToDate(value) as T[k]);
    }
  };

  public parseTimeFromDate = (date: string) => {
    if (!date) {
      return "";
    }
    if (!Dates.isISODate(date)) {
      return date;
    }
    const dateObj = new Date(date);
    if (dateObj.toString() === "Invalid Date") {
      return date;
    }
    return Dates.dateToTime(new Date(date));
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

  public createUploader(type: GradiumImageType) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const uploader = new CloudinaryUploader(urls => {
        this.model.dispatchTemporaryURL(this.ID, type, ...urls);
      });
      void uploader.onUpload(e, { entityId: this.ID, type }).then(images => {
        this.model.dispatchImage(this.ID, type, ...images);
      });
    };
  }
}
