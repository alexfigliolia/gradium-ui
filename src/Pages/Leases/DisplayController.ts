import { RentPaymentFrequency } from "GraphQL/Types";

export class DisplayController {
  public static readonly frequencyList = [
    RentPaymentFrequency.Day,
    RentPaymentFrequency.Month,
    RentPaymentFrequency.Year,
  ];

  public static readonly frequencyOptions = this.frequencyList.map(f => ({
    value: f,
    label: `${f[0].toUpperCase()}${f.slice(1)}`,
  }));
}
