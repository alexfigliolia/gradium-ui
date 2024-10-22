import { memo } from "react";
import { InputSkeleton } from "Components/Skeletons";
import { FormSkeleton } from "Layouts/PropertyConfiguration";
import type { Propless } from "Types/React";

export const LivingSpaceSkeleton = memo(
  function LivingSpaceSkeleton(_: Propless) {
    return (
      <FormSkeleton
        title="New Living Space"
        inputGroupClassName="living-space-form">
        <InputSkeleton className="name-input" />
        <InputSkeleton className="dropdown type-dropdown" />
        <InputSkeleton className="number-input size-input" />
        <InputSkeleton className="dropdown beds-dropdown" />
        <InputSkeleton className="dropdown baths-dropdown" />
      </FormSkeleton>
    );
  },
  () => true,
);
