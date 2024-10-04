import { memo, useState } from "react";
import { Tile } from "Components/Tile";
import type { Propless } from "Types/React";
import { InviteTable } from "./InviteTable";
import { StaffTable } from "./StaffTable";
import { Tabs } from "./Tabs";
import type { TabKey } from "./Tabs/Button";
import "./styles.scss";

export const Table = memo(
  function Table(_: Propless) {
    const [view, setView] = useState<TabKey>("staff");
    return (
      <Tile>
        <Tabs onChange={setView} active={view} />
        {view === "staff" ? <StaffTable /> : <InviteTable />}
      </Tile>
    );
  },
  () => true,
);
