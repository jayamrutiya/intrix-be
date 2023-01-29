import express from "express";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { iocContainer as Container } from "../config/container";
import { IConnectionService } from "../interfaces/IConnectionService";
import ConnectionController from "../controllers/ConnectionController";
import testConnectionValidator from "../validators/test-connection.validator";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const connectionService = Container.get<IConnectionService>(
  TYPES.ConnectionService
);
const connectionController = new ConnectionController(
  loggerService,
  connectionService
);

router.post("/test", testConnectionValidator, (req, res) =>
  connectionController.testConnection(req, res)
);

export default router;
