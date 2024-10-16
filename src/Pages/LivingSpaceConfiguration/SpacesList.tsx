import { Fragment, memo } from "react";
import { selectUnits, useLivingSpaces } from "State/LivingSpaces";
import type { Propless } from "Types/React";
import { LivingSpaceForm } from "./LivingSpaceForm";
import { NewSpaceButton } from "./NewSpaceButton";

export const SpacesList = memo(function SpacesList(_: Propless) {
  const spaces = useLivingSpaces(selectUnits);
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
});
