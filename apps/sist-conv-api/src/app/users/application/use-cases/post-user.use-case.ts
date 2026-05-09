import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PostUserDto } from "../../dto/post-user.dto";
import { User } from "../../infrastructure/entities/user.entity";
import { randomBytes } from "crypto";
import { PasswordHasher } from "../../../common/security/password-hasher";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashPassword: PasswordHasher,
  ) {}

  async execute(dto: PostUserDto) {
    const existing = await this.userRepo.findByEmail(dto.email);

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const tempPassword = randomBytes(4).toString('hex')
    const hashedPassword = await this.hashPassword.hash(tempPassword);

    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.lastname = dto.lastname;
    user.password = hashedPassword;
    user.passwordChanged = false;
    user.dni = dto.dni;
    user.legajo = dto.legajo;
    user.career = dto.career;
    user.role = dto.userType;

    await this.userRepo.save(user)

    return {
      user: UserMapper.toResponse(user),
      tempPassword,
    }
  }
}
