import type { UIEvent } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useDebouncer,
  useLocale,
  useMount,
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

  const scrollTOD = useRef<Callback<[number]>>(null);
  const scrollHours = useRef<Callback<[number]>>(null);
  const scrollMinutes = useRef<Callback<[number]>>(null);

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
        console.log("on change", value);
        onChange(value);
      }
    },
    [onChange, ready],
  );

  const debouncer = useDebouncer(onScroll, 100);

  useMount(() => {
    if (scrollHours.current) {
      scrollHours.current((hours > 12 ? hours - 12 : hours) - 1);
    }
    if (scrollMinutes.current) {
      scrollMinutes.current(minutes);
    }
    if (scrollTOD.current) {
      scrollTOD.current(isPM ? 1 : 0);
    }
    timeout.execute(() => {
      setReady(true);
    }, 10);
  });

  const captureScroll = useMemo(
    () => (ready ? debouncer.execute : undefined),
    [ready, debouncer],
  );

  const classes = useClassNames("time-picker", className);

  return (
    <div className={classes}>
      <Scroller ref={scrollHours} list={hourList} onScroll={captureScroll} />
      <div className="colon">:</div>
      <Scroller
        ref={scrollMinutes}
        list={minuteList}
        onScroll={captureScroll}
      />
      <Scroller ref={scrollTOD} list={TODList} onScroll={captureScroll} />
    </div>
  );
});

interface Props {
  value: string;
  className?: string;
  onChange: Callback<[string]>;
}
