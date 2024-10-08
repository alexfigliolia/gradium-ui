import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HomeSearch } from "Illustrations/HomeSearch";
import { selectHeight, selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NoProperties = memo(
  function NoProperties(_: Propless) {
    const node = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const windowHeight = useScreen(selectHeight);
    const windowWidth = useScreen(selectWidth);

    const setDesignHeight = useCallback(() => {
      if (node.current) {
        const { top } = node.current.getBoundingClientRect();
        setHeight(window.innerHeight - top);
      }
    }, []);

    useEffect(() => {
      setDesignHeight();
    }, [windowHeight, windowWidth, setDesignHeight]);

    const designWidth = useMemo(() => {
      if (windowHeight > windowWidth) {
        return Math.min(windowWidth, 400);
      }
      return Math.min(windowHeight, windowWidth) * 0.6;
    }, [windowHeight, windowWidth]);

    return (
      <div
        ref={node}
        className="no-properties"
        style={{
          height,
          "--width": `${designWidth}px`,
        }}>
        <div>
          <p>
            Create Your first <span>Property</span>
          </p>
          <HomeSearch />
        </div>
      </div>
    );
  },
  () => true,
);
