import type { FocusEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import {
  useLoadingState,
  useMount,
  useThrottler,
} from "@figliolia/react-hooks";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import type { DropDownProps } from "Components/DropDown";
import { DropDown } from "Components/DropDown";
import type { Callback, Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

function PaginatedDropDownComponent<
  T extends IHTMLOption,
  M extends boolean | undefined,
>({ fetch, onFocus, className, prefetch, ...rest }: Props<T, M>) {
  const [complete, setComplete] = useState(false);
  const [list, setList] = useState<IHTMLOption[]>([]);
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

  const throttler = useThrottler(queryNext, 500);

  const onActive = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!list.length) {
        void queryNext();
      }
      onFocus?.(e);
    },
    [onFocus, list.length, queryNext],
  );

  const scrollHandler = useMemo(
    () => (complete ? undefined : throttler.execute),
    [complete, throttler.execute],
  );

  useMount(() => {
    if (!list.length && prefetch) {
      void queryNext();
    }
  });

  const classes = useClassNames("paginated-dropdown", className);

  return (
    <DropDown
      list={list}
      {...rest}
      onFocus={onActive}
      className={classes}
      onScrollEnd={scrollHandler}
      loading={loading && !success && !error}
      {...rest}>
      <ColoredLoadingState
        error={!!error}
        loading={loading}
        success={success}
        className="dd-fetch-loader"
      />
    </DropDown>
  );
}

export const PaginatedDropDown = memo(
  PaginatedDropDownComponent,
) as unknown as typeof PaginatedDropDownComponent;

interface Props<T extends IHTMLOption, M extends boolean | undefined>
  extends Omit<DropDownProps<T, M>, "list"> {
  prefetch?: boolean;
  fetch: Callback<
    [ILoadingStateSetter, Maybe<number>],
    FetchResult | Promise<FetchResult>
  >;
}

interface CursoredResult {
  cursor: number;
  list: IHTMLOption[];
}

type FetchResult = CursoredResult | undefined;
