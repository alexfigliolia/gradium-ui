import { Fragment } from "react/jsx-runtime";
import { HorizontalList } from "Components/HorizontalList";
import { SearchBar } from "Components/SearchBar";
import { PageTitle } from "Layouts/Management";
import {
  AvailableSpaceCard,
  BedsBaths,
  SpacePhotos,
} from "../AvailableSpaceCard";
import "./styles.scss";

const DATE = new Date().toISOString();

export const AvailabilitySkeleton = ({ title }: Props) => {
  return (
    <div className="availability-skeleton">
      <PageTitle title={title} className="lease-title">
        <SearchBar placeholder="Search" />
      </PageTitle>
      <HorizontalList>
        <AvailableSpaceCard
          id={-1}
          date={DATE}
          name="Loading"
          className="skeleton"
          propertyName="Loading"
          renderChildren={() => (
            <Fragment>
              <p>Loading Availability</p>
              <BedsBaths beds={1} baths={1} />
              <SpacePhotos images={[]} />
            </Fragment>
          )}
        />
      </HorizontalList>
    </div>
  );
};

interface Props {
  title: string;
}
