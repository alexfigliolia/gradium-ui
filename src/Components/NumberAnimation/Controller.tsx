export class Controller {
  public static START_COLUMN = (<span key="space">&nbsp;</span>);
  public static NUMBERS = Array.from({ length: 10 }, (_, i) => i).reverse();
  public static NUMBER_COLUMN = [
    ...this.NUMBERS.map(number => {
      return <span key={number}>{number}</span>;
    }),
    this.START_COLUMN,
  ];

  public static parse(value: string) {
    const str = value.toString();
    const columns: (string | number)[] = [];
    for (const char of str) {
      if (this.isDigit(char)) {
        columns.push(parseInt(char));
      } else {
        columns.push(char);
      }
    }
    return columns;
  }

  public static isDigit(value: string | number) {
    // @ts-ignore
    return parseInt(value) == value;
  }
}
