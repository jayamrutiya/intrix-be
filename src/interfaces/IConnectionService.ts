import { TestConnection } from "../types/Connection";

export interface IConnectionService {
  testConnection(input: TestConnection): Promise<{ isConnected: boolean }>;
}
