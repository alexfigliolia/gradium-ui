import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import { Clock } from "Icons/Clock";
import { Key } from "Icons/Key";
import { Price } from "Icons/Price";
import { Ruler } from "Icons/Ruler";
import {
  Controller,
  PropertyConfigurationDropdown,
  PropertySpaceInputs,
} from "Layouts/PropertyConfiguration";
import type { IAmenity } from "Models/Amenities";
import { Amenities } from "State/Amenities";
import { DropDownOptions } from "Tools/DropDownOptions";
import "./styles.scss";

export const AmenityForm = memo(function AmenityForm({
  index,
  ...amenity
}: Props) {
  const controller = useController(new Controller(Amenities, index));
  controller.register(index);
  const { name, price, billed, open, close, footage, images, floorPlans } =
    amenity;
  const [editing, setEditing] = useState(!Amenities.validate(amenity));
  const photos = useMemo(
    () => [...images, ...floorPlans],
    [images, floorPlans],
  );

  const edit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const onDeleteClick = useCallback(() => {
    controller.onTrashClick(amenity);
  }, [amenity, controller]);

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.update("name", e.target.value);
    },
    [controller],
  );

  const onChangeFootage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.update("footage", e.target.value);
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
    <Tile TagName="form" className="spaces">
      <PropertySpaceInputs
        name={name}
        editing={editing}
        onEditClick={edit}
        nameFallback="New Amenity"
        className="amenity-inputs"
        onDeleteClick={onDeleteClick}
        photosAndFloorPlans={photos}>
        <Input
          type="text"
          label="Name"
          value={name}
          icon={<Key />}
          autoComplete="off"
          disabled={!editing}
          onChange={onChangeName}
          name={controller.createKey("name")}
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
          name={controller.createKey("footage")}>
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
          name={controller.createKey("open")}
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
          name={controller.createKey("close")}
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
          name={controller.createKey("price")}
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
          name={controller.createKey("billed")}
        />
      </PropertySpaceInputs>
    </Tile>
  );
});

interface Props extends IAmenity {
  index: number;
}
