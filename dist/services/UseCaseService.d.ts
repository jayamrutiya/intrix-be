import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { IUseCaseService } from "../interfaces/IUseCaseService";
import { CreateUseCase, UpdateUseCase, UseCase } from "../types/UseCase";
export declare class UseCaseService implements IUseCaseService {
    private _loggerService;
    private _useCaseRepository;
    constructor(loggerService: ILoggerService, useCaseRepository: IUseCaseRepository);
    createUseCase(input: CreateUseCase): Promise<UseCase>;
    updateUseCase(input: UpdateUseCase): Promise<UseCase>;
    getUseCase(id: number): Promise<UseCase | null>;
    getAllUseCase(): Promise<UseCase[]>;
    deleteUseCase(): Promise<any>;
}
