import type { ChangeEvent, ReactNode } from "react";
import { Component } from "react";
import type { GradiumDocument, GradiumDocumentType } from "GraphQL/Types";
import { UploadInterface } from "Tools/UploadInterface";
import { EntityDocumentController } from "./Controllers/EntityDocumentController";
import type { EntityProps, EntityState } from "./types";
import { DocumentUploader } from "./Uploaders/DocumentUploader";
import "./styles.scss";

export class EntityDocumentUploader extends Component<Props, State> {
  public state: State;
  private readonly Controller = new EntityDocumentController();
  constructor(props: Props) {
    super(props);
    this.state = {
      uploading: [],
      initialFiles: this.Controller.initialize(this.props.files),
    };
    const { deleteFile, uploadFile } = this.props;
    if (deleteFile) {
      deleteFile.current = (file: GradiumDocument) =>
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
          type: this.props.type,
          url: URL.createObjectURL(file),
        })),
      ],
    }));
  };

  private readonly onSuccess = (ID: string) => {
    return (_: File, document: GradiumDocument, index: number) => {
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
      type: "document",
      onSuccess: this.onSuccess(ID),
      onValidFiles: this.onValidFiles,
      onError: (_, index) =>
        this.markErrorAtIndex(this.Controller.get(ID) + index, "uploading"),
    });
    try {
      await uploader.onUploadDocument(e, { entityId, type: type });
      e.target.value = "";
    } catch (error) {
      // silence
    }
    this.Controller.delete(ID);
  }

  private async onDelete(
    index: number,
    file: GradiumDocument,
    key: keyof State,
  ) {
    try {
      const { entityId, type } = this.props;
      this.markLoadingAtIndex(index, key);
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

  private markErrorAtIndex(index: number, key: keyof State, error = true) {
    this.setState(ps =>
      this.Controller.markErrorAtIndex(ps, index, key, error),
    );
  }

  private markLoadingAtIndex(index: number, key: keyof State) {
    this.setState(ps => this.Controller.markLoadingAtIndex(ps, index, key));
  }

  private spliceFile<K extends keyof State>(file: GradiumDocument, key: K) {
    this.setState(ps => this.Controller.spliceFile(ps, file, key));
  }

  private renderNode(child: ReactNode, index: number) {
    const { renderItem } = this.props;
    if (renderItem) {
      return renderItem(child, index);
    }
    return child;
  }

  private deleteFileExternal(file: GradiumDocument) {
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
            <DocumentUploader
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
            <DocumentUploader
              key={index}
              {...state}
              onChange={this.onChange}
              onDelete={this.deleteGenerator(index)}
            />,
            index + length,
          ),
        )}
        {fill.map((_, i) => (
          <DocumentUploader key={i} onChange={this.onChange} />
        ))}
      </div>
    );
  }
}

export type State = EntityState<GradiumDocument>;

interface Props extends EntityProps<GradiumDocument> {
  type: GradiumDocumentType;
}
