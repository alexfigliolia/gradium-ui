import { useLayoutEffect, useState } from "react";
import { SectionLinks } from "Tools/SectionLinks";

export class Routing {
  public static readonly SectionLinks = new SectionLinks();
  public static readonly useActiveLink = this.generateHook();
  public static readonly SECTION_IDS = ["home", "about", "solutions"];

  public static initialize() {
    this.SectionLinks.initialize(this.SECTION_IDS);
  }

  public static destroy() {
    this.SectionLinks.destroy();
  }

  private static generateHook() {
    return () => {
      const [activeLink, setActiveLink] = useState("");
      useLayoutEffect(() => {
        this.SectionLinks.addEventListener(setActiveLink);
      }, []);
      return activeLink;
    };
  }

  public static scrollTo(id: string) {
    this.SectionLinks.scrollTo(id);
  }
}
