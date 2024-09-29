import type { RefObject } from "react";
import { useMemo, useState } from "react";
import {
  type Dimensions,
  type Options,
  useSizeObserver,
} from "@figliolia/size-observer";

export const useNodeHeight = <T extends HTMLElement>(): [
  RefObject<T>,
  number | undefined,
] => {
  const [height, setHeight] = useState<number>();
  const options: Options = useMemo(
    () => ({
      height: true,
      type: "border-box",
      onChange: ({ height }: Dimensions) => {
        setHeight(height);
      },
    }),
    [],
  );
  const node = useSizeObserver<T>(options);
  return [node, height];
};
