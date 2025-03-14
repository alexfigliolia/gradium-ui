import { Controller } from "./Controller";

export class ImageController extends Controller {
  createItem(id: number, file: File) {
    const url = URL.createObjectURL(file);
    return {
      url,
      file,
      loading: true,
      savedDocument: {
        id,
        url,
      },
    };
  }
}
