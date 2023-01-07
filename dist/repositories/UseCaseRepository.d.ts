import { IDatabaseService } from "../interfaces/IDatabaseService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IUseCaseRepository } from "../interfaces/IUseCaseRepository";
import { CreateUseCase, UpdateUseCase, UseCase } from "../types/UseCase";
export declare class UseCaseRepository implements IUseCaseRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    createUseCase(input: CreateUseCase): Promise<UseCase>;
    updateUseCase(input: UpdateUseCase): Promise<UseCase>;
    getUseCase(id: number): Promise<UseCase | null>;
    getAllUseCase(): Promise<UseCase[]>;
    deleteUseCase(): Promise<any>;
}
