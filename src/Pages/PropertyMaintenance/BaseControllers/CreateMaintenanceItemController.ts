import { type ILoadingStateSetter, Timeout } from "@figliolia/react-hooks";
import type { RefObject } from "@fullcalendar/core/preact.js";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { Toasts } from "State/Toasts";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import type { MaintenanceItemViewerController } from "./MaintenanceItemViewerController";

export abstract class CreateMaintentanceItemController<
  State extends Record<string, any>,
  Data extends Record<string, any>,
  InputController extends MaintenanceItemViewerController<any, any, any>,
> {
  private readonly close: Callback;
  public data: null | State = null;
  public readonly resetState: Callback;
  private readonly onSave: OnSaveCB<Data>;
  private readonly timeout = new Timeout();
  public abstract imageType: GradiumImageType;
  public readonly setState: ILoadingStateSetter;
  protected readonly inputs: RefObject<InputController>;
  constructor({
    close,
    inputs,
    onSave,
    setState,
    resetState,
  }: Config<Data, InputController>) {
    this.close = close;
    this.onSave = onSave;
    this.inputs = inputs;
    this.setState = setState;
    this.resetState = resetState;
  }

  public cacheData = (data: State) => {
    this.data = data;
  };

  public async create(files: File[]) {
    this.setState("loading", true);
    const { resolve, reject, promise } = Promise.withResolvers<void>();
    if (!this.inputs.current || !this.data) {
      this.errorAndTimedReset(reject);
      if (!this.data) {
        Toasts.error("Please fill out all required fields");
      }
      return promise;
    }
    const savedItem = await this.saveData(this.inputs.current.toGQL(this.data));
    if (!savedItem) {
      this.errorAndTimedReset(reject);
      return promise;
    }
    const attachments = await this.uploadAttachments(savedItem.id, files);
    this.onSave([savedItem, attachments]);
    this.setState("success", true);
    this.timeout.execute(() => {
      this.close();
      this.timeout.execute(() => {
        this.resetState();
        this.inputs?.current?.clearForm?.();
        resolve();
      }, 500);
    }, 2000);
    return promise;
  }

  public abstract saveData(
    expense: ReturnType<InputController["toGQL"]>,
  ): Promise<Data | void>;

  private async uploadAttachments(id: number, files: File[]) {
    const attachments = await CloudinaryUploader.uploadBatch(
      {
        entityId: id,
        type: this.imageType,
      },
      ...files,
    );
    const uploads: GradiumImage[] = [];
    for (const attachment of attachments) {
      if (attachment.status === "fulfilled" && attachment.value) {
        uploads.push(attachment.value);
      }
    }
    return uploads;
  }

  private errorAndTimedReset(cb?: Callback) {
    this.setState("error", true);
    this.timeout.execute(() => {
      this.resetState();
      cb?.();
    }, 2000);
  }
}

interface Config<
  Data extends Record<string, any>,
  InputController extends MaintenanceItemViewerController<any, any, any>,
> {
  close: Callback;
  resetState: Callback;
  onSave: OnSaveCB<Data>;
  setState: ILoadingStateSetter;
  inputs: RefObject<InputController>;
}

export type OnSaveCB<Data extends Record<string, any>> = Callback<
  [[Data, GradiumImage[]]]
>;
