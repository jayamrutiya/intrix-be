import { ILoggerService } from "../interfaces/ILoggerService";
import { IProfilingRuleService } from "../interfaces/IProfilingRuleService";
import BaseController from "./BaseController";
import * as express from "express";
import {
  CreateProfilingScheduleInput,
  RunProfilingRuleInput,
} from "../types/ProfilingRule";
import { BadRequest } from "../errors/BadRequest";

export default class ProfilingRuleController extends BaseController {
  private _loggerService: ILoggerService;
  private _profilingRuleService: IProfilingRuleService;

  constructor(
    loggerService: ILoggerService,
    profilingRuleService: IProfilingRuleService
  ) {
    super();
    this._profilingRuleService = profilingRuleService;
    this._loggerService = loggerService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async runProfilingRules(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const input: RunProfilingRuleInput = {
        connectionId: req.body.connectionId,
        selectedData: req.body.selectedData,
      };

      const runProfilingRule =
        await this._profilingRuleService.runProfilingRules(input);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Run profiling rules.",
        {
          size: 1,
        },
        runProfilingRule
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async createProfilingRuleSchedule(
    req: express.Request,
    res: express.Response
  ) {
    try {
      // validate input
      this.validateRequest(req);

      const createProfilingSchedule: CreateProfilingScheduleInput = req.body;

      if (
        !createProfilingSchedule.connectionId ||
        !createProfilingSchedule.schedule.name ||
        !createProfilingSchedule.schedule.processName ||
        !createProfilingSchedule.schedule.startDate ||
        !createProfilingSchedule.schedule.endDate ||
        !createProfilingSchedule.schedule.frequency ||
        createProfilingSchedule.selectedData.length <= 0
      ) {
        throw new BadRequest("Invalid Argument Psses.");
      }

      const response =
        await this._profilingRuleService.createProfilingRuleSchedule(
          createProfilingSchedule
        );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Create profiling schedule.",
        {
          size: 1,
        },
        response
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getProfilingSchedules(req: express.Request, res: express.Response) {
    try {
      const page = Number(req.query.page);
      const size = Number(req.query.size);

      const response = await this._profilingRuleService.getProfilingSchedules(
        page,
        size
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get the Profiling Schedule.",
        {
          page: response.page,
          size: response.size,
          length: response.length,
          total: response.totalCount,
        },
        response.profilingSchedule
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getProfilingSchedule(req: express.Request, res: express.Response) {
    try {
      const id = Number(req.params.id);

      const response = await this._profilingRuleService.getProfilingSchedule(
        id
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Get profiling schedule.",
        {
          size: 1,
        },
        response
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
