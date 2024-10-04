import { memo, useEffect, useMemo, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFormState, useUnmount } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { ThemeLogo } from "Components/ThemeLogo";
import { ThemeToggle } from "Components/ThemeToggle";
import { useFadeTransition } from "Hooks/useFadeTransition";
import { Blob } from "Icons/Blob";
import { selectHeight, useScreen } from "State/Screen";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import { Anchor } from "./Anchor";
import { BlobWithText } from "./BlobWithText";
import { Controller } from "./Controller";
import { ForgotPassword } from "./ForgotPassword";
import { useSignUpScreen } from "./useSignUpScreen";
import "./styles.scss";

export default memo(
  function Auth(_: Propless) {
    const navigate = useNavigate();
    const signUp = useSignUpScreen();
    const height = useScreen(selectHeight);
    const controller = useRef<Controller>();
    const fadeOut = useRef<Callback<[Callback]>>(null);
    const text = useMemo(() => Controller.buttonText(signUp), [signUp]);
    const { onSubmit, error, success, loading, resetState } = useFormState(
      (data, setState) => {
        controller.current = new Controller(setState, navigate, fadeOut);
        void controller.current.onSubmit(data, signUp);
      },
    );

    useEffect(() => {
      resetState();
    }, [signUp, resetState]);

    useUnmount(() => {
      if (controller.current) {
        controller.current.abort();
      }
    });

    const classes = useFadeTransition(fadeOut, "auth-screen");

    return (
      <section className={classes} style={{ height, maxHeight: height }}>
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
      </section>
    );
  },
  () => true,
);
