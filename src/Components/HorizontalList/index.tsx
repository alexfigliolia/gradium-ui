import type { UIEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebouncer } from "@figliolia/react-hooks";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const HorizontalList = memo(function HorizontalList({
  children,
  className,
  onScrollEnd,
  scrollPadding = 50,
}: Props) {
  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const { scrollWidth, scrollLeft, clientWidth } = e.target as HTMLElement;
      if (clientWidth + scrollLeft >= scrollWidth - scrollPadding) {
        onScrollEnd?.();
      }
    },
    [scrollPadding, onScrollEnd],
  );

  const debouncer = useDebouncer(handleScroll, 200);
  const classes = useClassNames("horizontal-list", className);

  const onScroll = useMemo(
    () => (onScrollEnd ? debouncer.execute : undefined),
    [onScrollEnd, debouncer.execute],
  );

  return (
    <div className={classes}>
      <div onScroll={onScroll}>{children}</div>
    </div>
  );
});

interface Props extends OptionalChildren {
  className?: string;
  scrollPadding?: number;
  onScrollEnd?: Callback;
}
