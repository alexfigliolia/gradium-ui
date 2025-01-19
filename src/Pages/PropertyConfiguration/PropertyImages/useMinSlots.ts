import { useMemo } from "react";
import { selectWidth, useScreen } from "State/Screen";

export const useMinSlots = () => {
  const width = useScreen(selectWidth);
  return useMemo(() => {
    if (width > 1500) {
      return 8;
    }
    if (width > 1300) {
      return 6;
    }
    if (width > 670) {
      return 4;
    }
    if (width > 550) {
      return 3;
    }
    return 2;
  }, [width]);
};
