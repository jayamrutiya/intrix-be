import {
  Connection,
  ConnectionWithPagination,
  CreateConnection,
  UpdateConnection,
} from "../types/Connection";

export interface IConnectionRepository {
  createConnection(input: CreateConnection): Promise<Connection>;
  updateConnection(input: UpdateConnection): Promise<Connection>;
  getConnection(id: number): Promise<Connection | null>;
  getConnections(page: number, size: number): Promise<ConnectionWithPagination>;
  createProfilingRule(): Promise<any>;
}
