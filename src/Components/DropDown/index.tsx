import type { FocusEvent, UIEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useClickOutside, useController } from "@figliolia/react-hooks";
import type { InputProps, InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { OptionSelector } from "Components/OptionSelector";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import { Controller } from "./Controller";
import { DesktopSelect } from "./DesktopSelect";
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
  ...rest
}: DropDownProps<T, M>) {
  const [open, setOpen] = useState(false);
  const controller = useController(new Controller(setOpen));
  const table = useMemo(() => Controller.toTable(list), [list]);
  controller.registerProxies(onOpen, onClose);

  const onSelect = useCallback(
    (selected: string) => {
      if (multiple && value instanceof Set) {
        return onChange(
          Controller.add(selected, value, multiple) as DDValue<M>,
        );
      }
      onChange((value === selected ? "" : selected) as DDValue<M>);
    },
    [onChange, value, multiple],
  );

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
    (instance: InputRef | null) => {
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

  const classes = useClassNames("dropdown", className);

  return (
    <Input
      {...rest}
      type="text"
      label={label}
      ref={cacheRef}
      onChange={NOOP}
      disabled={disabled}
      className={classes}
      onFocus={onFocusDD}
      autoComplete="off"
      value={Controller.parseValues(value, table)}>
      {children}
      {Devices.IS_MOBILE_BROWSER ? (
        // @ts-ignore
        <OptionSelector<T, M>
          clickOutside
          open={open}
          options={list}
          value={value}
          title="Options"
          loading={loading}
          fallback={fallback}
          multiple={multiple}
          onChange={onChange}
          blurInput={blurInput}
          onScroll={onScrollHandler}
          close={controller.Toggle.close}
        />
      ) : (
        <DesktopSelect
          open={open}
          list={list}
          value={value}
          onChange={onSelect}
          loading={loading}
          fallback={fallback}
          onScroll={onScrollHandler}
        />
      )}
    </Input>
  );
}

export const DropDown = memo(IDropDown) as unknown as typeof IDropDown;

export interface DropDownProps<
  T extends IHTMLOption = IHTMLOption,
  M extends boolean | undefined = undefined,
> extends Omit<
    InputProps,
    "value" | "list" | "onChange" | "type" | "disabled" | "autoComplete"
  > {
  list: T[];
  name: string;
  multiple?: M;
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
