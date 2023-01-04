"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const TestRepository_1 = require("../repositories/TestRepository");
const UseCaseRepository_1 = require("../repositories/UseCaseRepository");
const TestService_1 = require("../services/TestService");
const UseCaseService_1 = require("../services/UseCaseService");
const db_1 = require("./db");
const logger_1 = require("./logger");
const types_1 = require("./types");
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
// make inversify aware of inversify-binding-decorat    ors
iocContainer.load((0, inversify_binding_decorators_1.buildProviderModule)());
// services
iocContainer.bind(types_1.TYPES.DatabaseService).to(db_1.DatabaseService);
iocContainer.bind(types_1.TYPES.LoggerService).to(logger_1.LoggerService);
iocContainer.bind(types_1.TYPES.TestService).to(TestService_1.TestService);
iocContainer.bind(types_1.TYPES.UseCaseService).to(UseCaseService_1.UseCaseService);
// Repository
iocContainer.bind(types_1.TYPES.TestRepository).to(TestRepository_1.TestRepository);
iocContainer
    .bind(types_1.TYPES.UseCaseRepository)
    .to(UseCaseRepository_1.UseCaseRepository);
//# sourceMappingURL=container.js.map