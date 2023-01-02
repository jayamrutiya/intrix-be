import { CreateUseCase, UseCase } from "../types/UseCase";

export interface IUseCaseService {
  createUseCase(input: CreateUseCase): Promise<UseCase>;
}
