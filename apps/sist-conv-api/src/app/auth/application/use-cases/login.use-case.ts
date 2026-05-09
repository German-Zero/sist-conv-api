import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../../../users/domain/repositories/user.repository";
import { PasswordHasher } from "../../../common/security/password-hasher";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { AuthPayload } from "../../domain/auth-payload";

export class LoginUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordHashed: PasswordHasher,
  ) {}

async execute(email: string, password: string) {
  const user = await this.userRepo.findByEmail(email);


  if (!user) {
    throw new UnauthorizedException();
  }

  const isValid = await this.passwordHashed.compare(
    password,
    user.password,
  );

  if (!isValid) {
    throw new UnauthorizedException();
  }

  const payload: AuthPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    changePassword: user.passwordChanged,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
