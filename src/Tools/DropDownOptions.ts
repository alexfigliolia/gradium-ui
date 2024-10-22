export class DropDownOptions {
  public static BEDS = Array.from({ length: 21 }, (_, i) => ({
    value: i.toString(),
  }));
  public static BATHS = this._baths();

  public static YES_NO = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  public static LEASE_TERM = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  public static SPACE_TYPE = [
    { value: "unit", label: "Unit" },
    { value: "dwelling", label: "Dwelling" },
  ];

  public static BILLED_BY = [
    { value: "hour", label: "Hour" },
    { value: "day", label: "Day" },
  ];

  public static HOURS = [
    { value: "12am", label: "12 AM" },
    { value: "1am", label: "1 AM" },
    { value: "2am", label: "2 AM" },
    { value: "3am", label: "3 AM" },
    { value: "4am", label: "4 AM" },
    { value: "5am", label: "5 AM" },
    { value: "6am", label: "6 AM" },
    { value: "7am", label: "7 AM" },
    { value: "8am", label: "8 AM" },
    { value: "9am", label: "9 AM" },
    { value: "10am", label: "10 AM" },
    { value: "11am", label: "11 AM" },
    { value: "12pm", label: "12 PM" },
    { value: "1pm", label: "1 PM" },
    { value: "2pm", label: "2 PM" },
    { value: "3pm", label: "3 PM" },
    { value: "4pm", label: "4 PM" },
    { value: "5pm", label: "5 PM" },
    { value: "6pm", label: "6 PM" },
    { value: "7pm", label: "7 PM" },
    { value: "8pm", label: "8 PM" },
    { value: "9pm", label: "9 PM" },
    { value: "10pm", label: "10 PM" },
    { value: "11pm", label: "11 PM" },
  ];

  private static _baths() {
    let value = -0.5;
    return Array.from({ length: 41 }, () => {
      value += 0.5;
      return { value: value.toString() };
    });
  }
}
