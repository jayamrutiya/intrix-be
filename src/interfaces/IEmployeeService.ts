import {
  CreateEmployee,
  GetEmployeeService,
  UpdateEmployee,
} from "../types/Employee";

export interface IEmployeeService {
  getEmployee(name: string): Promise<GetEmployeeService>;

  createEmployee(name: string): Promise<GetEmployeeService>;

  updateEmployee(
    id: number,
    employee: UpdateEmployee
  ): Promise<GetEmployeeService>;

  getEmployeeById(userUuid: string): Promise<GetEmployeeService | null>;
}
