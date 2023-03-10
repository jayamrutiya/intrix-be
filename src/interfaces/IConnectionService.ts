import {
  Connection,
  ConnectionWithPagination,
  CreateConnection,
  TestConnection,
  UpdateConnection,
} from "../types/Connection";

export interface IConnectionService {
  testConnection(input: TestConnection): Promise<{ isConnected: boolean }>;

  createConnection(input: CreateConnection): Promise<Connection>;
  updateConnection(input: UpdateConnection): Promise<Connection>;
  getConnection(id: number): Promise<Connection | null>;
  getConnections(page: number, size: number): Promise<ConnectionWithPagination>;
  getConnectionTables(id: number): Promise<any>;
  getTableColumns(connectionId: number, tableName: string): Promise<any>;
  createProfilingRule(): Promise<any>;
}
