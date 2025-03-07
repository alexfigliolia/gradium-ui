import { LeaseStatus, RentPaymentFrequency } from "GraphQL/Types";

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

  public static displayStatus(status: LeaseStatus) {
    switch (status) {
      case LeaseStatus.Pending:
        return "Pending";
      case LeaseStatus.Terminated:
        return "Ended Early";
    }
  }
}
