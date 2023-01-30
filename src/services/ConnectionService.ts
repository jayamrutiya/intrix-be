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
import { ConnectionType } from "@prisma/client";
import { BadRequest } from "../errors/BadRequest";

@injectable()
export class ConnectionService implements IConnectionService {
  private _loggerService: ILoggerService;
  private _connectionRepository: IConnectionRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.ConnectionRepository)
    connectionRepository: IConnectionRepository
  ) {
    this._connectionRepository = connectionRepository;
    this._loggerService = loggerService;
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
      reject(false);
    });

    return data
      .then((result) => {
        return { isConnected: true };
      })
      .catch((error) => {
        return { isConnected: false };
      });
  }
}
