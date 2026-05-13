import { RoleEnum } from "../../common/enums/role.enum";

export interface AuthPayload {
  sub: string;
  email: string;
  name: string;
  lastname: string;
  career: string;
  dni: number;
  role: RoleEnum;
  changePassword: boolean;
}
