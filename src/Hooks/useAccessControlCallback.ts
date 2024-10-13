import { useEffect, useRef } from "react";
import type { Callback } from "Types/Generics";

export const useAccessControlCallback = <T>({
  granted,
  onAttempt,
  requirements,
}: IUseAccessControl<T>) => {
  const invoked = useRef(false);
  useEffect(() => {
    if (!granted && onAttempt && !invoked.current) {
      invoked.current = true;
      onAttempt();
    }
  }, [granted, onAttempt]);

  useEffect(() => {
    if (invoked.current) {
      invoked.current = false;
    }
  }, [requirements]);
};

interface IUseAccessControl<T> {
  granted: boolean;
  onAttempt?: Callback;
  requirements: T;
}
