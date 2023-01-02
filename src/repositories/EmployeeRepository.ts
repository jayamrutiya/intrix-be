import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { BadRequest } from "../errors/BadRequest";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFound } from "../errors/NotFound";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import {
  CreateEmployee,
  GetEmployeeService,
  UpdateEmployee,
} from "../types/Employee";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private _loggerService: ILoggerService;
  private _databaseService: IDatabaseService;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.DatabaseService) databaseService: IDatabaseService
  ) {
    this._loggerService = loggerService;
    this._databaseService = databaseService;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async getEmployeeById(userUuid: string): Promise<GetEmployeeService | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const getUser = await client.user.findFirst({
        where: {
          userUuid,
        },
      });

      console.log("getUser", getUser);

      return getUser;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);

      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async getEmployee(name: string): Promise<GetEmployeeService | null> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      const getUser = await client.user.findFirst({
        where: {
          name,
        },
      });

      return getUser;
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);

      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async createEmployee(name: string): Promise<GetEmployeeService> {
    try {
      // Get the database client
      const client = this._databaseService.Client();

      return client.user.create({
        data: {
          name,
          email: "test@yopmail.com",
          userUuid: uuidv4(),
        },
      });
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }

  async updateEmployee(
    id: number,
    employee: UpdateEmployee
  ): Promise<GetEmployeeService> {
    try {
      // Get the database client
      // const client = this._databaseService.Client();

      return {
        id: id,
        // firstName: employee.firstName,
        // lastName: employee.lastName,
        // emailId: employee.emailId,
        // phoneNumber: employee.phoneNumber,
        // isActive: employee.isActive,
        // updatedAt: new Date(),
        createdAt: new Date(),
        name: employee.firstName,
        email: employee.emailId,
        userUuid: null,
      };
    } catch (error) {
      this._loggerService.getLogger().error(`Error ${error}`);
      throw new InternalServerError(
        "An error occurred while interacting with the database."
      );
    } finally {
      // await this._databaseService.disconnect();
    }
  }
}
