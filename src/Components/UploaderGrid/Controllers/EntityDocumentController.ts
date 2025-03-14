import { TimedPromise } from "@figliolia/promises";
import type { GradiumDocument, GradiumDocumentType } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { EntityController } from "./EntityController";

export class EntityDocumentController extends EntityController<GradiumDocument> {
  public TimedDeletion(
    file: GradiumDocument,
    entityId: number,
    type: GradiumDocumentType,
  ) {
    return new TimedPromise(
      () => CloudinaryDeleter.deleteDocument(file, { entityId, type: type }),
      1500,
    );
  }
}
