import type { FocusEvent } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import type { DropDownProps } from "Components/DropDown";
import { DropDown } from "Components/DropDown";
import type { IHTMLOption } from "Types/React";
import { type FetchFN, useDropDownPagination } from "./useDropDownPagination";
import "./styles.scss";

function PaginatedDropDownComponent<
  T extends IHTMLOption,
  M extends boolean | undefined,
>({ fetch, onFocus, className, prefetch, ...rest }: Props<T, M>) {
  const {
    list,
    scrollHandler,
    onFocus: onActive,
    loading,
    success,
    error,
  } = useDropDownPagination<T>(fetch, prefetch);

  const onFocusIn = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onActive();
      onFocus?.(e);
    },
    [onActive, onFocus],
  );

  const classes = useClassNames("paginated-dropdown", className);

  return (
    <DropDown
      list={list}
      {...rest}
      onFocus={onFocusIn}
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
) as typeof PaginatedDropDownComponent;

export interface Props<T extends IHTMLOption, M extends boolean | undefined>
  extends Omit<DropDownProps<T, M>, "list"> {
  prefetch?: boolean;
  fetch: FetchFN<T>;
}
