import type { ChangeEvent } from "react";
import { memo, useCallback, useState } from "react";
import { useController, useLoadingState } from "@figliolia/react-hooks";
import { ColoredActionButton } from "Components/ColoredActionButton";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import { Team } from "Icons/Team";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import "./styles.scss";

export const OrgNameTile = memo(
  function OrgNameTile(_: Propless) {
    const { success, error, loading, setState } = useLoadingState();
    const controller = useController(new Controller(setState));
    const [organization, setOrganization] = useState(
      Scope.getState().currentOrganizationName,
    );
    const updateName = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setOrganization(e.target.value);
        setState("loading", true);
        void controller.executeQuery(e.target.value);
      },
      [controller, setState],
    );

    return (
      <Tile TagName="form" className="org-name">
        <h2>
          <Team aria-hidden /> {organization || "Your Organization"}
        </h2>
        <p>
          Please give a name to your organization. This can be your given name,
          a company name, or any name you&apos;d like visible to your staff
        </p>
        <Input
          required
          type="text"
          label="Company Name"
          icon={<Team />}
          autoComplete="off"
          value={organization}
          onChange={updateName}
          name="organization-name">
          <ColoredActionButton
            loading={loading}
            success={success}
            error={!!error}
          />
        </Input>
      </Tile>
    );
  },
  () => true,
);
