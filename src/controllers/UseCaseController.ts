import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import BaseController from "./BaseController";
import * as express from "express";
import { CreateUseCase, UpdateUseCase } from "../types/UseCase";
import { BusinessImpact, YESorNO } from "@prisma/client";

export default class UseCaseController extends BaseController {
  private _loggerService: ILoggerService;
  private _useCaseService: IUseCaseService;

  constructor(loggerService: ILoggerService, useCaseService: IUseCaseService) {
    super();
    this._loggerService = loggerService;
    this._useCaseService = useCaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createUseCase(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const cretaUseCase: CreateUseCase = {
        businessUnit: req.body.businessUnit,
        businessOwner: req.body.businessOwner,
        vertical: req.body.vertical,
        description: req.body.description,
        assumptions: req.body.assumptions,
        constraints: req.body.constraints,
        dependencies: req.body.dependencies,
        crossDomainYesOrNo:
          req.body.crossDomainYesOrNo === YESorNO.Yes
            ? YESorNO.Yes
            : YESorNO.No,
        crossDomainValue: req.body.crossDomainValue,
        parentTheme: req.body.parentTheme,
        useCaseTheme: req.body.useCaseTheme,
        businessImpact:
          req.body.businessImpact === BusinessImpact.Cost
            ? BusinessImpact.Cost
            : req.body.businessImpact === BusinessImpact.Revenue
            ? BusinessImpact.Revenue
            : BusinessImpact.Both,
        businessImpactCostValue: req.body.businessImpactCostValue,
        businessImpactRevenueValue: req.body.businessImpactRevenueValue,
        impact: req.body.impact,
        time: req.body.time,
        systemsInvolved: req.body.systemsInvolved,
        source: req.body.source,
        externalData: req.body.externalData,
        criticalDataElement: req.body.criticalDataElement,
        investmentCategory: req.body.investmentCategory,
        competitiveThrust: req.body.competitiveThrust,
        dataTrust: req.body.dataTrust,
        priority: req.body.priority,
      };

      const createUseCase = await this._useCaseService.createUseCase(
        cretaUseCase
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Use Case created sucessfully.",
        {
          size: 1,
        },
        createUseCase
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async updateUseCase(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const updateUseCaseInput: UpdateUseCase = {
        id: req.body.id,
        businessUnit: req.body.businessUnit,
        businessOwner: req.body.businessOwner,
        vertical: req.body.vertical,
        description: req.body.description,
        assumptions: req.body.assumptions,
        constraints: req.body.constraints,
        dependencies: req.body.dependencies,
        crossDomainYesOrNo:
          req.body.crossDomainYesOrNo === YESorNO.Yes
            ? YESorNO.Yes
            : YESorNO.No,
        crossDomainValue: req.body.crossDomainValue,
        parentTheme: req.body.parentTheme,
        useCaseTheme: req.body.useCaseTheme,
        businessImpact:
          req.body.businessImpact === BusinessImpact.Cost
            ? BusinessImpact.Cost
            : req.body.businessImpact === BusinessImpact.Revenue
            ? BusinessImpact.Revenue
            : BusinessImpact.Both,
        businessImpactCostValue: req.body.businessImpactCostValue,
        businessImpactRevenueValue: req.body.businessImpactRevenueValue,
        impact: req.body.impact,
        time: req.body.time,
        systemsInvolved: req.body.systemsInvolved,
        source: req.body.source,
        externalData: req.body.externalData,
        criticalDataElement: req.body.criticalDataElement,
        investmentCategory: req.body.investmentCategory,
        competitiveThrust: req.body.competitiveThrust,
        dataTrust: req.body.dataTrust,
        priority: req.body.priority,
      };

      const updateUseCase = await this._useCaseService.updateUseCase(
        updateUseCaseInput
      );

      // Return the response
      return this.sendJSONResponse(
        res,
        "Use Case updated sucessfully.",
        {
          size: 1,
        },
        updateUseCase
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getUseCase(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const id = Number(req.params.id);

      const getUseCase = await this._useCaseService.getUseCase(id);

      // Return the response
      return this.sendJSONResponse(
        res,
        "Use Case.",
        {
          size: 1,
        },
        getUseCase
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async getAllUseCase(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const getAllUseCase = await this._useCaseService.getAllUseCase();

      // Return the response
      return this.sendJSONResponse(
        res,
        "Use Cases.",
        {
          size: getAllUseCase.length,
        },
        getAllUseCase
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }

  async deleteUseCase(req: express.Request, res: express.Response) {
    try {
      // validate input
      this.validateRequest(req);

      const deleteUseCAse = await this._useCaseService.deleteUseCase();

      // Return the response
      return this.sendJSONResponse(
        res,
        "Use Cases deleted.",
        {
          size: 1,
        },
        deleteUseCAse
      );
    } catch (error) {
      return this.sendErrorResponse(req, res, error);
    }
  }
}
