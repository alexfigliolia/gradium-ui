import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { Callback } from "Types/Generics";

export const useActivePath = (
  path: string,
  matcher?: Callback<[path: string], boolean>,
) => {
  const location = useLocation();
  return useMemo(
    () =>
      matcher ? matcher(location.pathname) : location.pathname.startsWith(path),
    [location.pathname, path, matcher],
  );
};
