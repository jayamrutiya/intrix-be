import {
  CreateProfilingScheduleInput,
  ProfilingSchedule,
  ProfilingScheduleWithPagination,
  RunProfilingRuleInput,
} from "../types/ProfilingRule";

export interface IProfilingRuleService {
  runProfilingRules(selectedData: RunProfilingRuleInput): Promise<any>;

  createProfilingRuleSchedule(
    input: CreateProfilingScheduleInput
  ): Promise<ProfilingSchedule>;

  getProfilingSchedules(
    page: number,
    size: number
  ): Promise<ProfilingScheduleWithPagination>;

  getProfilingSchedule(id: number): Promise<ProfilingSchedule | null>;
}
