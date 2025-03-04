import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import type { DropDownProps } from "Components/DropDown";
import { DropDown } from "Components/DropDown";
import type { IHTMLOption } from "Types/React";
import { useDropDownPagination } from "./useDropDownPagination";
import "./styles.scss";

function PaginatedDropDownComponent<
  T extends IHTMLOption,
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
>({ list, loading, fetchNextPage, className, ...rest }: Props<T, M, F>) {
  const scrollHandler = useDropDownPagination(fetchNextPage);
  const classes = useClassNames("paginated-dropdown", className);
  return (
    <DropDown
      list={list}
      loading={loading}
      className={classes}
      onScrollEnd={scrollHandler}
      {...rest}>
      <ColoredLoadingState loading={loading} className="dd-fetch-loader" />
    </DropDown>
  );
}

export const PaginatedDropDown = memo(
  PaginatedDropDownComponent,
) as typeof PaginatedDropDownComponent;

export interface Props<
  T extends IHTMLOption,
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
> extends DropDownProps<T, M> {
  loading?: boolean;
  fetchNextPage: F;
}
