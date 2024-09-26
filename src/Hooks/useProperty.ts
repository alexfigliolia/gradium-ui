import { useCallback } from "react";
import type { IProperties } from "Models/Properties";
import { useProperties } from "State/Properties";

export const useProperty = (slug: string) => {
  const matcher = useCallback(
    (state: IProperties) => {
      for (const key in state.properties) {
        if (slug === state.properties[key].slug) {
          return state.properties[key];
        }
      }
      throw new Error("not found");
    },
    [slug],
  );
  return useProperties(matcher);
};