import type { ChangeEvent, MutableRefObject, ReactNode } from "react";
import { Component } from "react";
import { TimedPromise } from "@figliolia/promises";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { UploadInterface } from "Tools/UploadInterface";
import type { GradiumImageCallback } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import type { ImageState } from "./ImageUploader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export class EntityUploader extends Component<Props, State> {
  public state: State;
  private readonly Controller = new Controller();
  constructor(props: Props) {
    super(props);
    this.state = {
      uploading: [],
      initialImages: EntityUploader.initialize(this.props.images),
    };
    const { deleteImage } = this.props;
    if (deleteImage) {
      deleteImage.current = (image: GradiumImage) =>
        this.deleteImageExternal(image);
    }
  }

  private static initialize(images: GradiumImage[]) {
    return images.map(img => ({ savedImage: img }));
  }

  public override UNSAFE_componentWillReceiveProps({
    images,
    entityId,
  }: Props) {
    if (entityId !== this.props.entityId) {
      this.setState({
        uploading: [],
        initialImages: EntityUploader.initialize(images),
      });
    }
  }

  public override shouldComponentUpdate(
    { min, className, renderItem }: Props,
    state: State,
  ) {
    return (
      state !== this.state ||
      min !== this.props.min ||
      className !== this.props.className ||
      renderItem !== this.props.renderItem
    );
  }

  private readonly onValidFiles = (files: File[]) => {
    this.setState(ps => ({
      ...ps,
      uploading: [
        ...ps.uploading,
        ...files.map(file => ({
          error: false,
          loading: true,
          url: URL.createObjectURL(file),
        })),
      ],
    }));
  };

  private readonly onSuccess = (ID: string) => {
    return (_: File, image: GradiumImage, index: number) => {
      const startIndex = this.Controller.get(ID);
      this.setState(ps => ({
        uploading: ps.uploading.map((state, i) =>
          i === index + startIndex
            ? { ...state, loading: false, savedImage: image }
            : state,
        ),
      }));
      this.props.onUpload(image);
    };
  };

  private readonly onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    void this.upload(e);
  };

  private async upload(e: ChangeEvent<HTMLInputElement>) {
    const { imageType, entityId } = this.props;
    const ID = this.Controller.cache(this.state.uploading.length);
    const uploader = new UploadInterface({
      onSuccess: this.onSuccess(ID),
      onValidFiles: this.onValidFiles,
      onError: (_, index) =>
        this.markErrorAtIndex(this.Controller.get(ID) + index, "uploading"),
    });
    try {
      await uploader.onUpload(e, { entityId, type: imageType });
      e.target.value = "";
    } catch (error) {
      // silence
    }
    this.Controller.delete(ID);
  }

  private TimedDeletion(image: GradiumImage) {
    const { entityId, imageType } = this.props;
    return new TimedPromise(
      () => CloudinaryDeleter.deleteImage(image, { entityId, type: imageType }),
      1500,
    );
  }

  private async onDelete(index: number, image: GradiumImage, key: keyof State) {
    try {
      this.markLoadingAtIndex(index, key);
      const TP = this.TimedDeletion(image);
      const { remainingMS } = await TP.run();
      setTimeout(() => {
        this.props.onDelete?.(image);
        this.spliceImage(image, key);
      }, remainingMS);
    } catch (error) {
      this.markErrorAtIndex(index, key);
      setTimeout(() => {
        this.markErrorAtIndex(index, key, false);
      }, 3000);
    }
  }

  private deleteGenerator(index: number) {
    if (!this.props.onDelete) {
      return;
    }
    return () => {
      const { uploading } = this.state;
      if (uploading[index].savedImage) {
        void this.onDelete(index, uploading[index].savedImage, "uploading");
      }
    };
  }

  private deleteInitialGenerator(index: number) {
    if (!this.props.onDelete) {
      return;
    }
    return () => {
      const { initialImages } = this.state;
      if (initialImages[index].savedImage) {
        void this.onDelete(
          index,
          initialImages[index].savedImage,
          "initialImages",
        );
      }
    };
  }

  private markErrorAtIndex(index: number, key: keyof State, error = true) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: false, error } : state,
      ),
    }));
  }

  private markLoadingAtIndex(index: number, key: keyof State) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: true } : state,
      ),
    }));
  }

  private spliceImage<K extends keyof State>(image: GradiumImage, key: K) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].filter((img, i) => {
        if (img.savedImage?.id !== image.id) {
          return true;
        }
        if (key === "uploading") {
          this.Controller.decrementAll(i);
        }
        return false;
      }),
    }));
  }

  private renderNode(child: ReactNode, index: number) {
    const { renderItem } = this.props;
    if (renderItem) {
      return renderItem(child, index);
    }
    return child;
  }

  private deleteImageExternal(image: GradiumImage) {
    this.spliceImage(image, "uploading");
    this.spliceImage(image, "initialImages");
  }

  private getMinUploaders(totalLength: number, min?: number) {
    let length = 0;
    if (min === undefined) {
      length = 1;
    } else {
      length = totalLength % min === 0 ? min : Math.max(1, min - totalLength);
    }
    return new Array(length).fill(null);
  }

  public override render() {
    const { uploading, initialImages } = this.state;
    const { className = "", min } = this.props;
    const { length } = initialImages;
    const totalLength = length + uploading.length;
    const fill = this.getMinUploaders(totalLength, min);
    return (
      <div className={`upload-grid ${className}`}>
        {initialImages.map((image, index) =>
          this.renderNode(
            <ImageUploader
              {...image}
              key={image.savedImage.id}
              url={image.savedImage.url}
              onDelete={this.deleteInitialGenerator(index)}
            />,
            index,
          ),
        )}
        {uploading.map((state, index) =>
          this.renderNode(
            <ImageUploader
              key={index}
              {...state}
              onChange={this.onChange}
              onDelete={this.deleteGenerator(index)}
            />,
            index + length,
          ),
        )}
        {fill.map((_, i) => (
          <ImageUploader key={i} onChange={this.onChange} />
        ))}
      </div>
    );
  }
}

interface State {
  uploading: ImageState[];
  initialImages: CachedImage[];
}

interface Props {
  min?: number;
  entityId: number;
  className?: string;
  images: GradiumImage[];
  imageType: GradiumImageType;
  onUpload: GradiumImageCallback;
  onDelete?: GradiumImageCallback;
  renderItem?: Callback<[ReactNode, number], ReactNode>;
  deleteImage?: MutableRefObject<GradiumImageCallback | undefined>;
}

interface CachedImage extends Omit<ImageState, "savedImage"> {
  savedImage: GradiumImage;
}
