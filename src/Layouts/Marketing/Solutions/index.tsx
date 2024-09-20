import { memo } from "react";
import type { Propless } from "Types/React";
import { Section } from "../Section";
import { Mockup } from "./Mockup";
import "./styles.scss";

export const Solutions = memo(
  function Solutions(_: Propless) {
    return (
      <Section className="marketing-solutions" id="solutions">
        <h1>
          An Application for your <mark>residents</mark>, <mark>staff</mark>,
          and <mark>owners</mark>
        </h1>
        <div className="mockups">
          <Mockup />
          <Mockup />
          <Mockup />
        </div>
      </Section>
    );
  },
  () => true,
);
