import { useMemo } from "react";
import { currentProperty, useProperties } from "State/Properties";

export const usePropertyAddons = () => {
  const { addons } = useProperties(currentProperty);
  return useMemo(() => new Set(addons.map(a => a.type)), [addons]);
};
