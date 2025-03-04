import { useCallback, useMemo, useRef, useState } from "react";
import { useThrottler } from "@figliolia/react-hooks";

export const useDropDownPagination = <F extends (...args: never[]) => any>(
  fetchNextPage: F,
) => {
  const fetching = useRef(false);
  const [complete, setComplete] = useState(false);

  const queryNext = useCallback(async () => {
    if (fetching.current || complete) {
      return;
    }
    fetching.current = true;
    const result = await fetchNextPage();
    if (!result?.list?.length || typeof result.cursor !== "number") {
      setComplete(true);
    }
    fetching.current = false;
  }, [fetchNextPage, complete]);

  const throttler = useThrottler(queryNext, 500);

  const scrollHandler = useMemo(
    () => (complete ? undefined : throttler.execute),
    [complete, throttler.execute],
  );

  return scrollHandler;
};
