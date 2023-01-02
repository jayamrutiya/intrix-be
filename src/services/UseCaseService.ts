import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import { CreateUseCase, UseCase } from "../types/UseCase";

@injectable()
export class UseCaseService implements IUseCaseService {
  private _loggerService: ILoggerService;
  private _useCaseRepository: IUseCaseRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.UseCaseRepository) useCaseRepository: IUseCaseRepository
  ) {
    this._useCaseRepository = useCaseRepository;
    this._loggerService = loggerService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async createUseCase(input: CreateUseCase): Promise<UseCase> {
    return this._useCaseRepository.createUseCase(input);
  }
}
