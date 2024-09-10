export interface IDataPoint {
  date: Date;
  value: number;
}

export interface OccupancyPerSpace {
  name: string;
  occupancy: number;
}

export interface CompletionRatePerStaffMember {
  name: string;
  rate: number;
}

export interface IDashboard {
  startDate: string;
  endDate: string;
  occupancy: number;
  income: IDataPoint[];
  expenses: IDataPoint[];
  issueCompletion: number;
  completionRatesPerStaffMember: CompletionRatePerStaffMember[];
  inDemandSpaces: OccupancyPerSpace[];
}
