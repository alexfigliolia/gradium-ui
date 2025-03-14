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
import { CSFContext } from "../Context";

export const Image = memo(function Image({ type, image }: Props) {
  const loading = useRef(false);
  const controller = useRef<Controller>(null);
  const {
    model,
    editing,
    item: { id },
  } = useContext(CSFContext);

  const isClient = useMemo(() => model.isClient(image), [model, image]);

  useLayoutEffect(() => {
    if (!controller.current) {
      return;
    }
    if (isClient) {
      loading.current = true;
      controller.current.activateLoader();
      controller.current.setTemporaryImage(image?.url ?? null);
    } else if (loading.current) {
      controller.current.preloadImage(image?.url ?? "");
      loading.current = false;
    }
  }, [isClient, image?.url]);

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
      image={isClient ? undefined : image}
    />
  );
});

interface Props {
  image?: GradiumImage;
  type: GradiumImageType;
}
