import { useMemo } from "react";

export const useMinVisible = (length: number, min: number) => {
  return useMemo(() => {
    if (length < min) {
      return new Array(min).fill(undefined);
    }
    return new Array(length + 1).fill(undefined);
  }, [length, min]);
};
