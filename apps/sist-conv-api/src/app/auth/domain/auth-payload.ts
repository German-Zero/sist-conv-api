import { RoleEnum } from "../../common/enums/role.enum";

export interface AuthPayload {
  sub: string;
  email: string;
  role: RoleEnum;
  changePassword: boolean;
}
