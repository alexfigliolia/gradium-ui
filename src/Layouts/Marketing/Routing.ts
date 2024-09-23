import { useLayoutEffect, useState } from "react";
import { Home } from "Icons/Home";
import { Info } from "Icons/Info";
import { OpenLock } from "Icons/OpenLock";
import { Plug } from "Icons/Plug";
import { SectionLinks } from "Tools/SectionLinks";

export class Routing {
  public static readonly useActiveLink = this.generateHook();
  public static readonly SECTION_IDS = ["home", "about", "solutions"];
  public static readonly SectionLinks = new SectionLinks(
    this.SECTION_IDS,
    ".nav-header.marketing-header",
  );
  public static readonly ICONS = [Home, Info, Plug];
  public static readonly LOGIN_ICON = OpenLock;

  public static initialize() {
    this.SectionLinks.initialize();
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
