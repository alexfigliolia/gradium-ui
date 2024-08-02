import { State } from "@figliolia/galena";
import type { ITheme, IThemeName } from "./types";

export class ThemeModel extends State<ITheme> {
  listener: string;
  browserSupport?: boolean;
  matcher?: MediaQueryList;
  constructor() {
    super("Theme", { theme: "light" });
    this.listener = this.subscribe(({ theme }) => {
      document.documentElement.setAttribute("data-theme", theme);
    });
  }

  public initialize() {
    this.browserSupport = !!window.matchMedia;
    this.matcher = window.matchMedia("(prefers-color-scheme: dark)");
    if (this.browserSupport && this.matcher.matches) {
      this.set("dark");
    }
    this.matcher.addEventListener("change", this.themeChange);
  }

  public destroy() {
    this.matcher?.removeEventListener("change", this.themeChange);
    this.unsubscribe(this.listener);
  }

  public toggle = () => {
    this.set(this.getState().theme === "dark" ? "light" : "dark");
  };

  private themeChange = (e: MediaQueryListEvent) => {
    this.set(e.matches ? "dark" : "light");
  };

  public set(theme: IThemeName) {
    this.priorityUpdate(state => {
      state.theme = theme;
    });
  }
}
