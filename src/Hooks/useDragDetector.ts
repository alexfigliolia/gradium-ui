import { useEffect, useRef } from "react";
import type { IDragDetectorOptions } from "Tools/DragDetector";
import { DragDetector } from "Tools/DragDetector";

export const useDragDetector = <T extends Element>(
  options: IDragDetectorOptions,
): DragDetector<T> => {
  const detector = useRef(new DragDetector<T>(options));

  useEffect(() => {
    const DD = new DragDetector<T>(options);
    detector.current = DD;
    return () => {
      DD.destroy();
    };
  }, [options]);

  return detector.current;
};
