import type { UIEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useDebouncer,
  useLocale,
  useTimeout,
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
  const timeout = useTimeout();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    timeout.execute(() => {
      setReady(true);
    }, 10);
  }, [timeout]);

  const controller = useController(new Controller());

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
      if (value && ready) {
        onChange(value);
      }
    },
    [onChange, ready],
  );

  const debouncer = useDebouncer(onScroll, 100);

  useEffect(() => {
    controller.initializePosition(hours, minutes, isPM);
  }, [controller, hours, minutes, isPM]);

  const captureScroll = useMemo(
    () => (ready ? debouncer.execute : undefined),
    [ready, debouncer],
  );

  const classes = useClassNames("time-picker", className);

  return (
    <div className={classes}>
      <Scroller
        tabIndex={0}
        dataList={hourList}
        onScroll={captureScroll}
        aria-label="Select Hours"
        ref={controller.registerScrollHours}
      />
      <div className="colon">:</div>
      <Scroller
        tabIndex={0}
        value={hours}
        dataList={minuteList}
        onScroll={captureScroll}
        aria-label="Select Minutes"
        ref={controller.registerScrollMinutes}
      />
      <Scroller
        tabIndex={0}
        dataList={TODList}
        onScroll={captureScroll}
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
