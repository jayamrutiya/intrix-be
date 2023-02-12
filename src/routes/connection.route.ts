import express from "express";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { iocContainer as Container } from "../config/container";
import { IConnectionService } from "../interfaces/IConnectionService";
import ConnectionController from "../controllers/ConnectionController";
import testConnectionValidator from "../validators/test-connection.validator";
import createConnectionValidator from "../validators/create-connection.validator";
import updateConnectionValidator from "../validators/update-connection.validator copy";
import getConnectionValidator from "../validators/get-connection.validator";

const router = express.Router();

const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const connectionService = Container.get<IConnectionService>(
  TYPES.ConnectionService
);
const connectionController = new ConnectionController(
  loggerService,
  connectionService
);

router.get("/table", (req, res) =>
  connectionController.getConnectionTables(req, res)
);

router.get("/column", (req, res) =>
  connectionController.getTableColumns(req, res)
);

router.get("/:id", getConnectionValidator, (req, res) =>
  connectionController.getConnection(req, res)
);

router.get("/", (req, res) => connectionController.getConnections(req, res));

router.post("/test", testConnectionValidator, (req, res) =>
  connectionController.testConnection(req, res)
);

router.post("/", createConnectionValidator, (req, res) =>
  connectionController.createConnection(req, res)
);

router.put("/", updateConnectionValidator, (req, res) =>
  connectionController.updateConnection(req, res)
);

router.post("/createProfilingRule", (req, res) =>
  connectionController.createProfilingRule(req, res)
);

export default router;
