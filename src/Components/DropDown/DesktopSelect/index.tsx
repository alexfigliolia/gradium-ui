import type { UIEvent } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangleLoader } from "Components/TriangleLoader";
import { Triangle } from "Icons/Triangle";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import type { DDValue } from "../types";
import { Option } from "./Option";

export function IDesktopSelect<
  T extends IHTMLOption,
  M extends boolean | undefined,
>({ list, open, value, fallback, loading, onScroll, onChange }: Props<T, M>) {
  const classes = useClassNames("dd-selector", { open });

  const isSelected = useCallback(
    (option: string) => {
      if (typeof value === "string") {
        return value === option;
      }
      return value.has(option);
    },
    [value],
  );

  return (
    <div className={classes}>
      <Triangle />
      <div onScroll={onScroll}>
        {!list.length && !loading && (
          <div>{fallback || "There are no options to show"}</div>
        )}
        {list.map(({ value: currentValue, label }) => {
          return (
            <Option
              onClick={onChange}
              key={currentValue}
              value={currentValue}
              label={label || currentValue}
              selected={isSelected(currentValue)}
            />
          );
        })}
        {loading && (
          <div>
            Loading <TriangleLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export const DesktopSelect = memo(IDesktopSelect);

interface Props<T extends IHTMLOption, M extends boolean | undefined> {
  list: T[];
  open: boolean;
  loading?: boolean;
  fallback?: string;
  value: DDValue<M>;
  onChange: Callback<[string]>;
  onScroll?: Callback<[UIEvent<HTMLElement>]>;
}
