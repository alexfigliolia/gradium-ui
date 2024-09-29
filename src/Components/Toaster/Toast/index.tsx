import type { MouseEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMount, useTimeout } from "@figliolia/react-hooks";
import { Closer } from "Components/Closer";
import { useNodeHeight } from "Hooks/useNodeHeight";
import type { IndexedToast } from "Models/Toasts";
import { Toasts } from "State/Toasts";
import { ModalStack } from "Tools/ModalStack";
import { Controller } from "./Controller";
import "./styles.scss";

export const Toast = memo(function Toast({
  id,
  type,
  title,
  message,
  dismiss,
}: IndexedToast) {
  const ID = useRef<string>();
  const timeout = useTimeout();
  const [visible, setVisible] = useState(false);
  const Icon = useMemo(() => Controller.icon(type), [type]);
  const heading = useMemo(() => Controller.heading(type, title), [type, title]);

  const [node, height] = useNodeHeight<HTMLDivElement>();
  const pixelHeight = useMemo(
    () => (height ? `${height}px` : undefined),
    [height],
  );

  const hide = useCallback(
    <E extends MouseEvent<HTMLButtonElement> | undefined>(e?: E) => {
      e && e.preventDefault();
      setVisible(false);
      timeout.execute(dismiss, 650);
      if (ID.current) {
        ModalStack.delete(ID.current);
      }
    },
    [dismiss, timeout],
  );

  useMount(() => {
    setVisible(true);
    ID.current = ModalStack.push(hide);
  });

  useEffect(() => {
    const subscription = Toasts.Emitter.on(id, hide);
    return () => {
      Toasts.Emitter.off(id, subscription);
    };
  }, [id, hide]);

  const classes = useClassNames("toast", type, { visible });

  return (
    <div className={classes} style={{ "--height": pixelHeight }}>
      <div ref={node}>
        <h4>
          <Icon /> {heading}
        </h4>
        <p>{message}</p>
      </div>
      <Closer onMouseDown={hide} />
    </div>
  );
});
