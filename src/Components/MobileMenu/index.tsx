import { memo, useEffect, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useNodeHeight } from "Hooks/useNodeHeight";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const MobileMenu = memo(function MobileMenu({
  open,
  children,
  className,
}: Props) {
  const container = useRef<HTMLMenuElement>(null);
  const [node, height] = useNodeHeight<HTMLDivElement>();
  const pixelHeight = useMemo(
    () => (height ? `${height}px` : undefined),
    [height],
  );
  const classes = useClassNames("mobile-menu", className, { open });

  useEffect(() => {
    if (open && container.current) {
      container.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [open, node]);

  return (
    <menu
      ref={container}
      className={classes}
      style={{ "--height": pixelHeight }}>
      <div ref={node}>{children}</div>
    </menu>
  );
});

interface Props extends OptionalChildren {
  open: boolean;
  className?: string;
}
