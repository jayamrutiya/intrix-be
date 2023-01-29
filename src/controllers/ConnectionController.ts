import { IConnectionService } from "../interfaces/IConnectionService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
import { TestConnection } from "../types/Connection";
import { ConnectionType } from "@prisma/client";

export default class ConnectionController extends BaseController {
  private _loggerService: ILoggerService;
  private _connectionService: IConnectionService;

  constructor(
    loggerService: ILoggerService,
    connectionService: IConnectionService
  ) {
    super();
    this._connectionService = connectionService;
    this._loggerService = loggerService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async testConnection(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const input: TestConnection = {
        database: req.body.database,
        host: req.body.host,
        port: Number(req.body.port),
        password: req.body.password,
        user: req.body.user,
        type: ConnectionType[req.body.type],
      };

      const testConnection = await this._connectionService.testConnection(
        input
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Test the connection.",
        {
          size: 1,
        },
        testConnection
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
