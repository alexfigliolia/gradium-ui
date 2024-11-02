import { Fragment, memo, useCallback, useContext, useMemo } from "react";
import { TimeInput } from "Components/TimeInput";
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
      () => controller.createKey("size", "amenity"),
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

    const onChangeOpen = useCallback(
      (value: string) => {
        controller.update("open", value);
      },
      [controller],
    );

    const onChangeClose = useCallback(
      (value: string) => {
        controller.update("close", value);
      },
      [controller],
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
          type="number"
          label="Size"
          step="any"
          property="size"
          name={sizeKey}
          icon={<Ruler />}
          value={item.size}
          autoComplete="off"
          disabled={!editing}
          onChange={controller.update}
          className="number-input size-input">
          <div className="postfix">sqft</div>
        </ConfigurableSpaceInput>
        <h4>Hours of Operation</h4>
        <TimeInput
          name={openKey}
          label="Open From"
          icon={<Clock />}
          property="open"
          disabled={!editing}
          onChange={onChangeOpen}
          value={item.open || "00:00:00"}
        />
        <TimeInput
          label="Closes At"
          icon={<Clock />}
          property="close"
          name={closeKey}
          disabled={!editing}
          onChange={onChangeClose}
          value={item.close || "00:00:00"}
        />
        <h4>Reservation Pricing</h4>
        <ConfigurableSpaceInput<Amenity>
          type="number"
          label="Price"
          step={0.01}
          name={priceKey}
          property="price"
          icon={<Price />}
          autoComplete="off"
          value={item.price}
          disabled={!editing}
          onChange={controller.update}
          className="number-input price-input"
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
