import { useMemo } from "react";
import type { PropertyAddonType } from "GraphQL/Types";
import { usePropertyAddons } from "./usePropertyAddons";

export const usePropertyAccess = (...requirements: PropertyAddonType[]) => {
  const addons = usePropertyAddons();
  return useMemo(
    () => requirements.every(a => addons.has(a)),
    [addons, requirements],
  );
};
