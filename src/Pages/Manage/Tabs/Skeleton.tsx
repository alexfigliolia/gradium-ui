import { memo } from "react";

export const Skeleton = memo(
  function Skeleton({ route }: Props) {
    return <div className="skeleton-tab">{route.replace(/-/g, " ")}</div>;
  },
  () => true,
);

interface Props {
  route: string;
}
