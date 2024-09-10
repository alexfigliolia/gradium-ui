import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";

export interface IState {
  screen: IDateScreen;
  yearInput: boolean;
  selectedYear: number;
  selectedMonth: number;
  typedYear: string;
  monthList: string[];
}

export interface IProps extends OptionalChildren {
  value: string;
  className?: string;
  onChange?: Callback<[date: string]>;
}

export type IDateScreen = "date" | "month";

export interface IDate {
  date: Date;
  className?: string;
}
