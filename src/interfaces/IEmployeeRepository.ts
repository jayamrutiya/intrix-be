import {
  CreateEmployee,
  GetEmployeeService,
  UpdateEmployee,
} from "../types/Employee";

export interface IEmployeeRepository {
  getEmployee(name: string): Promise<GetEmployeeService | null>;

  createEmployee(name: string): Promise<GetEmployeeService>;

  updateEmployee(
    id: number,
    employee: UpdateEmployee
  ): Promise<GetEmployeeService>;

  getEmployeeById(userUuid: string): Promise<GetEmployeeService | null>;
}
