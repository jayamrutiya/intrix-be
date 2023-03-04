import { ConnectionType } from "@prisma/client";

export declare type TestConnection = {
  //   id: number;
  //   name: string;
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  type: ConnectionType;
  //   isConnected: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
};

export declare type CreateConnection = {
  //   id: number;
  name: string;
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  type: ConnectionType;
  isConnected: boolean;
  description: string | null;
  //   createdAt: Date;
  //   updatedAt: Date;
};

export declare type Connection = {
  id: number;
  name: string;
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  type: ConnectionType;
  description: string | null;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export declare type ConnectionWithPagination = {
  totalCount: number;
  size: number;
  page: number;
  length: number;
  connections: Connection[];
};

export declare type UpdateConnection = {
  id: number;
  name: string;
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  type: ConnectionType;
  isConnected: boolean;
  description: string | null;
  //   createdAt: Date;
  //   updatedAt: Date;
};
