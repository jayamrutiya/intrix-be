import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import BaseController from "./BaseController";
import * as express from "express";
export default class UseCaseController extends BaseController {
    private _loggerService;
    private _useCaseService;
    constructor(loggerService: ILoggerService, useCaseService: IUseCaseService);
    createUseCase(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    updateUseCase(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getUseCase(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getAllUseCase(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
