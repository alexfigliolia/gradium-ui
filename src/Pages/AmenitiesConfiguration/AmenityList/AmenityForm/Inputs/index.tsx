import { Fragment, memo, useContext, useMemo } from "react";
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
import { PropertyOptions } from "Tools/PropertyOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, editing, controller } = useContext(
      CSFContext,
    ) as unknown as ICSForm<Amenity, AmenitiesModel>;

    const nameKey = useMemo(
      () => controller.createKey("name", "amenity"),
      [controller],
    );
    const sizeKey = useMemo(
      () => controller.createKey("capacity", "amenity"),
      [controller],
    );
    const openKey = useMemo(
      () => controller.createKey("open", "amenity"),
      [controller],
    );
    const closeKey = useMemo(
      () => controller.createKey("close", "amenity"),
      [controller],
    );
    const priceKey = useMemo(
      () => controller.createKey("price", "amenity"),
      [controller],
    );
    const billKey = useMemo(
      () => controller.createKey("billed", "amenity"),
      [controller],
    );

    const open = useMemo(
      () => controller.parseTimeFromDate(item.open),
      [item.open, controller],
    );
    const close = useMemo(
      () => controller.parseTimeFromDate(item.close),
      [item.close, controller],
    );

    return (
      <Fragment>
        <ConfigurableSpaceInput<Amenity>
          type="text"
          label="Name"
          name={nameKey}
          property="name"
          value={item.name}
          icon={<Key />}
          autoComplete="off"
          disabled={!editing}
          onChange={controller.update}
        />
        <ConfigurableSpaceInput<Amenity>
          step={1}
          type="number"
          label="Capacity"
          property="capacity"
          name={sizeKey}
          icon={<Ruler />}
          inputMode="numeric"
          value={item.capacity}
          autoComplete="off"
          disabled={!editing}
          onChange={controller.updateInt}
          className="capacity-input">
          <div className="postfix">People</div>
        </ConfigurableSpaceInput>
        <h4>Hours of Operation</h4>
        <ConfigurableSpaceInput<Amenity>
          name={openKey}
          type="time"
          label="Open From"
          icon={<Clock />}
          property="open"
          value={open}
          disabled={!editing}
          onChange={controller.updateTimeToDate}
        />
        <ConfigurableSpaceInput<Amenity>
          label="Closes At"
          icon={<Clock />}
          type="time"
          property="close"
          name={closeKey}
          disabled={!editing}
          value={close}
          onChange={controller.updateTimeToDate}
        />
        <h4>Reservation Pricing</h4>
        <ConfigurableSpaceInput<Amenity>
          type="number"
          label="Price"
          step={0.01}
          name={priceKey}
          property="price"
          icon={<Price />}
          inputMode="decimal"
          autoComplete="off"
          value={item.price}
          disabled={!editing}
          onChange={controller.update}
          className="price-input"
        />
        <ConfigurableSpaceDropDown<Amenity>
          fallback="hour"
          name={billKey}
          label="Billed By"
          value={item.billed}
          icon={<Clock />}
          property="billed"
          disabled={!editing}
          onChange={controller.update}
          list={PropertyOptions.BILLED_BY}
        />
      </Fragment>
    );
  },
  () => true,
);
