import { ConnectionType, ProfilingType } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IConnectionRepository } from "../interfaces/IConnectionRepository";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import {
  Connection,
  ConnectionWithPagination,
  CreateConnection,
  UpdateConnection,
} from "../types/Connection";

@injectable()
export class ConnectionRepository implements IConnectionRepository {
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

  async createConnection(input: CreateConnection): Promise<Connection> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const createConnection = await client.connection.create({
        data: input,
      });

      return createConnection;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }

  async updateConnection(input: UpdateConnection): Promise<Connection> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const { id, ...restData } = input;

      const updateConnection = await client.connection.update({
        where: {
          id: input.id,
        },
        data: restData,
      });

      return updateConnection;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }

  async getConnection(id: number): Promise<Connection | null> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const getConnection = await client.connection.findFirst({
        where: {
          id,
        },
      });

      return getConnection;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }

  async getConnections(
    page: number,
    size: number
  ): Promise<ConnectionWithPagination> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const totalCount = await client.connection.count({});
      let getConnections: Connection[];
      if (page === 0 && size === 0) {
        getConnections = await client.connection.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        getConnections = await client.connection.findMany({
          orderBy: {
            createdAt: "desc",
          },
          skip: size * (page - 1),
          take: size,
        });
      }

      const response = {
        totalCount,
        size,
        page,
        length: getConnections.length,
        connections: getConnections,
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

  async createProfilingRule(): Promise<any> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      const createProfilingRule = await client.profilingRules.create({
        data: {
          name: "ROW_COUNT",
          rule: "SELECT COUNT(COLUMN_NAME) As ROW_COUNT FROM TABLE_NAME",
          profilingType: ProfilingType.COLUMN,
          databaseType: ConnectionType.MySql,
          description: "Total count of row",
        },
      });

      return createProfilingRule;
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
