import { Fragment, memo, useContext } from "react";
import type { Amenity } from "GraphQL/Types";
import { Clock } from "Icons/Clock";
import { Key } from "Icons/Key";
import { Price } from "Icons/Price";
import { Ruler } from "Icons/Ruler";
import type { ICSForm } from "Layouts/PropertyConfiguration";
import {
  ConfigurableSpaceDropDown,
  ConfigurableSpaceInput,
  CSFContext,
} from "Layouts/PropertyConfiguration";
import type { AmenitiesModel } from "Models/Amenities";
import { DropDownOptions } from "Tools/DropDownOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, editing, controller } = useContext(
      CSFContext,
    ) as unknown as ICSForm<Amenity, AmenitiesModel>;
    return (
      <Fragment>
        <ConfigurableSpaceInput<Amenity>
          type="text"
          label="Name"
          property="name"
          value={item.name}
          icon={<Key />}
          autoComplete="off"
          disabled={!editing}
          onChange={controller.update}
          name={controller.createKey("name", "amenity")}
        />
        <ConfigurableSpaceInput<Amenity>
          type="number"
          label="Size"
          step="any"
          property="size"
          icon={<Ruler />}
          value={item.size}
          autoComplete="off"
          disabled={!editing}
          onChange={controller.update}
          className="number-input size-input"
          name={controller.createKey("size", "amenity")}>
          <div className="postfix">sqft</div>
        </ConfigurableSpaceInput>
        <h4>Hours of Operation</h4>
        <ConfigurableSpaceDropDown<Amenity>
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
        <ConfigurableSpaceDropDown<Amenity>
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
        <ConfigurableSpaceInput<Amenity>
          type="number"
          label="Price"
          step={0.01}
          property="price"
          icon={<Price />}
          autoComplete="off"
          value={item.price}
          disabled={!editing}
          onChange={controller.update}
          className="number-input price-input"
          name={controller.createKey("price", "amenity")}
        />
        <ConfigurableSpaceDropDown<Amenity>
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
