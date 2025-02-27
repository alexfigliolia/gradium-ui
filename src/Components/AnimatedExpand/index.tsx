import { useEffect, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useSizeObserver } from "@figliolia/size-observer";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const AnimatedExpand = ({ open, children }: Props) => {
  const scrollHeight = useRef(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const node = useSizeObserver<HTMLDivElement>({
    height: true,
    width: true,
    onChange: () => {
      scrollHeight.current = node.current?.scrollHeight ?? 0;
    },
  });

  useEffect(() => {
    setMaxHeight(open ? scrollHeight.current : 0);
  }, [open]);

  const classes = useClassNames("animated-expand", { open: maxHeight !== 0 });

  return (
    <div ref={node} className={classes} style={{ maxHeight }}>
      <div>{children}</div>
    </div>
  );
};

interface Props extends OptionalChildren {
  open: boolean;
}
