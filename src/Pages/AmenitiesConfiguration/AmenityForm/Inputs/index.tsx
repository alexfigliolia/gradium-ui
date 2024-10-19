import type { ChangeEvent } from "react";
import { Fragment, memo, useCallback, useContext } from "react";
import { Input } from "Components/Input";
import type { Amenity } from "GraphQL/Types";
import { Clock } from "Icons/Clock";
import { Key } from "Icons/Key";
import { Price } from "Icons/Price";
import { Ruler } from "Icons/Ruler";
import type { ICSForm } from "Layouts/PropertyConfiguration";
import {
  CSFContext,
  PropertyConfigurationDropdown,
} from "Layouts/PropertyConfiguration";
import type { AmenitiesModel } from "Models/Amenities";
import { DropDownOptions } from "Tools/DropDownOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, editing, controller } = useContext(
      CSFContext,
    ) as unknown as ICSForm<Amenity, AmenitiesModel>;

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
        controller.update("price", parseFloat(e.target.value ?? "0"));
      },
      [controller],
    );

    return (
      <Fragment>
        <Input
          type="text"
          label="Name"
          value={item.name}
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
          value={item.footage.toString()}
          onChange={onChangeFootage}
          className="number-input size-input"
          name={controller.createKey("footage", "amenity")}>
          <div className="postfix">sqft</div>
        </Input>
        <h4>Hours of Operation</h4>
        <PropertyConfigurationDropdown<Amenity>
          fallback="12am"
          label="Open From"
          value={item.open}
          icon={<Clock />}
          property="open"
          disabled={!editing}
          list={DropDownOptions.HOURS}
          onSelected={controller.update}
          name={controller.createKey("open", "amenity")}
        />
        <PropertyConfigurationDropdown<Amenity>
          fallback="12am"
          label="Closes At"
          value={item.close}
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
          value={item.price.toString()}
          onChange={onChangePrice}
          className="number-input price-input"
          name={controller.createKey("price", "amenity")}
        />
        <PropertyConfigurationDropdown<Amenity>
          fallback="hour"
          label="Billed By"
          value={item.billed}
          icon={<Clock />}
          property="billed"
          disabled={!editing}
          list={DropDownOptions.BILLED_BY}
          onSelected={controller.update}
          name={controller.createKey("billed", "amenity")}
        />
      </Fragment>
    );
  },
  () => true,
);
