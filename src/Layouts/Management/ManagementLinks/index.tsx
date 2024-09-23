import { memo } from "react";
import { Building } from "Icons/Building";
import { City } from "Icons/City";
import { Money } from "Icons/Money";
import { Performance } from "Icons/Performance";
import { allProperties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Link } from "./Link";
import "./styles.scss";

export const ManagementLinks = memo(
  function ManagementLinks(_: Propless) {
    const properties = useProperties(allProperties);
    return (
      <nav className="management-links">
        <Link to="/app" Icon={City} label="Properties" />
        {properties.map(({ name, slug }) => {
          const link = `/app/manage/${slug}`;
          return (
            <Link
              key={slug}
              to={link}
              Icon={Building}
              className="is-property"
              label={name}
            />
          );
        })}
        <Link to="/" Icon={Performance} label="Performance" />
        <Link to="/" Icon={Money} label="Finance" />
      </nav>
    );
  },
  () => true,
);
