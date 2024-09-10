import { memo } from "react";
import { Ranking } from "./Ranking";
import "./styles.scss";

export const Ranks = memo(function Ranks({ title, ranks }: Props) {
  return (
    <div className="ranks">
      <h3>{title}</h3>
      {ranks.map(rank => {
        return <Ranking key={rank.label} {...rank} />;
      })}
    </div>
  );
});

interface Props {
  title: string;
  ranks: { label: string; value: number }[];
}
