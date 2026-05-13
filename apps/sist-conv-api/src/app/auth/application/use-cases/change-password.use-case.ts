import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../../users/domain/repositories/user.repository";
import { ChangePasswordDto } from "../../dto/change-password.dto";
import { PasswordHasher } from "../../../common/security/password-hasher";
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "../../domain/auth-payload";

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(id: string, dto: ChangePasswordDto) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new NotFoundException('Usuario no existe');

    const isValid = await this.passwordHasher.compare(dto.currentPassword, user.password)

    if (!isValid) {
      throw new UnauthorizedException('Invalid Password')
    }

    user.password = await this.passwordHasher.hash(dto.newPassword)

    user.passwordChanged = true;

    await this.userRepo.save(user);

    const payload: AuthPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      career: user.career,
      dni: user.dni,
      role: user.role,
      changePassword: user.passwordChanged,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' }),
    };
  }
}
