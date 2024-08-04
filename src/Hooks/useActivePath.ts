import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useActivePath = (path: string) => {
  const location = useLocation();
  return useMemo(
    () => location.pathname.startsWith(path),
    [location.pathname, path],
  );
};
