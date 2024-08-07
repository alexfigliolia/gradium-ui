import type { MouseEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDragDetector } from "Hooks/useDragDetector";
import { useTimeout } from "Hooks/useTimeout";
import { useScreen } from "State/Screen";
import type { IDragDetectorOptions } from "Tools/DragDetector";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const ActionSheet = memo(function ActionSheet({
  open,
  close,
  className,
  children,
  dim = false,
  notch = false,
}: Props) {
  const timeout = useTimeout();
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
          timeout.execute(() => {
            setDragging(false);
          }, 16);
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
  const classes = useClassNames("action-sheet", className, {
    dim,
    open,
    notch,
  });
  return (
    <div
      role="dialog"
      aria-hidden={!open}
      aria-modal={true}
      className={classes}
      onClick={onClickOutside}>
      <div
        role="dialog"
        {...detector.bindings}
        style={{
          transform: `translateY(${translate}px)`,
          transition: `transform ${translate === 0 && !detector.active ? "0.5s" : "0s"}, translate 0.5s, opacity 0.5s, scale 0.5s`,
        }}>
        {children}
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
