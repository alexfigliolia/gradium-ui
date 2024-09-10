import { memo, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMount } from "@figliolia/react-hooks";
import { Controller } from "./Controller";
import "./styles.scss";

export const NumberAnimation = memo(function NumberAnimation({
  value,
  className,
}: Props) {
  const [animated, setAnimated] = useState(false);
  const str = useMemo(() => value.toString(), [value]);
  const classes = useClassNames("number-animation", className);
  const columns = useMemo(() => Controller.parse(str), [str]);

  useMount(() => {
    setAnimated(true);
  });

  return (
    <div className={classes} aria-label={str}>
      <div className="columns">
        {columns.map((column, i) => {
          if (typeof column === "number") {
            return (
              <div key={i} className="column-container">
                <span className="dummy">{column}</span>
                <div
                  className="column"
                  style={{
                    translate: `0 ${animated ? `${((column + 1) / 11) * 100}%` : 0}`,
                  }}>
                  {Controller.NUMBER_COLUMN}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="column-container">
              <span className="dummy">{column}</span>
              <div
                className="column"
                style={{
                  translate: `0 ${animated ? "50%" : 0}`,
                }}>
                <span>{column}</span>
                {Controller.START_COLUMN}
              </div>
            </div>
          );
        })}
      </div>
      <div className="dummy" aria-hidden>
        {str}
      </div>
    </div>
  );
});

interface Props {
  className?: string;
  value: string | number;
}
