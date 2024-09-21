import { memo, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Dimensions, Options } from "@figliolia/size-observer";
import { useSizeObserver } from "@figliolia/size-observer";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const MobileMenu = memo(function MobileMenu({
  open,
  children,
  className,
}: Props) {
  const [height, setHeight] = useState<string | undefined>();
  const options: Options = useMemo(
    () => ({
      height: true,
      type: "border-box",
      onChange: ({ height }: Dimensions) => {
        setHeight(`${height}px`);
      },
    }),
    [],
  );
  const node = useSizeObserver<HTMLDivElement>(options);
  const classes = useClassNames("mobile-menu", className, { open });

  return (
    <menu className={classes} style={{ "--height": height }}>
      <div ref={node}>{children}</div>
    </menu>
  );
});

interface Props extends OptionalChildren {
  open: boolean;
  className?: string;
}
