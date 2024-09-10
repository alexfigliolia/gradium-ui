import { memo, useMemo } from "react";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import { LivingSpaces, selectUnits, useLivingSpaces } from "State/LivingSpaces";
import type { Propless } from "Types/React";

export const NewSpaceButton = memo(
  function NewSpaceButton(_: Propless) {
    const spaces = useLivingSpaces(selectUnits);

    const createDisabled = useMemo(() => {
      const { length } = spaces;
      return !!length && !LivingSpaces.validate(spaces[length - 1]);
    }, [spaces]);

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
