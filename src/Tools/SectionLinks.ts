import { debounce } from "lodash";
import { Subscriptable } from "@figliolia/event-emitter";
import type { Callback } from "Types/Generics";

export class SectionLinks extends Subscriptable<Callback<[string]>> {
  activeSection = "";
  ids = new Set<string>();
  sections = new Set<HTMLElement>();
  private listenerIDs = new Set<string>();

  public initialize(ids: string[]) {
    if (typeof window == "undefined") {
      return;
    }
    this.ids = new Set(ids);
    this.registerNodes();
    this.findActiveSection();
    this.detectHash();
    document.addEventListener("scroll", this.onScroll);
    window.addEventListener("hashchange", this.onHashChange);
  }

  public destroy() {
    if (typeof window === "undefined") {
      return;
    }
    this.ids.clear();
    this.activeSection = "";
    this.sections.clear();
    this.removeAllListeners();
    document.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("hashchange", this.onHashChange);
  }

  public addEventListener(callback: Callback<[string]>) {
    const ID = this.register(callback);
    this.listenerIDs.add(ID);
    return ID;
  }

  public scrollTo(id: string, behavior: ScrollBehavior = "smooth") {
    if (!this.ids.has(id)) {
      return;
    }
    const node = document.getElementById(id);
    if (node) {
      window.scrollTo({ top: node.offsetTop + 10, behavior });
    }
  }

  private removeAllListeners() {
    for (const ID of this.listenerIDs) {
      this.remove(ID);
    }
    this.listenerIDs.clear();
  }

  private registerNodes() {
    for (const ID of this.ids) {
      const node = document.getElementById(ID);
      if (node) {
        this.sections.add(node);
      }
    }
  }

  private findActiveSection = () => {
    for (const section of this.sections) {
      const Y = window.scrollY;
      const sectionTop = section.offsetTop;
      if (Y >= sectionTop && Y < sectionTop + section.offsetHeight) {
        const ID = section.getAttribute("id") ?? "";
        if (ID !== this.activeSection) {
          this.activeSection = ID;
          void Promise.resolve().then(() => this.execute(ID));
        }
        return;
      }
    }
  };

  private onScroll = debounce(this.findActiveSection, 0);

  private detectHash = (behavior: ScrollBehavior = "instant") => {
    const hash = window.location.hash.slice(1);
    if (this.ids.has(hash)) {
      this.scrollTo(hash, behavior);
    }
  };

  private onHashChange = () => {
    this.detectHash("smooth");
  };
}
