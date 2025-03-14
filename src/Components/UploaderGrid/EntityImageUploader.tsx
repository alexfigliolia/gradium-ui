import type { ChangeEvent, ReactNode } from "react";
import { Component } from "react";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { UploadInterface } from "Tools/UploadInterface";
import { EntityImageController } from "./Controllers/EntityImageController";
import type { EntityProps, EntityState } from "./types";
import { ImageUploader } from "./Uploaders/ImageUploader";
import "./styles.scss";

export class EntityImageUploader extends Component<Props, EntityState> {
  public state: EntityState;
  private readonly Controller = new EntityImageController();
  constructor(props: Props) {
    super(props);
    this.state = {
      uploading: [],
      initialFiles: this.Controller.initialize(this.props.files),
    };
    const { deleteFile, uploadFile } = this.props;
    if (deleteFile) {
      deleteFile.current = (file: GradiumImage) =>
        this.deleteFileExternal(file);
    }
    if (uploadFile) {
      uploadFile.current = this.onChange;
    }
  }

  public override UNSAFE_componentWillReceiveProps({ files, entityId }: Props) {
    if (entityId !== this.props.entityId) {
      this.setState(this.Controller.resetFromFiles(files));
    }
  }

  public override shouldComponentUpdate(
    { min, className, renderItem }: Props,
    state: EntityState,
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
    return (_: File, document: GradiumImage, index: number) => {
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
    const { entityId, type } = this.props;
    const ID = this.Controller.cache(this.state.uploading.length);
    const uploader = new UploadInterface({
      type: "image",
      onSuccess: this.onSuccess(ID),
      onValidFiles: this.onValidFiles,
      onError: (_, index) =>
        this.markErrorAtIndex(this.Controller.get(ID) + index, "uploading"),
    });
    try {
      await uploader.onUploadImage(e, { entityId, type: type });
      e.target.value = "";
    } catch (error) {
      // silence
    }
    this.Controller.delete(ID);
  }

  private async onDelete(
    index: number,
    file: GradiumImage,
    key: keyof EntityState,
  ) {
    try {
      this.markLoadingAtIndex(index, key);
      const { entityId, type } = this.props;
      const TP = this.Controller.TimedDeletion(file, entityId, type);
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

  private markErrorAtIndex(
    index: number,
    key: keyof EntityState,
    error = true,
  ) {
    this.setState(ps =>
      this.Controller.markErrorAtIndex(ps, index, key, error),
    );
  }

  private markLoadingAtIndex(index: number, key: keyof EntityState) {
    this.setState(ps => this.Controller.markLoadingAtIndex(ps, index, key));
  }

  private spliceFile<K extends keyof EntityState>(file: GradiumImage, key: K) {
    this.setState(ps => this.Controller.spliceFile(ps, file, key));
  }

  private renderNode(child: ReactNode, index: number) {
    const { renderItem } = this.props;
    if (renderItem) {
      return renderItem(child, index);
    }
    return child;
  }

  private deleteFileExternal(file: GradiumImage) {
    this.spliceFile(file, "uploading");
    this.spliceFile(file, "initialFiles");
  }

  public override render() {
    const { uploading, initialFiles } = this.state;
    const { className = "", min } = this.props;
    const { length } = initialFiles;
    const totalLength = length + uploading.length;
    const fill = this.Controller.getMinUploaders(totalLength, min);
    return (
      <div className={`upload-grid ${className}`}>
        {initialFiles.map((image, index) =>
          this.renderNode(
            <ImageUploader
              {...image}
              key={image?.savedDocument?.id ?? index}
              url={image?.savedDocument?.url}
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

interface Props extends EntityProps {
  type: GradiumImageType;
}
