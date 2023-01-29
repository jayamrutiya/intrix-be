import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { IConnectionRepository } from "../interfaces/IConnectionRepository";
import { IConnectionService } from "../interfaces/IConnectionService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITestRepository } from "../interfaces/ITestRepository";
import { ITestService } from "../interfaces/ITestService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import { ConnectionRepository } from "../repositories/ConnectionRepository";
import { TestRepository } from "../repositories/TestRepository";
import { UseCaseRepository } from "../repositories/UseCaseRepository";
import { ConnectionService } from "../services/ConnectionService";
import { TestService } from "../services/TestService";
import { UseCaseService } from "../services/UseCaseService";
import { DatabaseService } from "./db";
import { LoggerService } from "./logger";
import { TYPES } from "./types";

const iocContainer = new Container();

// make inversify aware of inversify-binding-decorat    ors
iocContainer.load(buildProviderModule());

// services
iocContainer.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService);
iocContainer.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
iocContainer.bind<ITestService>(TYPES.TestService).to(TestService);
iocContainer.bind<IUseCaseService>(TYPES.UseCaseService).to(UseCaseService);
iocContainer
  .bind<IConnectionService>(TYPES.ConnectionService)
  .to(ConnectionService);

// Repository
iocContainer.bind<ITestRepository>(TYPES.TestRepository).to(TestRepository);
iocContainer
  .bind<IUseCaseRepository>(TYPES.UseCaseRepository)
  .to(UseCaseRepository);
iocContainer
  .bind<IConnectionRepository>(TYPES.ConnectionRepository)
  .to(ConnectionRepository);

export { iocContainer };
