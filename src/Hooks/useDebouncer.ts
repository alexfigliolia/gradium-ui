import { useEffect } from "react";
import { useController, useUnmount } from "@figliolia/react-hooks";
import { Debouncer } from "Generics/Debouncer";
import type { Callback } from "Types/Generics";

export const useDebouncer = <T extends Callback<any[], any>>(
  callback: T,
  wait: number,
) => {
  const debouncer = useController(new Debouncer(callback, wait));

  useEffect(() => {
    debouncer.update(callback, wait);
  }, [debouncer, callback, wait]);

  useUnmount(() => {
    debouncer.clear();
  });

  return debouncer;
};
