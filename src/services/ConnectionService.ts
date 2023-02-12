import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IConnectionRepository } from "../interfaces/IConnectionRepository";
import { IConnectionService } from "../interfaces/IConnectionService";
import { ILoggerService } from "../interfaces/ILoggerService";
import {
  Connection,
  CreateConnection,
  TestConnection,
  UpdateConnection,
} from "../types/Connection";
import * as mysql from "mysql";
import { ConnectionType, ProfilingType } from "@prisma/client";
import { BadRequest } from "../errors/BadRequest";
import { NotFound } from "../errors/NotFound";
import { InternalServerError } from "../errors/InternalServerError";
import { IProfilingRuleRepository } from "../interfaces/IProfilingRuleRepository";
import { RunProfilingRuleInput } from "../types/ProfilingRule";

@injectable()
export class ConnectionService implements IConnectionService {
  private _loggerService: ILoggerService;
  private _connectionRepository: IConnectionRepository;
  private _profilingRuleRepository: IProfilingRuleRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.ConnectionRepository)
    connectionRepository: IConnectionRepository,
    @inject(TYPES.ProfilingRuleRepository)
    profilingRuleRepository: IProfilingRuleRepository
  ) {
    this._connectionRepository = connectionRepository;
    this._loggerService = loggerService;
    this._profilingRuleRepository = profilingRuleRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }
  async createConnection(input: CreateConnection): Promise<Connection> {
    const testTheConnection = await this.testConnection({
      database: input.database,
      host: input.host,
      password: input.password,
      port: input.port,
      type: input.type,
      user: input.user,
    });

    if (testTheConnection.isConnected === false) {
      throw new BadRequest("Connection data is wrong. Please check again.");
    }
    input.isConnected = true;
    return this._connectionRepository.createConnection(input);
  }
  async updateConnection(input: UpdateConnection): Promise<Connection> {
    const testTheConnection = await this.testConnection({
      database: input.database,
      host: input.host,
      password: input.password,
      port: input.port,
      type: input.type,
      user: input.user,
    });

    if (testTheConnection.isConnected === false) {
      throw new BadRequest("Connection data is wrong. Please check again.");
    }
    input.isConnected = true;
    return this._connectionRepository.updateConnection(input);
  }
  getConnection(id: number): Promise<Connection | null> {
    return this._connectionRepository.getConnection(id);
  }
  getConnections(): Promise<Connection[]> {
    return this._connectionRepository.getConnections();
  }

  async testConnection(
    input: TestConnection
  ): Promise<{ isConnected: boolean }> {
    const data = new Promise((resolve, reject) => {
      if (input.type === ConnectionType.MySql) {
        const connection = mysql.createConnection({
          host: input.host,
          user: input.user,
          password: input.password,
          database: input.database,
          port: input.port,
        });
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve(connection);
          }
        });
      }
    });

    return data
      .then((result) => {
        return { isConnected: true };
      })
      .catch((error) => {
        return { isConnected: false };
      });
  }

  async getConnectionTables(id: number): Promise<any> {
    const getConnection = await this._connectionRepository.getConnection(id);
    if (!getConnection) {
      throw new NotFound("Connection not found");
    }

    const data = new Promise((resolve, reject) => {
      if (getConnection.type === ConnectionType.MySql) {
        const connection = mysql.createConnection({
          host: getConnection.host,
          user: getConnection.user,
          password: getConnection.password,
          database: getConnection.database,
          port: getConnection.port,
        });
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            connection.query(
              "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
              [getConnection.database],
              function (error, result) {
                if (error) {
                  reject(error);
                }
                resolve(result);
              }
            );
          }
        });
      }
      // reject(false);
    });

    return data
      .then((result: any) => {
        return result.map((d) => d.TABLE_NAME);
      })
      .catch((error) => {
        throw new InternalServerError("Database not connected." + error);
      });
  }

  async getTableColumns(connectionId: number, tableName: string): Promise<any> {
    const getConnection = await this._connectionRepository.getConnection(
      connectionId
    );
    if (!getConnection) {
      throw new NotFound("Connection not found");
    }

    const data = new Promise((resolve, reject) => {
      if (getConnection.type === ConnectionType.MySql) {
        const connection = mysql.createConnection({
          host: getConnection.host,
          user: getConnection.user,
          password: getConnection.password,
          database: getConnection.database,
          port: getConnection.port,
        });
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            connection.query(
              `SHOW COLUMNS FROM ${tableName}`,
              [],
              function (error, result) {
                if (error) {
                  reject(error);
                }
                resolve(result);
              }
            );
          }
        });
      }
      // reject(false);
    });

    return data
      .then((result: any) => {
        return result;
      })
      .catch((error) => {
        throw new InternalServerError("Database not connected." + error);
      });
  }

  async createProfilingRule(): Promise<any> {
    return this._connectionRepository.createProfilingRule();
  }
}
