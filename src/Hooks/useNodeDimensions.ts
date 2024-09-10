import type { RefObject } from "react";
import { useMemo, useState } from "react";
import type { IScreen } from "@figliolia/galena-window";
import type { Options } from "@figliolia/size-observer";
import { useSizeObserver } from "@figliolia/size-observer";

export const useNodeDimensions = <T extends HTMLElement>(): [
  ref: RefObject<T>,
  dimensions: IScreen | undefined,
] => {
  const [dimensions, onChange] = useState<IScreen | undefined>(undefined);
  const options: Options = useMemo(
    () => ({
      onChange,
      width: true,
      height: true,
      type: "border-box",
    }),
    [],
  );
  const node = useSizeObserver<T>(options);
  return [node, dimensions];
};
