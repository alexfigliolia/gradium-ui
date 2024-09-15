import type { MouseEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  type IDragDetectorOptions,
  useDragDetector,
} from "@figliolia/drag-detector";
import { useTimeout } from "@figliolia/react-hooks";
import { useScreen } from "State/Screen";
import type { OptionalChildren } from "Types/React";
import "./styles.css";
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

export const ActionSheet = memo(function ActionSheet({
  open,
  close,
  className,
  children,
  dim = false,
  notch = false,
}: Props) {
  const timeout = useTimeout();
  const scrollView = useRef<HTMLDivElement>(null);
  const width = useScreen(state => state.width);
  const [translate, setTranslate] = useState(0);
  const [dragging, setDragging] = useState(false);
  const threshold = useMemo(() => (width >= 670 ? 0 : 50), [width]);
  const DDOptions: IDragDetectorOptions<HTMLDivElement> = useMemo(
    () => ({
      yThreshold: threshold,
      callback: ({ y, yDelta, yDistance, exit, rect }) => {
        if (exit) {
          setTranslate(0);
          timeout.execute(() => setDragging(false));
          if ((y >= 100 && yDelta > 0) || yDelta > 15 || yDistance > 60) {
            return close();
          }
        } else {
          setDragging(true);
          setTranslate(t => Math.max(0, Math.min(t + yDelta, rect.height)));
        }
      },
    }),
    [close, timeout, threshold],
  );
  const detector = useDragDetector<HTMLDivElement>(DDOptions);
  const onClickOutside = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (dragging || detector.node?.contains?.(e.target as Node)) {
        return;
      }
      close();
    },
    [close, detector, dragging],
  );

  useEffect(() => {
    if (open && scrollView.current) {
      scrollView.current.scrollTop = 0;
      scrollView.current.focus();
    }
  }, [open, detector.node]);

  const classes = useClassNames("action-sheet", className, {
    dim,
    open,
  });

  const pullDownClasses = useClassNames("pull-down", { notch });

  const { ref, ...events } = detector.bindings;

  return (
    <div
      role="dialog"
      aria-modal={true}
      aria-hidden={!open}
      className={classes}
      onClick={onClickOutside}>
      <div
        ref={ref}
        tabIndex={0}
        className="sheet"
        style={{
          transform: `translateY(${translate}px)`,
          transition: `transform ${translate === 0 && !detector.active ? "0.5s" : "0s"}, translate 0.5s, opacity 0.5s, scale 0.5s`,
        }}>
        <div ref={scrollView} className="sheet-scroll-view">
          <div {...events} className={pullDownClasses} />
          <div className="sheet-content">{children}</div>
        </div>
      </div>
    </div>
  );
});

interface Props extends OptionalChildren {
  open: boolean;
  dim?: boolean;
  notch?: boolean;
  className?: string;
  close: () => void;
}
