import { memo, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useFormState, useTimeout } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { ThemeLogo } from "Components/ThemeLogo";
import { ThemeToggle } from "Components/ThemeToggle";
import { Toaster } from "Components/Toaster";
import { Blob } from "Icons/Blob";
import { selectHeight, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { Anchor } from "./Anchor";
import { BlobWithText } from "./BlobWithText";
import { Controller } from "./Controller";
import { ForgotPassword } from "./ForgotPassword";
import { useSignUpScreen } from "./useSignUpScreen";
import "./styles.scss";

export default memo(
  function Auth(_: Propless) {
    const timeout = useTimeout();
    const signUp = useSignUpScreen();
    const height = useScreen(selectHeight);
    const text = useMemo(() => Controller.buttonText(signUp), [signUp]);
    const { onSubmit, error, success, loading, resetState } = useFormState(
      (data, setState, resetState) => {
        setState("loading", true);
        console.log(Array.from(data).entries());
        void Controller.onSubmit(data, signUp).then(success => {
          if (success) {
            setState("success", true);
          } else {
            setState("error", "def an error");
          }
          timeout.execute(resetState, 2000);
        });
      },
    );

    useEffect(() => {
      resetState();
    }, [signUp, resetState]);

    return (
      <section className="auth-screen" style={{ height, maxHeight: height }}>
        <BlobWithText>{text}</BlobWithText>
        <div className="content">
          <ThemeLogo />
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
        <ForgotPassword />
        <Toaster />
      </section>
    );
  },
  () => true,
);
