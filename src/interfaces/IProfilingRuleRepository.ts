import { ConnectionType, ProfilingType } from "@prisma/client";
import {
  CreateProfilingScheduleInput,
  ProfilingRule,
  ProfilingSchedule,
  ProfilingScheduleWithPagination,
} from "../types/ProfilingRule";

export interface IProfilingRuleRepository {
  getProfilingRule(
    databaseType: ConnectionType,
    profilingType: ProfilingType
  ): Promise<ProfilingRule[]>;

  createProfilingRuleSchedule(
    input: CreateProfilingScheduleInput
  ): Promise<ProfilingSchedule>;

  getProfilingSchedules(
    page: number,
    size: number
  ): Promise<ProfilingScheduleWithPagination>;

  getProfilingSchedule(id: number): Promise<ProfilingSchedule | null>;
}
