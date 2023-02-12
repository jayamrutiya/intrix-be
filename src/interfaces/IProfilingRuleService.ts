import { RunProfilingRuleInput } from "../types/ProfilingRule";

export interface IProfilingRuleService {
  runProfilingRules(selectedData: RunProfilingRuleInput): Promise<any>;
}
