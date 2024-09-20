import { memo, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { Logo } from "Components/Logo";
import { ThemeToggle } from "Components/ThemeToggle";
import { Blob } from "Icons/Blob";
import { selectHeight, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { Anchor } from "./Anchor";
import { BlobWithText } from "./BlobWithText";
import { useSignUpScreen } from "./useSignUpScreen";
import "./styles.scss";

export default memo(
  function Auth(_: Propless) {
    const signUp = useSignUpScreen();
    const height = useScreen(selectHeight);
    const text = useMemo(() => (signUp ? "Sign Up!" : "Login!"), [signUp]);
    const { onSubmit, error, success, loading, resetState } = useFormState(
      (data, setState, resetState) => {
        setState("loading", true);
        console.log(Array.from(data).entries());
        setTimeout(() => {
          setState("success", true);
          setTimeout(() => {
            resetState();
          }, 2000);
        }, 2000);
      },
    );

    useEffect(() => {
      resetState();
    }, [signUp, resetState]);

    return (
      <section className="auth-screen" style={{ height, maxHeight: height }}>
        <BlobWithText>{text}</BlobWithText>
        <div className="content">
          <Logo />
          <form onSubmit={onSubmit}>
            <Outlet />
            <ActionButton
              type="submit"
              error={!!error}
              success={success}
              loading={loading}>
              {text}
            </ActionButton>
          </form>
          <Anchor />
        </div>
        <Blob>
          <BrandSVGGradient id="blobShape" />
        </Blob>
        <ThemeToggle />
      </section>
    );
  },
  () => true,
);
