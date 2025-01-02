import type { ReactNode } from "react";
import { Fragment, memo } from "react";
import type { GradiumImage } from "GraphQL/Types";
import { useMinVisible } from "Hooks/useMinVisible";

export const AttachmentGrid = memo(function AttachmentGrid({
  minVisible,
  images,
  renderItem,
}: Props) {
  const visibleCells = useMinVisible(images.length, minVisible);
  return <Fragment>{visibleCells.map(renderItem)}</Fragment>;
});

interface Props {
  minVisible: number;
  images: GradiumImage[];
  renderItem: (item: undefined, index: number, list: undefined[]) => ReactNode;
}
