import type { UIEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useDebouncer,
  useLocale,
  useUnmount,
} from "@figliolia/react-hooks";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import { Scroller } from "./Scroller";
import "./styles.scss";

export const TimePicker = memo(function TimePicker({
  onChange,
  className,
  value: _value,
}: Props) {
  const locale = useLocale();

  const [listenerEnabled, setListenForScrolls] = useState(false);
  const controller = useController(new Controller(setListenForScrolls));

  const value = useMemo(() => (_value ? _value : Controller.now()), [_value]);

  const hours = useMemo(() => Controller.parse(value, 0, 2), [value]);
  const minutes = useMemo(() => Controller.parse(value, 3, 5), [value]);
  const isPM = useMemo(() => hours >= 12, [hours]);

  const TODList = useMemo(
    () => Controller.generateTODs(hours, minutes, isPM),
    [hours, minutes, isPM],
  );

  const hourList = useMemo(
    () => Controller.generateLocalizedHours(locale, minutes, isPM),
    [locale, minutes, isPM],
  );

  const minuteList = useMemo(
    () => Controller.generateLocalizedMinutes(locale, hours),
    [locale, hours],
  );

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const value = Controller.onScroll(e);
      if (value) {
        onChange(value);
      }
    },
    [onChange],
  );

  const debouncer = useDebouncer(onScroll, 100);

  const scrollHandler = useMemo(
    () => (listenerEnabled ? debouncer.execute : undefined),
    [listenerEnabled, debouncer],
  );

  useEffect(() => {
    controller.initializePosition(hours, minutes, isPM);
  }, [controller, hours, minutes, isPM]);

  useUnmount(() => {
    controller.abortAll();
  });

  const classes = useClassNames("time-picker", className);

  return (
    <div className={classes}>
      <Scroller
        tabIndex={0}
        dataList={hourList}
        aria-label="Select Hours"
        onScroll={scrollHandler}
        ref={controller.registerScrollHours}
      />
      <div className="colon">:</div>
      <Scroller
        tabIndex={0}
        value={hours}
        dataList={minuteList}
        aria-label="Select Minutes"
        onScroll={scrollHandler}
        ref={controller.registerScrollMinutes}
      />
      <Scroller
        tabIndex={0}
        dataList={TODList}
        onScroll={scrollHandler}
        aria-label="Select AM or PM"
        ref={controller.registerScrollTOD}
      />
    </div>
  );
});

interface Props {
  value: string;
  className?: string;
  onChange: Callback<[string]>;
}
