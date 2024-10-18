import { ImageFader } from "Components/CloudinaryImageInterface/ImageFader";
import { ImagePlaceholder } from "Components/ImagePlaceholder";
import type { IImage } from "Components/ImageSlider";
import { type GradiumImage } from "GraphQL/Types";

export class Controller {
  public static getFill(width: number, length: number) {
    if (width < 670 && length < 2) {
      return 2 - length;
    }
    if (width > 670 && width < 1400 && length < 3) {
      return 3 - length;
    }
    if (width > 1400 && length < 6) {
      return 6 - length;
    }
    return 0;
  }

  public static fillGrid(width: number, length: number) {
    const N = this.getFill(width, length);
    return Array.from({ length: N }, () => "");
  }

  public static fillCarousel(width: number, length: number): IImage[] {
    const N = this.getFill(width, length);
    return Array.from({ length: N }, () => ({
      type: "child",
      content: <ImagePlaceholder />,
    }));
  }

  public static toRenderableList(list: GradiumImage[]): IImage[] {
    return list.map(image => ({
      type: "child",
      content: (
        <div>
          <ImageFader image={image.url} />
        </div>
      ),
    }));
  }
}
