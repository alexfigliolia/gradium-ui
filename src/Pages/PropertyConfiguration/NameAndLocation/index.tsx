import { memo, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useFormState,
  useUnmount,
} from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import { Building } from "Icons/Building";
import { City } from "Icons/City";
import { Hash } from "Icons/Hash";
import { Location } from "Icons/Location";
import { MapArrow } from "Icons/MapArrow";
import { State } from "Icons/State";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import "./styles.scss";

export const NameAndLocation = memo(
  function NameAndLocation(_: Propless) {
    const property = useProperties(currentProperty);
    const [table, setTable] = useState(new Set<string>());
    const active = useMemo(() => table.size !== 0, [table.size]);
    const controller = useController(new Controller(setTable));
    const { loading, success, error, onSubmit } = useFormState(
      controller.submit,
    );

    useUnmount(() => {
      controller.destroy();
    });

    const classes = useClassNames("name-and-location", { disabled: !active });

    return (
      <Tile TagName="form" className={classes} onSubmit={onSubmit}>
        <h2>
          <MapArrow aria-hidden />
          Basic Info
        </h2>
        <div className="input-group">
          <Input
            required
            icon={<Building />}
            type="text"
            label="Nickname"
            name="property-name"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.name}
          />
          <Input
            icon={<Location />}
            type="text"
            label="Address 1"
            name="address1"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.address1}
          />
          <Input
            icon={<Location />}
            type="text"
            label="Address 2"
            name="address2"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.address2}
          />
          <Input
            icon={<City />}
            type="text"
            label="City"
            name="city"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.city}
          />
          <Input
            icon={<State />}
            type="text"
            label="State"
            name="state"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.state}
          />
          <Input
            icon={<Hash />}
            type="text"
            label="Zip Code"
            name="zipCode"
            autoComplete="off"
            onKeyUp={controller.onKeyUp}
            defaultValue={property.zipCode}
          />
        </div>
        <ActionButton
          error={!!error}
          loading={loading}
          disabled={!active}
          success={success}>
          Save!
        </ActionButton>
      </Tile>
    );
  },
  () => true,
);
