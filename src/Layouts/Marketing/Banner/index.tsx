import { memo } from "react";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Banner = memo(
  function Banner(_: Propless) {
    return (
      <section className="marketing-banner" id="home">
        <div>
          <h1>Staff</h1>
          <h1>Residents</h1>
          <h1>Easy.</h1>
        </div>
      </section>
    );
  },
  () => true,
);
