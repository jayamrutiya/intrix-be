import express from "express";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { iocContainer as Container } from "../config/container";
import { IProfilingRuleService } from "../interfaces/IProfilingRuleService";
import ProfilingRuleController from "../controllers/ProfilingRuleController";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const profilingRuleService = Container.get<IProfilingRuleService>(
  TYPES.ProfilingRuleService
);
const profilingRuleController = new ProfilingRuleController(
  loggerService,
  profilingRuleService
);

router.post("/run", (req, res) =>
  profilingRuleController.runProfilingRules(req, res)
);

export default router;
