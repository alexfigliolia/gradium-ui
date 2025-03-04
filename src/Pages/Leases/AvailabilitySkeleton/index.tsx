import { HorizontalList } from "Components/HorizontalList";
import { SearchBar } from "Components/SearchBar";
import { PageTitle } from "Layouts/Management";
import { AvailableSpaceCard } from "../AvailableSpaceCard";
import "./styles.scss";

const LIST = new Array(4).fill(null);

export const AvailabilitySkeleton = ({ title }: Props) => {
  return (
    <div className="availability-skeleton">
      <PageTitle title={title} className="lease-title">
        <SearchBar placeholder="Search" />
      </PageTitle>
      <HorizontalList>
        {LIST.map((_, i) => (
          <AvailableSpaceCard
            id={i}
            key={i}
            beds={1}
            baths={1}
            images={[]}
            name="Loading"
            className="skeleton"
            propertyName="Loading"
            date={new Date().toISOString()}
            renderChildren={() => <p>Loading Availability</p>}
          />
        ))}
      </HorizontalList>
    </div>
  );
};

interface Props {
  title: string;
}
