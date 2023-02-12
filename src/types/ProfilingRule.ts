import { ConnectionType, ProfilingType } from "@prisma/client";

export declare type ProfilingRule = {
  id: number;
  name: string;
  rule: string;
  profilingType: ProfilingType;
  databaseType: ConnectionType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export declare type RunProfilingRuleInput = {
  connectionId: number;
  selectedData: {
    tableName: string;
    column: {
      name: string;
    }[];
  }[];
};
