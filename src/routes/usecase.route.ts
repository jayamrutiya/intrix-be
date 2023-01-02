import express from "express";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { iocContainer as Container } from "../config/container";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import UseCaseController from "../controllers/UseCaseController";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const useCaseService = Container.get<IUseCaseService>(TYPES.UseCaseService);
const useCaseController = new UseCaseController(loggerService, useCaseService);

router.post("/", (req, res) => useCaseController.createUseCase(req, res));

export default router;
