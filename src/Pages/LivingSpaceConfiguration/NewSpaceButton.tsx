import { memo, useMemo } from "react";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import {
  fetching,
  LivingSpaces,
  selectUnits,
  useLivingSpaces,
} from "State/LivingSpaces";
import type { Propless } from "Types/React";

export const NewSpaceButton = memo(
  function NewSpaceButton(_: Propless) {
    const loading = useLivingSpaces(fetching);
    const spaces = useLivingSpaces(selectUnits);

    const createDisabled = useMemo(() => {
      const { length } = spaces;
      return (
        loading || (!!length && !LivingSpaces.validate(spaces[length - 1]))
      );
    }, [spaces, loading]);

    return (
      <GradientTransitionButton
        type="button"
        label="New Space"
        disabled={createDisabled}
        onClick={LivingSpaces.create}
      />
    );
  },
  () => true,
);
