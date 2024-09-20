import { memo } from "react";
import type { Propless } from "Types/React";
import { Section } from "../Section";
import { Tile } from "./Tile";
import "./styles.scss";

export const About = memo(
  function About(_: Propless) {
    return (
      <Section className="marketing-about" id="about">
        <h1>
          A single <mark>hub</mark> to manage your <mark>properties</mark>
        </h1>
        <div className="grid">
          <Tile
            title="Residents"
            subtitle="Automate tenant and owner management, HOA dues, rent collection
              and more"
          />
          <Tile
            title="Maintenance"
            subtitle="Automate tasks and fix-its while tracking costs and scheduled
              repairs"
          />
          <Tile
            title="Financials"
            subtitle="Automate basic accounting tasks while gaining insights into how to
              improve year over year"
          />
        </div>
      </Section>
    );
  },
  () => true,
);
