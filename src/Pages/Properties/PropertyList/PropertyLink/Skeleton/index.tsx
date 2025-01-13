import { memo } from "react";
import type { GradiumImage } from "GraphQL/Types";
import type { Propless } from "Types/React";
import { Slider } from "../Slider";
import "../styles.scss";
import "./styles.scss";

const EMPTY: GradiumImage[] = [];

export const PropertyLinkSkeleton = memo(
  function PropertyLinkSkeleton(_: Propless) {
    return (
      <div className="property-link skeleton">
        <Slider images={EMPTY} />
        <div className="pl-info">
          <h3 className="skeleton-text">Loading Property</h3>
          <address>
            <p className="skeleton-text">Loading Address</p>
            <p className="skeleton-text">Unit</p>
            <p>
              <span className="skeleton-text">Loading City</span>
              <span className="skeleton-text">State</span>
              <span className="skeleton-text">and Zip</span>
            </p>
          </address>
          <div>
            <div className="link-placeholder skeleton-text" />
          </div>
        </div>
      </div>
    );
  },
  () => true,
);
