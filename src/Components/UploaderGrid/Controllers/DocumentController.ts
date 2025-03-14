import type { GradiumDocument } from "GraphQL/Types";
import { Controller } from "./Controller";

export class DocumentController extends Controller<GradiumDocument> {
  createItem(id: number, file: File) {
    const url = URL.createObjectURL(
      new Blob([file], { type: "application/pdf" }),
    );
    return {
      url,
      file,
      loading: true,
      savedDocument: {
        id,
        url,
        thumbnail: "",
      },
    };
  }
}
