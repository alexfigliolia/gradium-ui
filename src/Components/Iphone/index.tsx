import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import phone from "Images/iphone.jpg";
import "./styles.scss";

export const Iphone = memo(function Iphone({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const classes = useClassNames("iphone", className);
  return (
    <div className={classes} {...rest}>
      <img src={phone} alt="mockup" />
      <div>{children}</div>
    </div>
  );
});
