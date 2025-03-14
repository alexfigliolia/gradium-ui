import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Timeout } from "@figliolia/react-hooks";
import type { RefObject } from "@fullcalendar/core/preact.js";
import { ImagePreloader } from "Generics/ImagePreloader";
import type { GradiumImage } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import type { CloudinaryImageScope } from "Types/Gradium";
import type { IImageUploader } from "./ImageUploader";

export interface IState {
  loading: boolean;
  temporaryImage: string | null;
}

type StateSetter = Dispatch<SetStateAction<IState>>;

export class Controller {
  private readonly setState: StateSetter;
  private readonly Timeout = new Timeout();
  private readonly ImageUploader: RefObject<IImageUploader>;
  constructor(setState: StateSetter, uploader: RefObject<IImageUploader>) {
    this.setState = setState;
    this.ImageUploader = uploader;
  }

  public static DEV_WARN(
    args: Partial<CloudinaryImageScope>,
  ): args is CloudinaryImageScope {
    const { type, entityId } = args;
    if (!type || !entityId) {
      if (import.meta.env.DEV) {
        console.warn(
          "Cloudinary Image Interface: Attempted to upload without an entity id or type",
          { type, entityId },
        );
      }
      return false;
    }
    return true;
  }

  public readonly onUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryImageScope,
  ) => {
    this.activateLoader();
    const uploader = new CloudinaryUploader(urls => {
      if (urls[0]) {
        this.setTemporaryImage(urls[0]);
      }
    });
    const images = await uploader.onUploadImage(e, scope);
    if (images.length) {
      return images;
    }
    this.fadeLoader();
    this.setTemporaryImage(null);
  };

  public deleteImage(image: GradiumImage, scope: CloudinaryImageScope) {
    this.activateLoader();
    return CloudinaryDeleter.deleteImage(image, scope)
      .then(img => img)
      .finally(() => {
        this.fadeLoader();
      });
  }

  public preloadImage(url: string) {
    const preloader = new ImagePreloader(url, this.onLoad);
    void preloader.safePreload();
    return preloader;
  }

  public readonly onLoad = () => {
    this.fadeLoader(() => {
      this.setTemporaryImage(null);
    });
  };

  public fadeLoader(onFade?: Callback) {
    this.ImageUploader.current?.fader?.current?.(true);
    this.Timeout.execute(() => {
      this.setLoading(false);
      onFade?.();
    }, 500);
  }

  public activateLoader() {
    this.ImageUploader.current?.fader?.current?.(false);
    this.setLoading(true);
  }

  private setLoading(loading: boolean) {
    this.setState(state => ({
      ...state,
      loading,
    }));
  }

  public setTemporaryImage(url: string | null) {
    this.setState(state => ({
      ...state,
      temporaryImage: url,
    }));
  }
}
