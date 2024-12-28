import { LinkedList } from "@figliolia/data-structures";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";
import type { IConfigurableSpace } from "Types/Gradium";
import { HashedListModel } from "./HashedListModel";

export abstract class ConfigurableSpaceModel<
  T extends IConfigurableSpace = IConfigurableSpace,
> extends HashedListModel<T> {
  public abstract readonly IMAGE_TYPE: GradiumImageType;
  public abstract readonly FLOOR_PLAN_TYPE: GradiumImageType;
  constructor(name: string) {
    super(name, true);
  }

  protected abstract saveSpace(
    space: T | Omit<T, "id" | "dummy"> | Omit<T, "dummy">,
    setState?: ILoadingStateSetter,
  ): Promise<T>;

  protected abstract fetchSpaces(): Promise<T[]>;

  protected abstract deleteTransaction(
    id: number,
    setState: ILoadingStateSetter,
    callback: Callback,
  ): Promise<T>;

  public async fetch() {
    let list: T[] = [];
    try {
      list = await this.fetchSpaces();
      this.hashList(list);
    } catch (error) {
      const name = Properties.getCurrent("name");
      Toasts.error(
        `Something went wrong while fetching the ${this.name} for <strong>${name}</strong>. Please refresh the page or contact support`,
      );
    }
    this.loading(false);
    return list;
  }

  public async save(id: number, setState?: ILoadingStateSetter) {
    const item = this.getState().list[id];
    const { id: _1, dummy: _2, ...rest } = item;
    const { dummy: _, ...space } = item;
    const saved = await this.saveSpace(
      this.isClient(item) ? rest : space,
      setState,
    );
    this.updateByIdentifier(saved.id, saved);
    if (saved.id !== item.id) {
      this.delete(item.id);
    }
  }

  public saveBeforeUnmount(id: number) {
    return this.save(id);
  }

  public async deleteItem(
    id: number,
    setState: ILoadingStateSetter,
    callback: Callback,
  ) {
    if (this.isClient(this.getById(id))) {
      this.delete(id);
      return callback?.();
    }
    const item = await this.deleteTransaction(id, setState, callback);
    this.delete(item.id);
  }

  public dispatchImage(
    id: number,
    type: GradiumImageType,
    ...newImages: GradiumImage[]
  ) {
    const { images, floorPlans } = this.getById(id);
    if (type === this.FLOOR_PLAN_TYPE) {
      this.updateListItem(
        id,
        "floorPlans",
        this.fillImages(floorPlans, ...newImages),
      );
    } else if (type === this.IMAGE_TYPE) {
      this.updateListItem(id, "images", this.fillImages(images, ...newImages));
    }
  }

  public dispatchTemporaryURL(
    id: number,
    type: GradiumImageType,
    ...URLS: string[]
  ) {
    this.dispatchImage(
      id,
      type,
      ...URLS.map(url => ({ id: this.IDs.get(), url })),
    );
  }

  public deleteImage(
    id: number,
    type: GradiumImageType,
    deletion: GradiumImage,
  ) {
    const { images, floorPlans } = this.getById(id);
    if (type === this.FLOOR_PLAN_TYPE) {
      this.updateListItem(
        id,
        "floorPlans",
        floorPlans.filter(img => img.id !== deletion.id),
      );
    } else if (type === this.IMAGE_TYPE) {
      this.updateListItem(
        id,
        "images",
        images.filter(img => img.id !== deletion.id),
      );
    }
  }

  public fillImages(images: GradiumImage[], ...newImages: GradiumImage[]) {
    const { length } = newImages;
    if (!length) {
      return images;
    }
    const list = this.toLinkedList(newImages);
    if (length === 1 && this.isClient(list.peekLeft())) {
      return [...images, ...newImages];
    }
    const copy = [...images];
    const { length: N } = copy;
    for (let i = 0; i < N && list.size; i++) {
      if (this.isClient(copy[i]) && !this.isClient(list.peekLeft())) {
        copy[i] = list.shift()!;
      }
    }
    for (const item of list) {
      copy.push(item);
    }
    return copy;
  }

  public isClient<D extends { id: number; dummy?: true }>(data?: D) {
    return data?.dummy === true || (data?.id ?? 0) < 0;
  }

  private toLinkedList(images: GradiumImage[]) {
    const LL = new LinkedList<GradiumImage>();
    for (const image of images) {
      LL.push(image);
    }
    return LL;
  }
}
