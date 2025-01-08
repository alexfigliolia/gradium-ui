import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { isLightMode, useTheme } from "State/Theme";
import "./styles.scss";

export const SkeletonThemeLink = memo(function SkeletonThemeLink({
  className,
}: Props) {
  const isLight = useTheme(isLightMode);
  const classes = useClassNames(
    "icon-theme-link",
    "skeleton-theme-link",
    className,
    { isLight },
  );
  return (
    <div className={classes}>
      <div>
        <div />
      </div>
      <span>Finding Links</span>
    </div>
  );
});

interface Props {
  className?: string;
}
