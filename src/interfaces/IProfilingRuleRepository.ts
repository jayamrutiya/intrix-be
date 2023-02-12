import { ConnectionType, ProfilingType } from "@prisma/client";
import { ProfilingRule } from "../types/ProfilingRule";

export interface IProfilingRuleRepository {
  getProfilingRule(
    databaseType: ConnectionType,
    profilingType: ProfilingType
  ): Promise<ProfilingRule[]>;
}
