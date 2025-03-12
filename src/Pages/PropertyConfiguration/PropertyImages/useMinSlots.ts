import { useMemo } from "react";
import { selectWidth, useScreen } from "State/Screen";

export const useMinSlots = () => {
  const width = useScreen(selectWidth);
  return useMemo(() => {
    if (width < 550) {
      return 2;
    }
    if (width < 1200) {
      return 3;
    }
    if (width < 1400) {
      return 4;
    }
    if (width < 1550) {
      return 5;
    }
    return 6;
  }, [width]);
};
