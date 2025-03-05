import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { GradiumPerson } from "GraphQL/Types";

export class Controller {
  public readonly setState: SetState;
  constructor(setState: SetState) {
    this.setState = setState;
  }

  public resetState() {
    this.setState(Controller.initialState());
  }

  public readonly onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      this.setState(v => ({ ...v, price: value }));
    }
  };

  public readonly setEnd = this.stateSetter("end");
  public readonly setUnit = this.stateSetter("unit");
  public readonly setStart = this.stateSetter("start");
  public readonly setFrequency = this.stateSetter("frequency");

  public readonly addLessee = () => {
    this.setState(v => ({
      ...v,
      lessees: [...v.lessees, { name: "", email: "" }],
    }));
  };

  public readonly deleteLessee = (index: number) => () => {
    this.setState(v => ({
      ...v,
      lessees: v.lessees.filter((_, i) => i !== index),
    }));
  };

  public readonly onChangeLessee =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "name" || name === "email") {
        this.setState(v => ({
          ...v,
          lessees: v.lessees.map((v, i) =>
            i === index ? { ...v, [name]: value } : v,
          ),
        }));
      }
    };

  public compileNames(lessees: Omit<GradiumPerson, "id">[]) {
    const names = lessees.map(l => l.name);
    const { length } = names;
    if (length === 1) {
      return `${names[0]} has`;
    }
    if (length === 2) {
      return `${names[0]} and ${names[1]} have`;
    }
    return lessees
      .map((l, i) => (i !== length - 1 ? `${l.name}, ` : `and ${l.name} have`))
      .join("");
  }

  public static initialState(unit = "") {
    return {
      end: "",
      unit,
      start: "",
      price: "",
      frequency: "",
      lessees: [{ name: "", email: "" }],
    };
  }

  private stateSetter<K extends keyof IState>(key: K) {
    return (value: IState[K]) => {
      this.setState(v => ({ ...v, [key]: value }));
    };
  }
}

export interface IState {
  end: string;
  unit: string;
  start: string;
  price: string;
  frequency: string;
  lessees: Omit<GradiumPerson, "id">[];
}

type SetState = Dispatch<SetStateAction<IState>>;
