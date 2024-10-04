import { memo } from "react";
import { Link } from "react-router-dom";
import { Tile } from "Components/Tile";
import { LeftArrow } from "Icons/LeftArrow";
import { StaffFilled } from "Icons/Staff";
import type { Propless } from "Types/React";
import { Invite } from "../Invite";
import "./styles.scss";

export const StaffTile = memo(
  function StaffTile(_: Propless) {
    return (
      <Tile className="staff-tile">
        <h2>
          <StaffFilled aria-hidden />
          Your Staff
        </h2>
        <Link to="/app/staff">
          View All <LeftArrow aria-hidden />
        </Link>
        <p>
          Staff can join your Gradium team through secure invites sent directly
          to their email addresses. You can send out invites below and manage
          your staff using the <Link to="/app/staff">Staff Page</Link>
        </p>
        <Invite />
      </Tile>
    );
  },
  () => true,
);
