import type { ChangeEvent } from "react";
import { Fragment, memo, useCallback } from "react";
import { Input } from "Components/Input";
import { Clock } from "Icons/Clock";
import { Key } from "Icons/Key";
import { Price } from "Icons/Price";
import { Ruler } from "Icons/Ruler";
import {
  type Controller,
  PropertyConfigurationDropdown,
} from "Layouts/PropertyConfiguration";
import type { AmenitiesModel, IAmenity } from "Models/Amenities";
import { DropDownOptions } from "Tools/DropDownOptions";

export const Inputs = memo(function Inputs({
  editing,
  controller,
  name,
  footage,
  open,
  close,
  price,
  billed,
}: Props) {
  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.update("name", e.target.value);
    },
    [controller],
  );

  const onChangeFootage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.update("footage", parseFloat(e.target.value || "0"));
    },
    [controller],
  );

  const onChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.update("price", e.target.value);
    },
    [controller],
  );

  return (
    <Fragment>
      <Input
        type="text"
        label="Name"
        value={name}
        icon={<Key />}
        autoComplete="off"
        disabled={!editing}
        onChange={onChangeName}
        name={controller.createKey("name", "amenity")}
      />
      <Input
        type="number"
        label="Size"
        icon={<Ruler />}
        autoComplete="off"
        disabled={!editing}
        value={footage.toString()}
        onChange={onChangeFootage}
        className="number-input size-input"
        name={controller.createKey("footage", "amenity")}>
        <div className="postfix">sqft</div>
      </Input>
      <h4>Hours of Operation</h4>
      <PropertyConfigurationDropdown<IAmenity>
        fallback="12am"
        label="Open From"
        value={open}
        icon={<Clock />}
        property="open"
        disabled={!editing}
        list={DropDownOptions.HOURS}
        onSelected={controller.update}
        name={controller.createKey("open", "amenity")}
      />
      <PropertyConfigurationDropdown<IAmenity>
        fallback="12am"
        label="Closes At"
        value={close}
        icon={<Clock />}
        property="close"
        disabled={!editing}
        list={DropDownOptions.HOURS}
        onSelected={controller.update}
        name={controller.createKey("close", "amenity")}
      />
      <h4>Reservation Pricing</h4>
      <Input
        type="number"
        label="Price"
        icon={<Price />}
        autoComplete="off"
        disabled={!editing}
        value={price.toString()}
        onChange={onChangePrice}
        className="number-input price-input"
        name={controller.createKey("price", "amenity")}
      />
      <PropertyConfigurationDropdown<IAmenity>
        fallback="hour"
        label="Billed By"
        value={billed}
        icon={<Clock />}
        property="billed"
        disabled={!editing}
        list={DropDownOptions.BILLED_BY}
        onSelected={controller.update}
        name={controller.createKey("billed", "amenity")}
      />
    </Fragment>
  );
});

interface Props extends IAmenity {
  editing: boolean;
  controller: Controller<IAmenity, AmenitiesModel>;
}
