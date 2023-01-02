import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InternalServerError } from "../errors/InternalServerError";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { CreateUseCase, UseCase } from "../types/UseCase";

@injectable()
export class UseCaseRepository implements IUseCaseRepository {
  private _loggerService: ILoggerService;

  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }
  async createUseCase(input: CreateUseCase): Promise<UseCase> {
    try {
      // Get the client
      const client = this._databaseService.Client();

      return await client.useCase.create({
        data: input,
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // finally block
    }
  }
}
