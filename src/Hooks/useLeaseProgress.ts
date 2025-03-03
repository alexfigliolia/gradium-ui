import { useMemo } from "react";
import type { ILease } from "Models/Leases";
import { Numbers } from "Tools/Numbers";
import { useDurationElapsed } from "./useDurationElapsed";

export const useLeaseProgress = ({ rate, end, start }: ILease) => {
  const price = useMemo(() => Numbers.format(rate), [rate]);
  return {
    price,
    ...useDurationElapsed({ end, start }),
  };
};
