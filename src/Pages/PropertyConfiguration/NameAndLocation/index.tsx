import type { KeyboardEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { Building } from "Icons/Building";
import { City } from "Icons/City";
import { Hash } from "Icons/Hash";
import { Location } from "Icons/Location";
import { MapArrow } from "Icons/MapArrow";
import { State } from "Icons/State";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NameAndLocation = memo(
  function NameAndLocation(_: Propless) {
    const property = useCurrentProperty();
    const [table, setTable] = useState(new Set<string>());
    const active = useMemo(() => table.size !== 0, [table.size]);
    const onKeyUp = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const copy = new Set(table);
        if (input.value !== input.defaultValue) {
          copy.add(input.name);
        } else {
          copy.delete(input.name);
        }
        setTable(copy);
      },
      [table],
    );
    return (
      <Tile TagName="form" className="name-and-location">
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
            name="name"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.name}
          />
          <Input
            required
            icon={<Location />}
            type="text"
            label="Address 1"
            name="address1"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.address1}
          />
          <Input
            required
            icon={<Location />}
            type="text"
            label="Address 2"
            name="address2"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.address2}
          />
          <Input
            required
            icon={<City />}
            type="text"
            label="City"
            name="city"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.city}
          />
          <Input
            required
            icon={<State />}
            type="text"
            label="State"
            name="state"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.state}
          />
          <Input
            required
            icon={<Hash />}
            type="text"
            label="Zip Code"
            name="zipCode"
            autoComplete="off"
            onKeyUp={onKeyUp}
            defaultValue={property.zipCode}
          />
        </div>
        <GradientTransitionButton label="Save" disabled={!active} />
      </Tile>
    );
  },
  () => true,
);
