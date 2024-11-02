import { useCallback, useState } from "react";
import type { Callback } from "Types/Generics";

export const useEnabledClickOutside = (
  defaultState = true,
): [boolean, Callback, Callback] => {
  const [enabled, setEnabled] = useState(defaultState);
  const disable = useCallback(() => {
    setEnabled(false);
  }, []);
  const enable = useCallback(() => {
    setEnabled(true);
  }, []);
  return [enabled, enable, disable];
};
