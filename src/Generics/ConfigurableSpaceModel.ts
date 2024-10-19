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

  protected abstract saveSpace(
    space: T | Omit<T, "id">,
    setState: ILoadingStateSetter,
  ): Promise<T>;

  protected abstract fetchSpaces(): Promise<T[]>;

  protected abstract saveSilent(space: T | Omit<T, "id">): Promise<T>;

  protected abstract deleteTransaction(
    id: number,
    callback: Callback,
    setState: ILoadingStateSetter,
  ): Promise<T>;

  public async fetch() {
    this.loading(true);
    try {
      this.hashList(await this.fetchSpaces());
    } catch (error) {
      const name = Properties.getCurrent("name");
      Toasts.error(
        `Something went wrong while fetching the ${this.name} for <strong>${name}</strong>. Please refresh the page or contact support`,
      );
    }
    this.loading(false);
  }

  public async save(id: number, setState: ILoadingStateSetter) {
    const item = this.getState().list[id];
    const { id: identifer, ...rest } = item;
    const saved = await this.saveSpace(identifer <= 0 ? rest : item, setState);
    this.updateByIdentifier(saved.id, saved);
    if (saved.id !== item.id) {
      this.delete(item.id);
    }
  }

  public async saveBeforeUnmount(id: number) {
    const item = this.getState().list[id];
    try {
      const { id: identifier, ...rest } = item;
      const saved = await this.saveSilent(identifier <= 0 ? rest : item);
      this.updateByIdentifier(saved.id, saved);
      if (saved.id !== item.id) {
        this.delete(item.id);
      }
    } catch (error) {
      Toasts.error(
        `<strong>${item.name}</strong> did not save before leaving. Please try again`,
      );
    }
  }

  public async deleteItem(
    id: number,
    callback: Callback,
    setState: ILoadingStateSetter,
  ) {
    if (id <= 0) {
      this.delete(id);
      return callback?.();
    }
    const item = await this.deleteTransaction(id, callback, setState);
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
    if (length === 1 && (list.peekLeft()?.id ?? 0) < 0) {
      return [...images, ...newImages];
    }
    const copy = [...images];
    const { length: N } = copy;
    for (let i = 0; i < N && list.size; i++) {
      const next = list.peekLeft()?.id ?? 0;
      if (copy[i].id < 0 && next > -1) {
        copy[i] = list.shift()!;
      }
    }
    for (const item of list) {
      copy.push(item);
    }
    return copy;
  }

  private toLinkedList(images: GradiumImage[]) {
    const LL = new LinkedList<GradiumImage>();
    for (const image of images) {
      LL.push(image);
    }
    return LL;
  }

  protected getSaveError(name: string, itemDisplayName: string) {
    if (name) {
      return `<strong>${name}</strong> didn't save properly. Please check your inputs and try again.`;
    }
    return `Your ${itemDisplayName} didn't save property. Please check your inputs and try again.`;
  }
}
