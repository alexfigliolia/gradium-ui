import type { FocusEvent, UIEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useClickOutside, useController } from "@figliolia/react-hooks";
import type { InputProps, InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import { ClearButton } from "./ClearButton";
import { Controller } from "./Controller";
import { OptionSelection } from "./OptionSelection";
import type { DDValue } from "./types";
import "./styles.scss";

const NOOP = () => {};

function IDropDown<T extends IHTMLOption, M extends boolean | undefined>({
  list,
  label,
  value,
  onOpen,
  onClose,
  onFocus,
  loading,
  fallback,
  children,
  onChange,
  className,
  onScrollEnd,
  disabled = false,
  multiple = false,
  title = "Options",
  ...rest
}: DropDownProps<T, M>) {
  const [open, setOpen] = useState(false);
  const controller = useController(new Controller(setOpen));
  const table = useMemo(() => Controller.toTable(list), [list]);
  controller.registerProxies(onOpen, onClose);

  const clear = useCallback(() => {
    onChange(new Set() as DDValue<M>);
  }, [onChange]);

  const blurInput = useCallback(() => {
    controller.blurNode();
  }, [controller]);

  const enableClickOutside = useMemo(
    () => !Devices.IS_MOBILE_BROWSER && open,
    [open],
  );

  const node = useClickOutside({
    refCallback: true,
    open: enableClickOutside,
    callback: controller.Toggle.close,
  });

  const cacheRef = useCallback(
    (instance: InputRef<"text"> | null) => {
      if (instance) {
        node(instance.label);
        controller.registerNode(instance.input);
      }
    },
    [controller, node],
  );

  const onScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      const { target } = e;
      const { scrollTop, scrollHeight, offsetHeight, children } =
        target as HTMLElement;
      const first = children[0] as HTMLElement;
      const childHeight = first?.offsetHeight ?? -Infinity;
      const distanceFromBottom = scrollHeight - offsetHeight - scrollTop;
      if (distanceFromBottom < childHeight * 2) {
        onScrollEnd?.(e);
      }
    },
    [onScrollEnd],
  );

  const onScrollHandler = useMemo(
    () => (onScrollEnd ? onScroll : undefined),
    [onScrollEnd, onScroll],
  );

  const onFocusDD = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      controller.Toggle.open();
      onFocus?.(e);
    },
    [onFocus, controller.Toggle],
  );

  const onClickIcon = useMemo(() => {
    if (Devices.IS_MOBILE_BROWSER) {
      return controller.Toggle.open;
    }
  }, [controller.Toggle]);

  const inputValue = useMemo(
    () => Controller.parseValues(value, table),
    [value, table],
  );

  const valueLength = useMemo(() => Controller.valueLength(value), [value]);

  const classes = useClassNames("dropdown", className, {
    isMobile: Devices.IS_MOBILE_BROWSER,
  });

  return (
    <Input
      {...rest}
      type="text"
      label={label}
      ref={cacheRef}
      onChange={NOOP}
      autoComplete="off"
      disabled={disabled}
      className={classes}
      onFocus={onFocusDD}
      onClickIcon={onClickIcon}
      value={inputValue}>
      {children}
      {multiple && <ClearButton onClick={clear} valueLength={valueLength} />}
      {/* @ts-ignore */}
      <OptionSelection<T, M>
        clickOutside
        open={open}
        options={list}
        value={value}
        title={title}
        loading={loading}
        fallback={fallback}
        multiple={multiple}
        onChange={onChange}
        blurInput={blurInput}
        onScroll={onScrollHandler}
        close={controller.Toggle.close}
      />
    </Input>
  );
}

export const DropDown = memo(IDropDown) as typeof IDropDown;

export interface DropDownProps<
  T extends IHTMLOption = IHTMLOption,
  M extends boolean | undefined = undefined,
> extends Omit<
    InputProps<"text">,
    "value" | "list" | "onChange" | "type" | "disabled" | "autoComplete"
  > {
  list: T[];
  name: string;
  multiple?: M;
  title?: string;
  disabled?: boolean;
  className?: string;
  value: DDValue<M>;
  fallback?: string;
  loading?: boolean;
  onOpen?: Callback;
  onClose?: Callback;
  onChange: Callback<[DDValue<M>]>;
  onScrollEnd?: Callback<[UIEvent<HTMLElement>]>;
}

export * from "./OptionSelection";
