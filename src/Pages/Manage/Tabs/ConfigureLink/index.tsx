import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderLink } from "Components/GradientBorderButton";
import { RightArrow } from "Icons/RightArrow";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ConfigureLink = memo(
  function ConfigureLink(_: Propless) {
    const { pathname } = useLocation();
    const node = useRef<HTMLDivElement>(null);
    const { slug } = useProperties(currentProperty);
    const [route, setRoute] = useState("");
    const [width, setWidth] = useState<string | undefined>(undefined);
    const link = useMemo(
      () => AdminRoutes.slugRoute(slug, "configure"),
      [slug],
    );
    useLayoutEffect(() => {
      if (pathname.endsWith("living-spaces")) {
        return setRoute("Living Spaces");
      }
      if (pathname.endsWith("amenities")) {
        return setRoute("Amenities");
      }
    }, [pathname]);

    const nestedRoute = useMemo(() => {
      if (pathname.endsWith("living-spaces")) {
        return "Living Spaces";
      }
      if (pathname.endsWith("amenities")) {
        return "Amenities";
      }
      return null;
    }, [pathname]);

    const classes = useClassNames("sublink", { active: !!nestedRoute });

    useLayoutEffect(() => {
      if (!node.current) {
        return;
      }
      setWidth(`${node.current.getBoundingClientRect().width + 16 * 2.5}px`);
    }, [route]);

    return (
      <GradientBorderLink to={link} className="configure-link">
        configure
        <div className={classes} style={{ "--width": width }}>
          <RightArrow aria-hidden />
          <div ref={node}>{route}</div>
        </div>
      </GradientBorderLink>
    );
  },
  () => true,
);
