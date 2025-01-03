import { memo } from "react";
import type { Propless } from "Types/React";
import { Slider } from "../Slider";
import "../styles.scss";
import "./styles.scss";

export const PropertyLinkSkeleton = memo(function PropertyLinkSkeleton(
  _: Propless,
) {
  return (
    <div className="property-link skeleton">
      <Slider images={[]} />
      <div className="pl-info">
        <h3 className="skeleton-text">Loading Property</h3>
        <address>
          <p className="skeleton-text">Loading Address</p>
          <p className="skeleton-text">Unit</p>
          <p>
            <span className="skeleton-text">Loading City</span>
            &nbsp;&nbsp;
            <span className="skeleton-text">State</span>
            &nbsp;&nbsp;
            <span className="skeleton-text">and Zip Code</span>
          </p>
        </address>
        <div>
          <div className="link-placeholder skeleton-text" />
        </div>
      </div>
    </div>
  );
});
