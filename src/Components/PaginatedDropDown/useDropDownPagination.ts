import { useCallback, useMemo, useState } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import {
  useLoadingState,
  useMount,
  useThrottler,
} from "@figliolia/react-hooks";
import type { Callback, Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export const useDropDownPagination = <T extends IHTMLOption>(
  fetch: FetchFN<T>,
  prefetch = true,
) => {
  const [complete, setComplete] = useState(false);
  const [list, setList] = useState<T[]>([]);
  const [cursor, setCurser] = useState<Maybe<number>>();
  const { loading, success, error, setState } = useLoadingState();

  const queryNext = useCallback(async () => {
    const result = await fetch(setState, cursor);
    if (!result) {
      return;
    }
    if (result.list.length) {
      setList(list => [...list, ...result.list]);
      setCurser(result.cursor);
    } else {
      setComplete(true);
    }
  }, [fetch, cursor, setState]);

  const onFocus = useCallback(() => {
    if (!list.length) {
      void queryNext();
    }
  }, [list.length, queryNext]);

  const throttler = useThrottler(queryNext, 500);

  const scrollHandler = useMemo(
    () => (complete ? undefined : throttler.execute),
    [complete, throttler.execute],
  );

  useMount(() => {
    if (!list.length && prefetch) {
      void queryNext();
    }
  });

  return { list, onFocus, scrollHandler, loading, success, error };
};

export type FetchFN<T extends IHTMLOption> = Callback<
  [ILoadingStateSetter, Maybe<number>],
  FetchResult<T> | Promise<FetchResult<T>>
>;

type FetchResult<T extends IHTMLOption> =
  | {
      cursor: Maybe<number>;
      list: T[];
    }
  | undefined;
