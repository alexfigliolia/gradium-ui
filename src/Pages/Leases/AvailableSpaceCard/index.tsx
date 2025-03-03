import { differenceInDays } from "date-fns";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { type GradiumImage } from "GraphQL/Types";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const AvailableSpaceCard = ({
  beds,
  baths,
  name,
  date,
  images,
  propertyName,
  className: classN,
  renderChildren,
}: Props) => {
  const available = useMemo(() => new Date(date), [date]);
  const since = useMemo(() => Dates.format(new Date(date)), [date]);
  const elapsed = useMemo(
    () => Math.abs(differenceInDays(new Date(), available)),
    [available],
  );
  const className = useMemo(() => {
    if (elapsed < 30) {
      return "error";
    }
    if (elapsed < 60) {
      return "info";
    }
    return "success";
  }, [elapsed]);

  const classes = useClassNames("available-space-card", classN, className);

  const children = useMemo(
    () => renderChildren?.(since, elapsed),
    [renderChildren, since, elapsed],
  );

  return (
    <article className={classes}>
      <div className="as-title">
        <div>
          <p>{propertyName}</p>
          <span>{since}</span>
        </div>
        <h3>{name}</h3>
      </div>
      {children}
      <div className="as-stats">
        <div>
          <span>{beds}</span>
          <Bed />
        </div>
        <div>
          <span>{baths}</span>
          <Bath />
        </div>
      </div>
      {!!images.length && (
        <div className="as-images">
          {images.map(img => (
            <div key={img.id}>
              <img src={img.url} alt="property" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

interface Props {
  id: number;
  beds: number;
  baths: number;
  name: string;
  date: string;
  images: GradiumImage[];
  className?: string;
  propertyName: string;
  renderChildren?: (formattedDate: string, daysElapsed: number) => ReactNode;
}
