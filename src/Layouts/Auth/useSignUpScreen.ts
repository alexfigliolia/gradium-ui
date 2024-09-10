import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useSignUpScreen = () => {
  const location = useLocation();
  return useMemo(
    () => location.pathname.endsWith("/register"),
    [location.pathname],
  );
};
