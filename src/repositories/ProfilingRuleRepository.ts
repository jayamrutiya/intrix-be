import { ConnectionType, ProfilingType } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IProfilingRuleRepository } from "../interfaces/IProfilingRuleRepository";
import {
  CreateProfilingScheduleInput,
  ProfilingRule,
  ProfilingSchedule,
  ProfilingScheduleWithPagination,
} from "../types/ProfilingRule";

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

  async createProfilingRuleSchedule(
    input: CreateProfilingScheduleInput
  ): Promise<ProfilingSchedule> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const data = await client.profilingSchedule.create({
        data: {
          name: input.schedule.name,
          processName: input.schedule.processName,
          startDate: new Date(input.schedule.startDate),
          endDate: new Date(input.schedule.endDate),
          frequency: input.schedule.frequency,
          selectedData: input.selectedData,
          connectionId: input.connectionId,
        },
        include: {
          connection: true,
        },
      });

      return data;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }

  async getProfilingSchedules(
    page: number,
    size: number
  ): Promise<ProfilingScheduleWithPagination> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const totalCount = await client.profilingSchedule.count({});

      let getProfilingScheduleData: ProfilingSchedule[];
      if (page === 0 && size === 0) {
        getProfilingScheduleData = await client.profilingSchedule.findMany({
          orderBy: {
            createdAt: "desc",
          },
          include: {
            connection: true,
          },
        });
      } else {
        getProfilingScheduleData = await client.profilingSchedule.findMany({
          orderBy: {
            createdAt: "desc",
          },
          skip: size * (page - 1),
          take: size,
          include: {
            connection: true,
          },
        });
      }

      const response = {
        totalCount,
        size,
        page,
        length: getProfilingScheduleData.length,
        profilingSchedule: getProfilingScheduleData,
      };

      return response;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }

  async getProfilingSchedule(id: number): Promise<ProfilingSchedule | null> {
    try {
      // Get the client
      const client = this._databaseService.Client();
      const response = await client.profilingSchedule.findFirst({
        where: {
          id,
        },
        include: {
          connection: true,
        },
      });

      return response;
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
