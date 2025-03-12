import type { ChangeEvent, ReactNode, RefObject } from "react";
import { Component } from "react";
import { TimedPromise } from "@figliolia/promises";
import type {
  GradiumDocument,
  GradiumDocumentType,
  GradiumImage,
  GradiumImageType,
} from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { UploadInterface } from "Tools/UploadInterface";
import type { GradiumAsset, GradiumUploadCallback } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import { FileUploader } from "./FileUploader";
import type { IUploaderState } from "./useUploader";
import "./styles.scss";

export class EntityUploader<T extends "image" | "document"> extends Component<
  Props<T>,
  State<T>
> {
  public state: State<T>;
  private readonly Controller = new Controller();
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      uploading: [],
      initialFiles: this.initialize(this.props.files),
    };
    const { deleteFile, uploadFile } = this.props;
    if (deleteFile) {
      deleteFile.current = (file: GradiumImage | GradiumDocument) =>
        this.deleteFileExternal(file);
    }
    if (uploadFile) {
      uploadFile.current = this.onChange;
    }
  }

  private initialize(files: (GradiumImage | GradiumDocument)[]) {
    return files.map(file => ({ savedDocument: file, type: this.props.type }));
  }

  public override UNSAFE_componentWillReceiveProps({
    files,
    entityId,
  }: Props<T>) {
    if (entityId !== this.props.entityId) {
      this.setState({
        uploading: [],
        initialFiles: this.initialize(files),
      });
    }
  }

  public override shouldComponentUpdate(
    { min, className, renderItem }: Props<T>,
    state: State<T>,
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
          type: this.props.type,
          url: URL.createObjectURL(file),
        })),
      ],
    }));
  };

  private readonly onSuccess = (ID: string) => {
    return (_: File, document: GradiumAsset<T>, index: number) => {
      const startIndex = this.Controller.get(ID);
      this.setState(ps => ({
        uploading: ps.uploading.map((state, i) =>
          i === index + startIndex
            ? { ...state, loading: false, savedDocument: document }
            : state,
        ),
      }));
      this.props.onUpload(document);
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
    const { fileType, entityId, type } = this.props;
    const ID = this.Controller.cache(this.state.uploading.length);
    const uploader = new UploadInterface<T>({
      type,
      onSuccess: this.onSuccess(ID),
      onValidFiles: this.onValidFiles,
      onError: (_, index) =>
        this.markErrorAtIndex(this.Controller.get(ID) + index, "uploading"),
    });
    try {
      if (this.isImageType(fileType)) {
        await uploader.onUploadImage(e, { entityId, type: fileType });
      } else {
        await uploader.onUploadDocument(e, { entityId, type: fileType });
      }
      e.target.value = "";
    } catch (error) {
      // silence
    }
    this.Controller.delete(ID);
  }

  private TimedDeletion(file: GradiumImage | GradiumDocument) {
    const { entityId, fileType } = this.props;
    if (this.isImageFile(file) && this.isImageType(fileType)) {
      return new TimedPromise(
        () => CloudinaryDeleter.deleteImage(file, { entityId, type: fileType }),
        1500,
      );
    }
    if (this.isDocumentFile(file) && this.isDocumentType(fileType)) {
      return new TimedPromise(
        () =>
          CloudinaryDeleter.deleteDocument(file, { entityId, type: fileType }),
        1500,
      );
    }
  }

  private isImageFile(
    file: GradiumImage | GradiumDocument,
  ): file is GradiumImage {
    return this.props.type === "image" && !!file;
  }

  private isImageType(
    type: GradiumImageType | GradiumDocumentType,
  ): type is GradiumImageType {
    return this.props.type === "image" && !!type;
  }

  private isDocumentFile(
    file: GradiumImage | GradiumDocument,
  ): file is GradiumDocument {
    return this.props.type === "document" && !!file;
  }

  private isDocumentType(
    type: GradiumImageType | GradiumDocumentType,
  ): type is GradiumDocumentType {
    return this.props.type === "document" && !!type;
  }

  private async onDelete(
    index: number,
    file: GradiumImage | GradiumDocument,
    key: keyof State<T>,
  ) {
    try {
      this.markLoadingAtIndex(index, key);
      const TP = this.TimedDeletion(file);
      if (!TP) {
        throw new Error("Internal type validation failure");
      }
      const { remainingMS } = await TP.run();
      setTimeout(() => {
        // @ts-ignore
        this.props.onDelete?.(file);
        this.spliceFile(file, key);
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
      if (uploading[index].savedDocument) {
        void this.onDelete(index, uploading[index].savedDocument, "uploading");
      }
    };
  }

  private deleteInitialGenerator(index: number) {
    if (!this.props.onDelete) {
      return;
    }
    return () => {
      const { initialFiles } = this.state;
      if (initialFiles[index].savedDocument) {
        void this.onDelete(
          index,
          initialFiles[index].savedDocument,
          "initialFiles",
        );
      }
    };
  }

  private markErrorAtIndex(index: number, key: keyof State<T>, error = true) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: false, error } : state,
      ),
    }));
  }

  private markLoadingAtIndex(index: number, key: keyof State<T>) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: true } : state,
      ),
    }));
  }

  private spliceFile<K extends keyof State<T>>(
    file: GradiumImage | GradiumDocument,
    key: K,
  ) {
    this.setState(ps => ({
      ...ps,
      [key]: ps[key].filter((img, i) => {
        if (img.savedDocument?.id !== file.id) {
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

  private deleteFileExternal(file: GradiumImage | GradiumDocument) {
    this.spliceFile(file, "uploading");
    this.spliceFile(file, "initialFiles");
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
    const { uploading, initialFiles } = this.state;
    const { className = "", min, type } = this.props;
    const { length } = initialFiles;
    const totalLength = length + uploading.length;
    const fill = this.getMinUploaders(totalLength, min);
    return (
      <div className={`upload-grid ${className}`}>
        {initialFiles.map((image, index) =>
          this.renderNode(
            <FileUploader
              {...image}
              key={image.savedDocument.id}
              url={image.savedDocument.url}
              onDelete={this.deleteInitialGenerator(index)}
            />,
            index,
          ),
        )}
        {uploading.map((state, index) =>
          this.renderNode(
            <FileUploader
              key={index}
              {...state}
              onChange={this.onChange}
              onDelete={this.deleteGenerator(index)}
            />,
            index + length,
          ),
        )}
        {fill.map((_, i) => (
          <FileUploader key={i} type={type} onChange={this.onChange} />
        ))}
      </div>
    );
  }
}

interface State<T extends "image" | "document"> {
  uploading: IUploaderState<T>[];
  initialFiles: CachedImage<T>[];
}

interface Props<T extends "image" | "document"> {
  type: T;
  min?: number;
  entityId: number;
  className?: string;
  files: (GradiumImage | GradiumDocument)[];
  onUpload: GradiumUploadCallback<T>;
  onDelete?: GradiumUploadCallback<T>;
  deleteFile?: RefObject<GradiumUploadCallback<T>>;
  renderItem?: Callback<[ReactNode, number], ReactNode>;
  uploadFile?: RefObject<Callback<[ChangeEvent<HTMLInputElement>]>>;
  fileType: T extends "image" ? GradiumImageType : GradiumDocumentType;
}

interface CachedImage<T extends "image" | "document">
  extends Omit<IUploaderState<T>, "savedDocument"> {
  savedDocument: GradiumImage | GradiumDocument;
}
