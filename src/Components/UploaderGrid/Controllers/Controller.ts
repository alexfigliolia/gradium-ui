import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ImagePreloader } from "Generics/ImagePreloader";
import type { GradiumImage } from "GraphQL/Types";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { IUploaderState } from "../types";
import { InstanceTracker } from "./InstanceTracker";

export abstract class Controller<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> extends InstanceTracker {
  private readonly setState: Dispatch<SetStateAction<AnonymousImage<T>[]>>;
  constructor(setState: Dispatch<SetStateAction<AnonymousImage<T>[]>>) {
    super();
    this.setState = setState;
  }

  public deleteGenerator(index: number) {
    return () => {
      this.spliceImage(index);
    };
  }

  public upload(e: ChangeEvent<HTMLInputElement>, length: number) {
    const files = CloudinaryUploader.runValidations(e);
    if (!files?.length) {
      return;
    }
    const ID = this.cache(length);
    const nextState: AnonymousImage<T>[] = files.map(file => {
      const id = parseInt(this.ID()) * -1;
      return this.createItem(id, file);
    });
    this.setState(ps => [...ps, ...nextState]);
    void Promise.all(
      nextState.map(({ url }, i) => {
        if (url) {
          return new ImagePreloader(url, () => {
            this.markLoadingAtIndex(this.get(ID) + i, false);
          }).safePreload();
        }
      }),
    );
  }

  abstract createItem(id: number, file: File): AnonymousImage<T>;

  private markLoadingAtIndex(index: number, loading = true) {
    this.setState(ps =>
      ps.map((state, i) => (i === index ? { ...state, loading } : state)),
    );
  }

  private spliceImage(index: number) {
    this.setState(ps =>
      ps.filter((_, i) => {
        if (i !== index) {
          return true;
        }
        this.decrementAll(i);
        return false;
      }),
    );
  }
}

export interface AnonymousImage<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> extends Omit<IUploaderState<T>, "error"> {
  file: File;
}
