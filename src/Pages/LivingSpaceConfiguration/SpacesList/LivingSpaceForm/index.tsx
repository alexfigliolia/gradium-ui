import { memo } from "react";
import type { LivingSpace } from "GraphQL/Types";
import { ConfigurableSpaceForm } from "Layouts/PropertyConfiguration";
import type { LivingSpacesModel } from "Models/LivingSpaces";
import { LivingSpaces } from "State/LivingSpaces";
import { Inputs } from "./Inputs";
import "./styles.scss";

export const LivingSpaceForm = memo(function LivingSpaceForm(
  space: LivingSpace,
) {
  return (
    <ConfigurableSpaceForm<LivingSpace, LivingSpacesModel>
      item={space}
      model={LivingSpaces}
      className="living-space-form"
      spaceDisplayName="Living Space">
      <Inputs />
    </ConfigurableSpaceForm>
  );
});
