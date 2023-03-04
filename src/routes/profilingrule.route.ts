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

router.get("/schedules/:id", (req, res) =>
  profilingRuleController.getProfilingSchedule(req, res)
);

router.post("/run", (req, res) =>
  profilingRuleController.runProfilingRules(req, res)
);

router.post("/schedule", (req, res) =>
  profilingRuleController.createProfilingRuleSchedule(req, res)
);

router.get("/schedules", (req, res) =>
  profilingRuleController.getProfilingSchedules(req, res)
);

export default router;
