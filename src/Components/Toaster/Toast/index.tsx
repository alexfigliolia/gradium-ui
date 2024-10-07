import type { MouseEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useFocusedKeyListener,
  useMount,
  useTimeout,
} from "@figliolia/react-hooks";
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
  children,
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
      if (ID.current) {
        ModalStack.delete(ID.current);
      }
      setVisible(false);
      timeout.execute(dismiss, 650);
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

  const listener = useFocusedKeyListener(hide);

  return (
    <div className={classes} style={{ "--height": pixelHeight }}>
      <div ref={node}>
        <Icon />
        <div>
          <h4>{heading}</h4>
          <p dangerouslySetInnerHTML={{ __html: message }} />
          {children}
        </div>
      </div>
      <Closer onMouseDown={hide} {...listener.events} />
    </div>
  );
});
