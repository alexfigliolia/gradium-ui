import { useRef } from "react";
import type { Callback } from "Types/Generics";

export const useStableCallback = <T extends Callback>(callback: T) => {
  const ref = useRef<T>(callback);
  ref.current = callback;
  return ref;
};
