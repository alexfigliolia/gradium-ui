import { useEffect, useRef } from "react";
import type { Callback } from "Types/Generics";

export const useAccessControlCallback = <T>({
  granted,
  fetching,
  onAttempt,
  requirements,
}: IUseAccessControl<T>) => {
  const invoked = useRef(false);
  useEffect(() => {
    if (!fetching && !granted && onAttempt && !invoked.current) {
      invoked.current = true;
      onAttempt();
    }
  }, [fetching, granted, onAttempt]);

  useEffect(() => {
    if (invoked.current) {
      invoked.current = false;
    }
  }, [requirements]);
};

interface IUseAccessControl<T> {
  granted: boolean;
  fetching?: boolean;
  onAttempt?: Callback;
  requirements: T;
}
