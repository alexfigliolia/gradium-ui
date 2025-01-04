import { debounce } from "lodash";
import { Subscriptable } from "@figliolia/event-emitter";
import type { Callback } from "Types/Generics";

export class SectionLinks extends Subscriptable<Callback<[string]>> {
  ids: Set<string>;
  activeSection = "";
  offsetSelectors: Set<string>;
  sections = new Set<HTMLElement>();
  offsetElements = new Set<HTMLElement>();
  private readonly listenerIDs = new Set<string>();
  constructor(ids: string[], ...offsetSelectors: string[]) {
    super();
    this.ids = new Set(ids);
    this.offsetSelectors = new Set(offsetSelectors);
  }

  public initialize() {
    if (typeof window == "undefined") {
      return;
    }
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
    this.activeSection = "";
    this.sections.clear();
    this.offsetElements.clear();
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
      window.scrollTo({
        top: node.offsetTop + 10 - this.getCurrentOffset(),
        behavior,
      });
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
    for (const selector of this.offsetSelectors) {
      const nodes = document.querySelectorAll(selector);
      for (const node of nodes) {
        this.offsetElements.add(node as HTMLElement);
      }
    }
  }

  private readonly findActiveSection = () => {
    const offset = this.getCurrentOffset();
    for (const section of this.sections) {
      const Y = window.scrollY;
      const sectionTop = section.offsetTop;
      if (
        Y >= sectionTop - offset &&
        Y < sectionTop + section.offsetHeight - offset
      ) {
        const ID = section.getAttribute("id") ?? "";
        if (ID !== this.activeSection) {
          this.activeSection = ID;
          void Promise.resolve().then(() => this.execute(ID));
        }
        return;
      }
    }
  };

  private readonly onScroll = debounce(this.findActiveSection, 0);

  private readonly detectHash = (behavior: ScrollBehavior = "instant") => {
    const hash = window.location.hash.slice(1);
    if (this.ids.has(hash)) {
      this.scrollTo(hash, behavior);
    }
  };

  private readonly onHashChange = () => {
    this.detectHash("smooth");
  };

  private getCurrentOffset() {
    let offset = 0;
    for (const element of this.offsetElements) {
      offset += element.offsetHeight;
    }
    return offset;
  }
}
