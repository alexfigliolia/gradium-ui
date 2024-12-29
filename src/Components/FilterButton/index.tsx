import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import { IconButton } from "Components/IconButton";
import { Filters } from "Icons/Filters";
import "./styles.scss";

export const FilterButton = memo(function FilterButton({
  className,
  loading = false,
  totalActive = 0,
  ...rest
}: Props) {
  const classes = useClassNames("toggle-filters-button", className, {
    loading,
  });
  const indicatorClasses = useClassNames("indicator", {
    active: !!totalActive,
  });
  return (
    <IconButton className={classes} {...rest}>
      <Filters aria-hidden />
      <div className={indicatorClasses}>
        <strong>{totalActive}</strong>
      </div>
      <ColoredLoadingState loading={loading} />
    </IconButton>
  );
});

interface Props extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  totalActive?: number;
}
