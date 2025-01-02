import { useMemo } from "react";

export const useMinVisible = (length: number, min: number) => {
  return useMemo(() => {
    if (length < min) {
      return new Array<undefined>(min).fill(undefined);
    }
    return new Array<undefined>(length + 1).fill(undefined);
  }, [length, min]);
};
