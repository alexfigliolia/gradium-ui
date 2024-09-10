import { Fragment, memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { AnimatedProgressCircle } from "Components/AnimatedProgressBar";
import { NumberAnimation } from "Components/NumberAnimation";
import { Ranks } from "Components/Ranks";
import { StatisticsTile } from "Components/StatisticsTile";
import { Progress } from "Tools/Progress";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ProgressTile = memo(function ProgressTile({
  title,
  subtitle,
  className,
  progress,
  children,
  ranks,
  ranksTitle,
}: Props) {
  const gradientID = useMemo(
    () => Progress.getGradientID(progress),
    [progress],
  );
  const shadowColor = useMemo(
    () => Progress.getGradient(progress)[1],
    [progress],
  );
  const classes = useClassNames("progress-tile", className);
  return (
    <StatisticsTile
      className={classes}
      title={
        <Fragment>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </Fragment>
      }>
      <div className="visuals">
        <AnimatedProgressCircle
          progress={progress}
          style={{
            "--gradient-id": gradientID,
            "--shadow-color": shadowColor,
          }}>
          <NumberAnimation value={`${progress}%`} />
        </AnimatedProgressCircle>
        <Ranks title={ranksTitle} ranks={ranks} />
      </div>
      {children}
    </StatisticsTile>
  );
});

interface Props extends OptionalChildren {
  title: string;
  subtitle: string;
  className?: string;
  progress: number;
  ranksTitle: string;
  ranks: { label: string; value: number }[];
}
