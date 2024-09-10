import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import { Area } from "Icons/Area";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { Key } from "Icons/Key";
import { Ruler } from "Icons/Ruler";
import {
  Controller,
  PropertyConfigurationDropdown,
  PropertySpaceInputs,
} from "Layouts/PropertyConfiguration";
import type { IUnit } from "Models/LivingSpaces";
import { LivingSpaces } from "State/LivingSpaces";
import { DropDownOptions } from "Tools/DropDownOptions";
import "./styles.scss";

export const LivingSpaceForm = memo(function LivingSpaceForm({
  index,
  ...space
}: Props) {
  const controller = useController(new Controller(LivingSpaces, index));
  controller.register(index);
  const { name, type, beds, baths, footage, images, floorPlans } = space;
  const [editing, setEditing] = useState(!LivingSpaces.validate(space));
  const photos = useMemo(
    () => [...images, ...floorPlans],
    [images, floorPlans],
  );

  const edit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const onTrashClick = useCallback(() => {
    controller.onTrashClick(space);
  }, [space, controller]);

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

  return (
    <Tile TagName="form" className="spaces">
      <PropertySpaceInputs
        name={name}
        editing={editing}
        onEditClick={edit}
        photosAndFloorPlans={photos}
        onDeleteClick={onTrashClick}
        className="living-space-inputs"
        nameFallback="New Living Space">
        <Input
          type="text"
          label="Name"
          value={name}
          icon={<Key />}
          autoComplete="off"
          disabled={!editing}
          className="name-input"
          onChange={onChangeName}
          name={controller.createKey("name")}
        />
        <PropertyConfigurationDropdown<IUnit>
          value={type}
          label="Type"
          icon={<Area />}
          fallback="unit"
          property="type"
          disabled={!editing}
          className="type-dropdown"
          list={DropDownOptions.SPACE_TYPE}
          name={controller.createKey("type")}
          onSelected={controller.update}
        />
        <Input
          type="number"
          label="Size"
          icon={<Ruler />}
          autoComplete="off"
          disabled={!editing}
          className="number-input"
          value={footage.toString()}
          onChange={onChangeFootage}
          name={controller.createKey("footage")}>
          <div className="postfix">sqft</div>
        </Input>
        <PropertyConfigurationDropdown<IUnit>
          label="Beds"
          fallback={0}
          value={beds}
          icon={<Bed />}
          property="beds"
          disabled={!editing}
          list={DropDownOptions.BEDS_BATHS}
          name={controller.createKey("beds")}
          onSelected={controller.update}
        />
        <PropertyConfigurationDropdown<IUnit>
          fallback={0}
          label="Baths"
          value={baths}
          icon={<Bath />}
          property="baths"
          disabled={!editing}
          list={DropDownOptions.BEDS_BATHS}
          onSelected={controller.update}
          name={controller.createKey("baths")}
        />
      </PropertySpaceInputs>
    </Tile>
  );
});

interface Props extends IUnit {
  index: number;
}
