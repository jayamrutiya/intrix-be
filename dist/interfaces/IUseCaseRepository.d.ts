import { CreateUseCase, UpdateUseCase, UseCase } from "../types/UseCase";
export interface IUseCaseRepository {
    createUseCase(input: CreateUseCase): Promise<UseCase>;
    updateUseCase(input: UpdateUseCase): Promise<UseCase>;
    getUseCase(id: number): Promise<UseCase | null>;
    getAllUseCase(): Promise<UseCase[]>;
}