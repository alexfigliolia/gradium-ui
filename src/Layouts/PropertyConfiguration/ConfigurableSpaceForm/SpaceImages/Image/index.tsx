import {
  memo,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { Controller } from "Components/CloudinaryImageInterface";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { CSFContext } from "../../Context";
import "./styles.scss";

export const Image = memo(function Image({ type, image }: Props) {
  const loading = useRef(false);
  const controller = useRef<Controller>(null);
  const {
    item: { id },
    editing,
    model,
  } = useContext(CSFContext);

  const isPlaceholder = useMemo(() => (image?.id ?? 0) < 0, [image?.id]);

  useLayoutEffect(() => {
    if (!controller.current) {
      return;
    }
    if (isPlaceholder) {
      loading.current = true;
      controller.current.activateLoader();
      controller.current.setTemporaryImage(image?.url ?? null);
    } else if (loading.current) {
      controller.current.onLoad();
    }
  }, [isPlaceholder, image?.url]);

  const onDelete = useCallback(
    (img?: GradiumImage) => {
      if (img) {
        model.deleteImage(id, type, img);
      }
    },
    [id, type, model],
  );

  return (
    <CloudinaryImageInterface
      type={type}
      entityId={id}
      ref={controller}
      disabled={!editing}
      onDelete={onDelete}
      image={isPlaceholder ? undefined : image}
    />
  );
});

interface Props {
  image?: GradiumImage;
  type: GradiumImageType;
}
