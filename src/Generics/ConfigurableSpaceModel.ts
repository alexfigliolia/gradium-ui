import { LinkedList } from "@figliolia/data-structures";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import type { IConfigurableSpace } from "Types/Gradium";
import { HashedListModel } from "./HashedListModel";

export abstract class ConfigurableSpaceModel<
  T extends IConfigurableSpace = IConfigurableSpace,
> extends HashedListModel<T> {
  public abstract readonly IMAGE_TYPE: GradiumImageType;
  public abstract readonly FLOOR_PLAN_TYPE: GradiumImageType;

  public abstract fetch(): Promise<void>;

  public abstract save(...args: any[]): Promise<void>;

  public abstract saveBeforeUnmount(...args: any[]): Promise<void>;

  public abstract deleteItem(...args: any[]): Promise<void>;

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
}
