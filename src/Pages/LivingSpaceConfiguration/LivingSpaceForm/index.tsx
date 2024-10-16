import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  useController,
  useLoadingState,
  useUnmount,
} from "@figliolia/react-hooks";
import { Input } from "Components/Input";
import { Tile } from "Components/Tile";
import type { LivingSpace } from "GraphQL/Types";
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
import { LivingSpaces } from "State/LivingSpaces";
import { DropDownOptions } from "Tools/DropDownOptions";
import "./styles.scss";

export const LivingSpaceForm = memo(function LivingSpaceForm(
  space: LivingSpace,
) {
  const { id, name, type, beds, baths, footage, images, floorPlans } = space;
  const { setState, resetState: _, ...actionState } = useLoadingState();
  const controller = useController(
    new Controller<LivingSpace, typeof LivingSpaces>(LivingSpaces, id),
  );
  controller.register(id, setState);
  const [editing, setEditing] = useState(!LivingSpaces.validate(space));

  const toggleEdit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const photos = useMemo(
    () => [...images, ...floorPlans],
    [images, floorPlans],
  );

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
      controller.update("footage", parseFloat(e.target.value ?? "0"));
    },
    [controller],
  );

  useUnmount(() => {
    controller.destroy();
  });

  return (
    <Tile TagName="div" className="spaces">
      <PropertySpaceInputs
        name={name}
        {...actionState}
        editing={editing}
        toggleEdit={toggleEdit}
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
          name={controller.createKey("name", "living-space")}
        />
        <PropertyConfigurationDropdown<LivingSpace>
          value={type}
          label="Type"
          icon={<Area />}
          fallback="unit"
          property="type"
          disabled={!editing}
          className="type-dropdown"
          list={DropDownOptions.SPACE_TYPE}
          name={controller.createKey("type", "living-space")}
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
          name={controller.createKey("footage", "living-space")}>
          <div className="postfix">sqft</div>
        </Input>
        <PropertyConfigurationDropdown<LivingSpace>
          label="Beds"
          fallback={0}
          value={beds}
          icon={<Bed />}
          property="beds"
          disabled={!editing}
          list={DropDownOptions.BEDS_BATHS}
          name={controller.createKey("beds", "living-space")}
          onSelected={controller.update}
        />
        <PropertyConfigurationDropdown<LivingSpace>
          fallback={0}
          label="Baths"
          value={baths}
          icon={<Bath />}
          property="baths"
          disabled={!editing}
          list={DropDownOptions.BEDS_BATHS}
          onSelected={controller.update}
          name={controller.createKey("baths", "living-space")}
        />
      </PropertySpaceInputs>
    </Tile>
  );
});
