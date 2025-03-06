import { useMemo } from "react";
import type { GradiumImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import "./styles.scss";

export const SpacePhotos = ({ images }: Props) => {
  const photos = useMemo(() => {
    const p: (GradiumImage | null)[] = [];
    const K = 5;
    const N = Math.min(K, images.length);
    for (let i = 0; i < N; i++) {
      p.push(images[i]);
    }
    if (N === 0) {
      p.push(null);
    }
    return p;
  }, [images]);

  return (
    <div className="space-photos">
      {photos.map((img, i) => (
        <div key={i}>
          {img ? <img src={img.url} alt="property" /> : <ImagePlaceholder />}
        </div>
      ))}
    </div>
  );
};

interface Props {
  images: GradiumImage[];
}
