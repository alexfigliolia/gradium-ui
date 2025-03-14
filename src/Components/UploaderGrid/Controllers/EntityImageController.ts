import { TimedPromise } from "@figliolia/promises";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { EntityController } from "./EntityController";

export class EntityImageController extends EntityController {
  public TimedDeletion(
    file: GradiumImage,
    entityId: number,
    type: GradiumImageType,
  ) {
    return new TimedPromise(
      () => CloudinaryDeleter.deleteImage(file, { entityId, type: type }),
      1500,
    );
  }
}
