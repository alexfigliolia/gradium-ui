import { PageTitle } from "Layouts/Management";
import type { Propless } from "Types/React";
import "./styles.scss";

export const LeasesList = (_: Propless) => {
  return (
    <div className="leases-list">
      <PageTitle title="Leases" className="lease-title" />
      <div className="list"></div>
    </div>
  );
};
