import { IConnectionService } from "../interfaces/IConnectionService";
import { ILoggerService } from "../interfaces/ILoggerService";
import BaseController from "./BaseController";
import * as express from "express";
import {
  CreateConnection,
  TestConnection,
  UpdateConnection,
} from "../types/Connection";
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

  async createConnection(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const input: CreateConnection = {
        name: req.body.name,
        database: req.body.database,
        host: req.body.host,
        port: Number(req.body.port),
        password: req.body.password,
        user: req.body.user,
        type: ConnectionType[req.body.type],
        isConnected: false,
        description: req.body.description,
      };

      const createConnection = await this._connectionService.createConnection(
        input
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Create the connection.",
        {
          size: 1,
        },
        createConnection
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async updateConnection(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const input: UpdateConnection = {
        id: Number(req.body.id),
        name: req.body.name,
        database: req.body.database,
        host: req.body.host,
        port: Number(req.body.port),
        password: req.body.password,
        user: req.body.user,
        type: ConnectionType[req.body.type],
        isConnected: false,
        description: req.body.description,
      };

      const updateConnection = await this._connectionService.updateConnection(
        input
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Update the connection.",
        {
          size: 1,
        },
        updateConnection
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getConnection(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.params.id);

      const getConnection = await this._connectionService.getConnection(id);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the connection.",
        {
          size: 1,
        },
        getConnection
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getConnections(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const page = Number(req.query.page);
      const size = Number(req.query.size);

      const getConnections = await this._connectionService.getConnections(
        page,
        size
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the connections.",
        {
          page: getConnections.page,
          size: getConnections.size,
          length: getConnections.length,
          total: getConnections.totalCount,
        },
        getConnections.connections
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getConnectionTables(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.query.connectionId);

      const getConnectionTables =
        await this._connectionService.getConnectionTables(id);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the connection tables.",
        {
          size: 1,
        },
        getConnectionTables
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getTableColumns(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.query.connectionId);
      const tableName = req.query.tableName?.toString();

      const getTableColumns = await this._connectionService.getTableColumns(
        id,
        tableName!
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the table columns.",
        {
          size: 1,
        },
        getTableColumns
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async createProfilingRule(req: express.Request, res: express.Response) {
    try {
      const createProfilingRule =
        await this._connectionService.createProfilingRule();

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the table columns.",
        {
          size: 1,
        },
        createProfilingRule
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
