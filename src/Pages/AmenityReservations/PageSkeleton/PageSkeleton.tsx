import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Tile } from "Components/Tile";
import { useLocalizedDate } from "Hooks/useLocalizedDate";
import { Page, PageTitle } from "Layouts/Management";
import { Dates } from "Tools/Dates";
import type { Propless } from "Types/React";
import { SkeletonSchedule } from "./SkeletonSchedule";
import "Components/GradientButton/styles.scss";
import "../styles.scss";
import "./styles.scss";

export const PageSkeleton = memo(
  function PageSkeleton(_: Propless) {
    const classes = useClassNames("amenities-section", "amenities-page-loader");
    const [day, month, year] = useLocalizedDate(Dates.TODAY);
    return (
      <Page className={classes}>
        <PageTitle title="Amenity Reservations">
          <div className="gradient-button skeleton">New</div>
        </PageTitle>
        <Tile className="skeleton-content">
          <div className="date">
            <div>
              {month} {day}
              <strong>,&nbsp;&nbsp;&nbsp;{year}</strong>
            </div>
          </div>
          <SkeletonSchedule />
        </Tile>
      </Page>
    );
  },
  () => true,
);
