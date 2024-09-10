import { useLayoutEffect } from "react";
import { useController } from "@figliolia/react-hooks";
import type { Dimensions } from "@figliolia/size-observer";
import type { IAreaChart } from "./AreaChart";
import { AreaChart } from "./AreaChart";
import type { Coordinate } from "./types";

export const useAreaChart = <T extends Coordinate>(
  options: IAreaChart<T>,
  dimensions?: Dimensions,
) => {
  const chart = useController(new AreaChart<T>(options));

  useLayoutEffect(() => {
    if (dimensions) {
      chart.resize(dimensions);
    }
  }, [dimensions, chart]);

  useLayoutEffect(() => {
    chart.updateData(options.data);
  }, [options.data, chart]);

  return chart;
};
