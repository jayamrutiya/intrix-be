"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_route_1 = __importDefault(require("./swagger.route"));
const test_route_1 = __importDefault(require("./test.route"));
const usecase_route_1 = __importDefault(require("./usecase.route"));
exports.default = {
    swaggerRouter: swagger_route_1.default,
    testRouter: test_route_1.default,
    useCaseRouter: usecase_route_1.default,
};
//# sourceMappingURL=index.js.map