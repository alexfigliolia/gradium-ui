import { differenceInDays } from "date-fns";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { type GradiumImage } from "GraphQL/Types";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { Leases } from "State/Leases";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const AvailableSpaceCard = ({
  id,
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

  const photos = useMemo(() => {
    const p: (GradiumImage | null)[] = [];
    const K = 5;
    const N = Math.min(K, images.length);
    for (let i = 0; i < N; i++) {
      p.push(images[i]);
    }
    if (N === 0) {
      p.push(null);
    }
    return p;
  }, [images]);

  const createLease = useCallback(() => {
    Leases.newLease.open(id);
  }, [id]);

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
      <div className="as-images">
        {photos.map((img, i) => (
          <div key={i}>
            {img ? <img src={img.url} alt="property" /> : <ImagePlaceholder />}
          </div>
        ))}
      </div>
      <GradientBorderButton onClick={createLease}>
        Add Lease
      </GradientBorderButton>
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
