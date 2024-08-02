import type { FormEvent } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { AuthButton } from "Components/AuthButton";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { ThemeToggle } from "Components/ThemeToggle";
import { useLoadingState } from "Hooks/useLoadingState";
import { Blob } from "Icons/Blob";
import { Gradium } from "Icons/Gradium";
import { useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { Anchor } from "./Anchor";
import { BlobWithText } from "./BlobWithText";
import { useSignUpScreen } from "./useSignUpScreen";
import "./styles.scss";

export default memo(
  function Auth(_: Propless) {
    const signUp = useSignUpScreen();
    const height = useScreen(state => state.height);
    const text = useMemo(() => (signUp ? "Sign Up!" : "Login!"), [signUp]);
    const {
      setState: _1,
      resetState,
      error,
      success,
      loading,
    } = useLoadingState();
    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(
        Array.from(new FormData(e.target as HTMLFormElement).entries()),
      );
    }, []);

    useEffect(() => {
      resetState();
    }, [signUp, resetState]);

    return (
      <section className="auth-screen" style={{ height, maxHeight: height }}>
        <BlobWithText>{text}</BlobWithText>
        <div className="content">
          <Gradium>
            <BrandSVGGradient id="gradiumIcon" x1={0} y1={0} x2={1} y2={1} />
          </Gradium>
          <h1>Gradium</h1>
          <form onSubmit={onSubmit}>
            <Outlet />
            <AuthButton
              label={text}
              error={!!error}
              success={success}
              loading={loading}
            />
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
