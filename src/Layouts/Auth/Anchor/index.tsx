import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import type { Propless } from "Types/React";
import { useSignUpScreen } from "../useSignUpScreen";

export const Anchor = memo(function Anchor(_: Propless) {
  const signUp = useSignUpScreen();
  const text = useMemo(() => (signUp ? "Login!" : "Sign Up!"), [signUp]);
  const linkText = useMemo(
    () => (signUp ? "Been here before?" : "Are you new here?"),
    [signUp],
  );
  const href = useMemo(
    () => (signUp ? "/register/login" : "/register"),
    [signUp],
  );
  return (
    <p>
      {linkText} <NavLink to={href}>{text}</NavLink>
    </p>
  );
});
