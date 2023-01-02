export declare type GetEmployeeService = {
  id: number;
  email: string;
  name: string | null;
  userUuid: string | null;
  createdAt: Date;
};

export declare type CreateEmployee = {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: number;
  isActive: boolean;
};

export declare type UpdateEmployee = {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: number;
  isActive: boolean;
};
