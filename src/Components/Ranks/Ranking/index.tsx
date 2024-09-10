import { memo, useEffect, useMemo, useState } from "react";
import { NumberAnimation } from "Components/NumberAnimation";
import { Progress } from "Tools/Progress";
import "./styles.scss";

export const Ranking = memo(function Ranking({ label, value }: Props) {
  const [width, setWidth] = useState(0);
  const [color1, color2] = useMemo(() => Progress.getGradient(value), [value]);
  useEffect(() => {
    setWidth(value);
  }, [value]);
  return (
    <div className="ranking">
      <div className="label">
        <strong>{label}</strong>
        <NumberAnimation value={`${value}%`} />
      </div>
      <div className="progress">
        <div
          style={{
            width: `${width}%`,
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            boxShadow: `0em 0.1em 0.5em ${color2}`,
          }}
        />
      </div>
    </div>
  );
});

interface Props {
  label: string;
  value: number;
}
