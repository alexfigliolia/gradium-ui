import { memo } from "react";
import { ConfirmDeleteConfigurableSpace } from "Layouts/PropertyConfiguration";
import {
  LivingSpaces,
  selectDeletion,
  useLivingSpaces,
} from "State/LivingSpaces";
import type { Propless } from "Types/React";

export const ConfirmDelete = memo(
  function ConfirmDelete(_: Propless) {
    const [id, name] = useLivingSpaces(selectDeletion);
    return (
      <ConfirmDeleteConfigurableSpace
        id={id}
        name={name}
        type="living space"
        model={LivingSpaces}
      />
    );
  },
  () => true,
);
