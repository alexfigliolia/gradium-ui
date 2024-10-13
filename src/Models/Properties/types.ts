import type { AdminBasicProperty } from "GraphQL/Types";

export interface IProperties {
  current: number;
  loading: boolean;
  properties: Record<number, AdminBasicProperty>;
}
