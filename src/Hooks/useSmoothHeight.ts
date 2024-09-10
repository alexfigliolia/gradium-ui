import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { SizeObserver } from "@figliolia/size-observer";

export const useSmoothHeight = <T extends HTMLElement>(): [
  node: RefObject<T>,
  height: number | undefined,
] => {
  const node = useRef<T>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new SizeObserver(node.current, {
      height: true,
      onChange: ({ height }) => {
        setHeight(height);
      },
    });
    return () => {
      observer.destroy();
    };
  }, []);
  return [node, height];
};
