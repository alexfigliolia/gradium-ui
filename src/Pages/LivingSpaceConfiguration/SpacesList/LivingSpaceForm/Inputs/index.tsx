import { Fragment, memo, useContext } from "react";
import type { LivingSpace } from "GraphQL/Types";
import { Area } from "Icons/Area";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { Key } from "Icons/Key";
import { Ruler } from "Icons/Ruler";
import type { ICSForm } from "Layouts/PropertyConfiguration";
import {
  ConfigurableSpaceDropDown,
  ConfigurableSpaceInput,
  CSFContext,
} from "Layouts/PropertyConfiguration";
import type { LivingSpacesModel } from "Models/LivingSpaces";
import { DropDownOptions } from "Tools/DropDownOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, controller, editing } = useContext(
      CSFContext,
    ) as unknown as ICSForm<LivingSpace, LivingSpacesModel>;

    const { name, type, beds, baths, size } = item;

    return (
      <Fragment>
        <ConfigurableSpaceInput<LivingSpace>
          type="text"
          label="Name"
          value={name}
          icon={<Key />}
          property="name"
          autoComplete="off"
          disabled={!editing}
          className="name-input"
          onChange={controller.update}
          name={controller.createKey("name", "living-space")}
        />
        <ConfigurableSpaceDropDown<LivingSpace>
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
        <ConfigurableSpaceInput<LivingSpace>
          type="number"
          label="Size"
          step="any"
          value={size}
          property="size"
          icon={<Ruler />}
          autoComplete="off"
          disabled={!editing}
          className="size-input"
          onChange={controller.update}
          name={controller.createKey("size", "living-space")}>
          <div className="postfix">sqft</div>
        </ConfigurableSpaceInput>
        <ConfigurableSpaceDropDown<LivingSpace>
          label="Beds"
          fallback={0}
          value={beds}
          icon={<Bed />}
          property="beds"
          disabled={!editing}
          className="beds-dropdown"
          list={DropDownOptions.BEDS}
          name={controller.createKey("beds", "living-space")}
          onSelected={controller.update}
        />
        <ConfigurableSpaceDropDown<LivingSpace>
          fallback={0}
          label="Baths"
          icon={<Bath />}
          property="baths"
          disabled={!editing}
          value={baths.toString()}
          className="baths-dropdown"
          list={DropDownOptions.BATHS}
          onSelected={controller.update}
          name={controller.createKey("baths", "living-space")}
        />
      </Fragment>
    );
  },
  () => true,
);
