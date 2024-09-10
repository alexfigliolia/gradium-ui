import { memo, useEffect, useState } from "react";
import type { IProgressCircle } from "Components/ProgressCircle";
import { ProgressCircle } from "Components/ProgressCircle";
import "./styles.scss";

export const AnimatedProgressCircle = memo(function AnimatedProgressBar({
  progress,
  ...rest
}: IProgressCircle) {
  const [current, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress);
  }, [progress]);
  return (
    <ProgressCircle
      className="animated-progress-circle"
      progress={current}
      {...rest}
    />
  );
});
