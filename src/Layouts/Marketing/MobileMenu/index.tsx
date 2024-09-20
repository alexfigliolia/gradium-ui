import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Dimensions, Options } from "@figliolia/size-observer";
import { useSizeObserver } from "@figliolia/size-observer";
import { mobileMenu, Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";
import { Nav } from "../Nav";
import "./styles.scss";

export const MobileMenu = memo(function MobileMenu(_: Propless) {
  const open = useModals(mobileMenu);
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
  const classes = useClassNames("marketing-menu", { open });

  const onNavigate = useCallback(() => {
    Modals.mobileMenu.close();
  }, []);

  return (
    <div className={classes} style={{ "--height": height }}>
      <Nav ref={node} onNavigate={onNavigate} />
    </div>
  );
});
