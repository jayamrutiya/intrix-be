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
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  //   createdAt: Date;
  //   updatedAt: Date;
};
