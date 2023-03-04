import {
  ConnectionType,
  Frequency,
  Prisma,
  ProfilingType,
} from "@prisma/client";
import { Connection } from "./Connection";

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

export declare type CreateProfilingSchedule = {
  // id: number;
  name: string;
  processName: string;
  startDate: Date;
  endDate: Date;
  frequency: Frequency;
  // selectedData: Prisma.JsonValue;
  // connectionId: number;
  // createdAt: Date;
  // updatedAt: Date;
};

export declare type CreateProfilingScheduleInput = {
  connectionId: number;
  selectedData: {
    tableName: string;
    column: {
      name: string;
    }[];
  }[];
  schedule: CreateProfilingSchedule;
};

export declare type ProfilingSchedule = {
  id: number;
  name: string;
  processName: string;
  startDate: Date;
  endDate: Date;
  frequency: Frequency;
  selectedData: Prisma.JsonValue;
  connectionId: number;
  connection: Connection;
  createdAt: Date;
  updatedAt: Date;
};

export declare type ProfilingScheduleWithPagination = {
  totalCount: number;
  size: number;
  page: number;
  length: number;
  profilingSchedule: ProfilingSchedule[];
};
