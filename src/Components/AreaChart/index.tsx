import type { ForwardedRef } from "react";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMount, useNodeDimensions } from "@figliolia/react-hooks";
import type {
  AreaChart as AreaChartController,
  IAreaChart,
} from "Graphs/AreaChart";
import type { Coordinate } from "Graphs/types";
import { useAreaChart } from "Graphs/useAreaChart";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

function AreaChartRenderer<T extends Coordinate<any, any>>(
  { options, children, className }: Props<T>,
  ref: ForwardedRef<AreaChartController<T>>,
) {
  const [active, setActive] = useState(false);
  const classes = useClassNames("area-chart", className, { active });
  const [node, dimensions] = useNodeDimensions<HTMLDivElement>();
  const chart = useAreaChart(options, dimensions);
  useImperativeHandle(ref, () => chart, [chart]);

  useMount(() => {
    setActive(true);
  });

  return (
    <div ref={node} className={classes}>
      {dimensions && (
        <svg
          ref={chart.setSVG}
          width={dimensions.width}
          height={dimensions.height}>
          {children}
        </svg>
      )}
    </div>
  );
}

export const AreaChart = memo(forwardRef(AreaChartRenderer));

interface Props<T extends Coordinate> extends OptionalChildren {
  className?: string;
  options: IAreaChart<T>;
}
