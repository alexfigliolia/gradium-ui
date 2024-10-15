import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Timeout } from "@figliolia/react-hooks";
import type { RefObject } from "@fullcalendar/core/preact.js";
import { ImagePreloader } from "Generics/ImagePreloader";
import type { PropertyImage } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import type { IImageUploader } from "./ImageUploader";

export interface IState {
  loading: boolean;
  temporaryImage: string | null;
}

type StateSetter = Dispatch<SetStateAction<IState>>;

export class Controller {
  private Timeout = new Timeout();
  private setState: StateSetter;
  private ImageUploader: RefObject<IImageUploader>;
  constructor(setState: StateSetter, uploader: RefObject<IImageUploader>) {
    this.setState = setState;
    this.ImageUploader = uploader;
  }

  public onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    this.activateLoader();
    const uploader = new CloudinaryUploader(url => {
      this.setState(state => ({
        ...state,
        temporaryImage: url,
      }));
    });
    void uploader.onUpload(e).then(img => {
      if (!img) {
        this.fadeLoader();
        this.ImageUploader.current?.clearInput.current?.();
      }
    });
  };

  public deleteImage(image: PropertyImage) {
    this.activateLoader();
    void CloudinaryDeleter.delete(image).finally(() => {
      this.fadeLoader();
    });
  }

  public preloadImage(url: string) {
    const preloader = new ImagePreloader(url, this.onLoad);
    void preloader.safePreload();
    return preloader;
  }

  private onLoad = () => {
    this.fadeLoader(() => {
      this.setState(state => ({
        ...state,
        temporaryImage: null,
      }));
    });
  };

  private fadeLoader(onFade?: Callback) {
    this.ImageUploader.current?.fader?.current?.(true);
    this.Timeout.execute(() => {
      this.setLoading(false);
      onFade?.();
    }, 500);
  }

  private activateLoader() {
    this.ImageUploader.current?.fader?.current?.(false);
    this.setLoading(true);
  }

  private setLoading(loading: boolean) {
    this.setState(state => ({
      ...state,
      loading,
    }));
  }
}
