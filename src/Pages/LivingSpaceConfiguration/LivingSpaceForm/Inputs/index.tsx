import type { ChangeEvent } from "react";
import { Fragment, memo, useCallback, useContext } from "react";
import { Input } from "Components/Input";
import type { LivingSpace } from "GraphQL/Types";
import { Area } from "Icons/Area";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { Key } from "Icons/Key";
import { Ruler } from "Icons/Ruler";
import type { ICSForm } from "Layouts/PropertyConfiguration";
import {
  CSFContext,
  PropertyConfigurationDropdown,
} from "Layouts/PropertyConfiguration";
import type { LivingSpacesModel } from "Models/LivingSpaces";
import { DropDownOptions } from "Tools/DropDownOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, controller, editing } =
      useContext<ICSForm<LivingSpace, LivingSpacesModel>>(CSFContext);

    const { name, type, beds, baths, footage } = item;

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

    return (
      <Fragment>
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
          className="size-input"
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
          className="beds-dropdown"
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
          className="baths-dropdown"
          list={DropDownOptions.BEDS_BATHS}
          onSelected={controller.update}
          name={controller.createKey("baths", "living-space")}
        />
      </Fragment>
    );
  },
  () => true,
);
