import { CreateUseCase, UseCase } from "../types/UseCase";

export interface IUseCaseRepository {
  createUseCase(input: CreateUseCase): Promise<UseCase>;
}
