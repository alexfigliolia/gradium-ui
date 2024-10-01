import type { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import { forwardRef, memo } from "react";
import { useFadeTransition } from "Hooks/useFadeTransition";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Page = memo(
  forwardRef(function Page(
    { label, children, titleArea, className, ...rest }: Props,
    ref: ForwardedRef<Callback<[Callback]>>,
  ) {
    const classes = useFadeTransition(ref, "page", className);
    return (
      <section {...rest} className={classes}>
        <div className="title-area">
          <h1>{label}</h1>
          {titleArea}
        </div>
        {children}
      </section>
    );
  }),
);

interface Props extends OptionalChildren, HTMLAttributes<HTMLDivElement> {
  label: string;
  titleArea?: ReactNode;
}
