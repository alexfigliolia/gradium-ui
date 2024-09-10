import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const LeftRight = memo(function LeftRight({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("left-right-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path d="M16.1359 18.2928C16.5264 18.6833 17.1596 18.6833 17.5501 18.2928L22.4375 13.4006C23.2179 12.6194 23.2176 11.3536 22.4369 10.5728L17.5465 5.68247C17.156 5.29195 16.5228 5.29195 16.1323 5.68247C15.7418 6.073 15.7418 6.70616 16.1323 7.09669L20.3179 11.2823C20.7085 11.6729 20.7085 12.306 20.3179 12.6965L16.1359 16.8786C15.7454 17.2691 15.7454 17.9023 16.1359 18.2928Z" />
      <path d="M7.88675 5.68247C7.49623 5.29195 6.86307 5.29195 6.47254 5.68247L1.58509 10.5747C0.804698 11.3559 0.805008 12.6217 1.58579 13.4024L6.47615 18.2928C6.86667 18.6833 7.49984 18.6833 7.89036 18.2928C8.28089 17.9023 8.28089 17.2691 7.89036 16.8786L3.70471 12.6929C3.31419 12.3024 3.31419 11.6692 3.70472 11.2787L7.88675 7.09669C8.27728 6.70616 8.27728 6.073 7.88675 5.68247Z" />
      {children}
    </svg>
  );
});
