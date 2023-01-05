"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
const client_1 = require("@prisma/client");
class UseCaseController extends BaseController_1.default {
    constructor(loggerService, useCaseService) {
        super();
        this._loggerService = loggerService;
        this._useCaseService = useCaseService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createUseCase(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const cretaUseCase = {
                businessUnit: req.body.businessUnit,
                businessOwner: req.body.businessOwner,
                vertical: req.body.vertical,
                description: req.body.description,
                assumptions: req.body.assumptions,
                constraints: req.body.constraints,
                dependencies: req.body.dependencies,
                crossDomainYesOrNo: req.body.crossDomainYesOrNo === client_1.YESorNO.Yes
                    ? client_1.YESorNO.Yes
                    : client_1.YESorNO.No,
                crossDomainValue: req.body.crossDomainValue,
                parentTheme: req.body.parentTheme,
                useCaseTheme: req.body.useCaseTheme,
                businessImpact: req.body.businessImpact === client_1.BusinessImpact.Cost
                    ? client_1.BusinessImpact.Cost
                    : req.body.businessImpact === client_1.BusinessImpact.Revenue
                        ? client_1.BusinessImpact.Revenue
                        : client_1.BusinessImpact.Both,
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
            const createUseCase = await this._useCaseService.createUseCase(cretaUseCase);
            // Return the response
            return this.sendJSONResponse(res, "Use Case created sucessfully.", {
                size: 1,
            }, createUseCase);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async updateUseCase(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const updateUseCaseInput = {
                id: req.body.id,
                businessUnit: req.body.businessUnit,
                businessOwner: req.body.businessOwner,
                vertical: req.body.vertical,
                description: req.body.description,
                assumptions: req.body.assumptions,
                constraints: req.body.constraints,
                dependencies: req.body.dependencies,
                crossDomainYesOrNo: req.body.crossDomainYesOrNo === client_1.YESorNO.Yes
                    ? client_1.YESorNO.Yes
                    : client_1.YESorNO.No,
                crossDomainValue: req.body.crossDomainValue,
                parentTheme: req.body.parentTheme,
                useCaseTheme: req.body.useCaseTheme,
                businessImpact: req.body.businessImpact === client_1.BusinessImpact.Cost
                    ? client_1.BusinessImpact.Cost
                    : req.body.businessImpact === client_1.BusinessImpact.Revenue
                        ? client_1.BusinessImpact.Revenue
                        : client_1.BusinessImpact.Both,
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
            const updateUseCase = await this._useCaseService.updateUseCase(updateUseCaseInput);
            // Return the response
            return this.sendJSONResponse(res, "Use Case updated sucessfully.", {
                size: 1,
            }, updateUseCase);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getUseCase(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const id = Number(req.params.id);
            const getUseCase = await this._useCaseService.getUseCase(id);
            // Return the response
            return this.sendJSONResponse(res, "Use Case.", {
                size: 1,
            }, getUseCase);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
    async getAllUseCase(req, res) {
        try {
            // validate input
            this.validateRequest(req);
            const getAllUseCase = await this._useCaseService.getAllUseCase();
            // Return the response
            return this.sendJSONResponse(res, "Use Cases.", {
                size: getAllUseCase.length,
            }, getAllUseCase);
        }
        catch (error) {
            return this.sendErrorResponse(req, res, error);
        }
    }
}
exports.default = UseCaseController;
//# sourceMappingURL=UseCaseController.js.map