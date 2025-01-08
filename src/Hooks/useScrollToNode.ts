import { useCallback, useMemo, useRef } from "react";
import type { RefObject } from "@fullcalendar/core/preact.js";
import type { Callback } from "Types/Generics";

export const useScrollToNode = <T extends HTMLElement>(
  padding = 0,
  offsetByNavHeight = true,
): [RefObject<T>, Callback] => {
  const node = useRef<T>(null);

  const scrollTo = useCallback(() => {
    requestAnimationFrame(() => {
      let offset = 0;
      if (offsetByNavHeight) {
        const navs = document.getElementsByClassName("core-nav");
        const { clientHeight } = navs[0];
        offset = clientHeight > 200 ? 0 : clientHeight;
      }
      if (node.current) {
        window.scrollTo({
          top:
            node.current.getBoundingClientRect().top +
            window.scrollY -
            (offset + padding),
          behavior: "smooth",
        });
      }
    });
  }, [padding, offsetByNavHeight]);

  return useMemo(() => [node, scrollTo], [scrollTo]);
};
