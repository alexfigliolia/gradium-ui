import { useMemo } from "react";
import type { PropertyAddonType } from "GraphQL/Types";
import { currentAddons, useProperties } from "State/Properties";

export const usePropertyAccess = (...requirements: PropertyAddonType[]) => {
  const addons = useProperties(currentAddons);
  return useMemo(
    () => requirements.every(a => addons.has(a)),
    [addons, requirements],
  );
};
