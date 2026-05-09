import { GetUserDto } from "../../dto/get-user.dto";
import { User } from "../../infrastructure/entities/user.entity";

export class UserMapper {
  static toResponse(user: User): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      dni: user.dni,
      legajo: user.legajo,
      career: user.career,
      role: user.role
    };
  }
}
