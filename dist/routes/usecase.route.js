"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../config/types");
const container_1 = require("../config/container");
const UseCaseController_1 = __importDefault(require("../controllers/UseCaseController"));
const router = express_1.default.Router();
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const useCaseService = container_1.iocContainer.get(types_1.TYPES.UseCaseService);
const useCaseController = new UseCaseController_1.default(loggerService, useCaseService);
router.post("/", (req, res) => useCaseController.createUseCase(req, res));
router.put("/", (req, res) => useCaseController.updateUseCase(req, res));
router.get("/:id", (req, res) => useCaseController.getUseCase(req, res));
router.get("/", (req, res) => useCaseController.getAllUseCase(req, res));
router.delete("/", (req, res) => useCaseController.deleteUseCase(req, res));
exports.default = router;
//# sourceMappingURL=usecase.route.js.map