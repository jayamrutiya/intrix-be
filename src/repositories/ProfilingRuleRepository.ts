import { ConnectionType, ProfilingType } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IProfilingRuleRepository } from "../interfaces/IProfilingRuleRepository";
import { ProfilingRule } from "../types/ProfilingRule";

@injectable()
export class ProfilingRuleRepository implements IProfilingRuleRepository {
  private _loggerService: ILoggerService;

  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }
  async getProfilingRule(
    databaseType: ConnectionType,
    profilingType: ProfilingType
  ): Promise<ProfilingRule[]> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      return await client.profilingRules.findMany({
        where: {
          databaseType,
          profilingType,
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }
}
