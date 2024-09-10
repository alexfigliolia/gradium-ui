import { memo } from "react";
import { Page } from "Components/Page";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import Leases from "Pages/Leases";
import type { Propless } from "Types/React";
import { Tabs } from "./Tabs";
import "./styles.scss";

export default memo(
  function Manage(_: Propless) {
    const { name } = useCurrentProperty();
    return (
      <Page label={`Manage ${name}`} className="manage-property">
        <Tabs />
        <div className="outlet">
          <Leases />
        </div>
      </Page>
    );
  },
  () => true,
);
