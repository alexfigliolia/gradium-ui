import { useEffect } from "react";
import { useController, useUnmount } from "@figliolia/react-hooks";
import { Throttler } from "Generics/Throttler";
import type { Callback } from "Types/Generics";

export const useThrottler = <T extends Callback<any[], any>>(
  callback: T,
  wait: number,
) => {
  const throttler = useController(new Throttler(callback, wait));

  useEffect(() => {
    throttler.update(callback, wait);
  }, [throttler, callback, wait]);

  useUnmount(() => {
    throttler.clear();
  });

  return throttler;
};
