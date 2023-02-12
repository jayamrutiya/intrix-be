import { ILoggerService } from "../interfaces/ILoggerService";
import { IProfilingRuleService } from "../interfaces/IProfilingRuleService";
import BaseController from "./BaseController";
import * as express from "express";
import { RunProfilingRuleInput } from "../types/ProfilingRule";

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
}
