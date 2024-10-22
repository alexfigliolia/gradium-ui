import { Fragment, memo } from "react";
import { fetching, selectUnits, useLivingSpaces } from "State/LivingSpaces";
import type { Propless } from "Types/React";
import { NewSpaceButton } from "../NewSpaceButton";
import { LivingSpaceForm } from "./LivingSpaceForm";
import { LivingSpaceSkeleton } from "./LivingSpaceSkeleton";

export const SpacesList = memo(
  function SpacesList(_: Propless) {
    const loading = useLivingSpaces(fetching);
    const spaces = useLivingSpaces(selectUnits);
    if (loading) {
      return <LivingSpaceSkeleton />;
    }
    if (!spaces.length) {
      return null;
    }
    return (
      <Fragment>
        {spaces.map((space, i) => {
          return <LivingSpaceForm key={i} {...space} />;
        })}
        <NewSpaceButton />
      </Fragment>
    );
  },
  () => true,
);
