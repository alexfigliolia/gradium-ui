import { useEffect, useRef } from "react";
import type { IDragDetectorOptions } from "Tools/DragDetector";
import { DragDetector } from "Tools/DragDetector";

export const useDragDetector = <T extends Element>(
  options: IDragDetectorOptions<T>,
): DragDetector<T> => {
  const detector = useRef(new DragDetector<T>(options));

  useEffect(() => {
    const { current: DD } = detector;
    DD.setOptions(options);
    return () => {
      DD.destroy();
    };
  }, [options]);

  return detector.current;
};
