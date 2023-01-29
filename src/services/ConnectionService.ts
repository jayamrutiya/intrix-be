import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IConnectionRepository } from "../interfaces/IConnectionRepository";
import { IConnectionService } from "../interfaces/IConnectionService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TestConnection } from "../types/Connection";
import * as mysql from "mysql";
import { ConnectionType } from "@prisma/client";

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
