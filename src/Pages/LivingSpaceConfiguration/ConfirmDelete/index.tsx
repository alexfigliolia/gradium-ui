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
    const [open, id, name] = useLivingSpaces(selectDeletion);
    return (
      <ConfirmDeleteConfigurableSpace
        id={id}
        open={open}
        name={name}
        type="living space"
        model={LivingSpaces}
      />
    );
  },
  () => true,
);
