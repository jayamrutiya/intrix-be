import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { NotFound } from "../errors/NotFound";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import { CreateUseCase, UpdateUseCase, UseCase } from "../types/UseCase";

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

  async updateUseCase(input: UpdateUseCase): Promise<UseCase> {
    const getUseCase = await this._useCaseRepository.getUseCase(input.id);

    if (!getUseCase) {
      throw new NotFound("Use Case not found");
    }
    return this._useCaseRepository.updateUseCase(input);
  }

  async getUseCase(id: number): Promise<UseCase | null> {
    return this._useCaseRepository.getUseCase(id);
  }

  async getAllUseCase(): Promise<UseCase[]> {
    return this._useCaseRepository.getAllUseCase();
  }

  async deleteUseCase(): Promise<any> {
    return this._useCaseRepository.deleteUseCase();
  }
}
