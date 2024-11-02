import { memo, useEffect, useState } from "react";
import type { IBottomSheetProps } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import {
  CheckBoxGroup,
  type Props as CheckBoxProps,
} from "Components/CheckBoxGroup";
import { Confirmation } from "Components/Confirmation";
import type { DDValue } from "Components/DropDown/types";
import { TriangleLoader } from "Components/TriangleLoader";
import { Error } from "Icons/Error";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import { type Props as SelectProps, Select } from "./Select";
import "./styles.scss";

function IOptionSelector<T extends IHTMLOption, M extends boolean | undefined>({
  open,
  title,
  multiple,
  value,
  fallback,
  loading,
  options,
  onChange,
  className,
  blurInput,
  clickOutside,
  ...rest
}: Props<T, M>) {
  const timeout = useTimeout();
  const [enableOutsideClickDetection, setEnabled] = useState(
    open && clickOutside,
  );

  useEffect(() => {
    if (open) {
      blurInput();
    }
  }, [open, blurInput]);

  useEffect(() => {
    if (open && clickOutside) {
      timeout.execute(() => {
        setEnabled(true);
      }, 500);
    } else {
      setEnabled(false);
    }
  }, [open, clickOutside, timeout]);

  const classes = useClassNames("option-selector", className);

  return (
    <Confirmation
      {...rest}
      open={open}
      className={classes}
      clickOutside={enableOutsideClickDetection}>
      <h2>{title}</h2>
      {multiple && <p>You may select any number of values</p>}
      {!options.length && !loading && (
        <div className="fallback-message">
          <Error />
          {fallback || "There are no options to show"}
        </div>
      )}
      {multiple ? (
        <CheckBoxGroup
          options={options}
          value={value as Set<string>}
          onChange={onChange as Callback<[Set<string>]>}
        />
      ) : (
        <Select
          options={options}
          value={value as string}
          onChange={onChange as Callback<[string]>}
        />
      )}
      {loading && (
        <div className="loading-state">
          Loading <TriangleLoader />
        </div>
      )}
    </Confirmation>
  );
}

export const OptionSelector = memo(
  IOptionSelector,
) as unknown as typeof IOptionSelector;

export type Props<T extends IHTMLOption, M extends boolean | undefined> = Omit<
  IInputProps<T, M>,
  "value" | "onChange"
> &
  Omit<IBottomSheetProps, "dim" | "notch"> & {
    title: string;
    multiple: M;
    loading?: boolean;
    fallback?: string;
    value: DDValue<M>;
    blurInput: Callback;
    onChange: Callback<[DDValue<M>]>;
  };

type IInputProps<
  T extends IHTMLOption,
  M extends boolean | undefined,
> = M extends true ? CheckBoxProps<T> : SelectProps<T>;
