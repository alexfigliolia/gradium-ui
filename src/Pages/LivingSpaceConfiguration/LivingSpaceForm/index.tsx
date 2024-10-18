import { memo, useCallback } from "react";
import type { LivingSpace } from "GraphQL/Types";
import {
  ConfigurableSpaceForm,
  type Controller,
} from "Layouts/PropertyConfiguration";
import type { LivingSpacesModel } from "Models/LivingSpaces";
import { LivingSpaces } from "State/LivingSpaces";
import { Inputs } from "./Inputs";
import "./styles.scss";

export const LivingSpaceForm = memo(function LivingSpaceForm(
  space: LivingSpace,
) {
  const renderForm = useCallback(
    (
      controller: Controller<LivingSpace, LivingSpacesModel>,
      editing: boolean,
    ) => {
      return <Inputs editing={editing} controller={controller} {...space} />;
    },
    [space],
  );

  return (
    <ConfigurableSpaceForm<LivingSpace, LivingSpacesModel>
      {...space}
      render={renderForm}
      model={LivingSpaces}
      className="living-space-form"
      spaceDisplayName="Living Space"
    />
  );
});
