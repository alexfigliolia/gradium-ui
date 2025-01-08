import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Outlet } from "react-router-dom";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
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
import { LazyForgotPassword } from "./ForgotPassword/Lazy";
import { useSignUpScreen } from "./useSignUpScreen";
import "./styles.scss";

export default memo(
  function Auth(_: Propless) {
    const signUp = useSignUpScreen();
    const height = useScreen(selectHeight);
    const controller = useRef<Controller>();
    const fadeOut = useRef<Callback<[Callback]>>(null);
    const text = useMemo(() => Controller.buttonText(signUp), [signUp]);

    const authenticate = useCallback(
      (data: FormData, setState: ILoadingStateSetter) => {
        controller.current = new Controller(setState, fadeOut);
        void controller.current.onSubmit(data, signUp);
      },
      [signUp],
    );

    const { onSubmit, error, success, loading, resetState } =
      useFormState(authenticate);

    useEffect(() => {
      resetState();
    }, [signUp, resetState]);

    useUnmount(() => {
      controller.current?.abort?.();
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
        <LazyForgotPassword />
      </section>
    );
  },
  () => true,
);
