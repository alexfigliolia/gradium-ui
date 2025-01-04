import { useMemo } from "react";
import { useClickOutside } from "@figliolia/react-hooks";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";

export const useMousePointerOutside = <T extends HTMLElement>(
  isOpen: boolean,
  closeFN: Callback,
) => {
  const options = useMemo(
    () => ({
      open: isOpen,
      callback: () => {
        if (!Devices.IS_MOBILE_BROWSER) {
          closeFN();
        }
      },
    }),
    [isOpen, closeFN],
  );
  const node = useClickOutside<T, false>(options);
  return node;
};
