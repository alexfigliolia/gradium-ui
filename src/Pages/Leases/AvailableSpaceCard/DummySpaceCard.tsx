import { memo } from "react";
import { Fragment } from "react/jsx-runtime";
import { EmptyHomeSearch } from "Illustrations/EmptyHomeSearch";
import { AvailableSpaceCard } from "./AvailableSpaceCard";
import "./styles.scss";

export const DummySpaceCard = memo(
  function DummySpaceCard() {
    return (
      <AvailableSpaceCard
        id={-1}
        beds={1}
        baths={1}
        images={[]}
        name="dummy"
        className="dummy"
        propertyName="dummy"
        date={new Date().toISOString()}
        renderChildren={() => (
          <Fragment>
            <p>Unknown</p>
            <div className="overlay">
              <EmptyHomeSearch />
              <p>No Spaces Found</p>
            </div>
          </Fragment>
        )}
      />
    );
  },
  () => true,
);
