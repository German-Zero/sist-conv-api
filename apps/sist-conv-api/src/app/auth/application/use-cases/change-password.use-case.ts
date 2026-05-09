import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../../users/domain/repositories/user.repository";
import { ChangePasswordDto } from "../../dto/change-password.dto";
import { PasswordHasher } from "../../../common/security/password-hasher";

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(id: string, dto: ChangePasswordDto) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new NotFoundException('Usuario no existe');

    if (user.passwordChanged) {
      throw new BadRequestException('Contraseña ya fue cambiada');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);

    user.password = hashedPassword;
    user.passwordChanged = true;

    await this.userRepo.save(user);

    return { message: 'Contraseña cambiada exitosamente' };
  }
}
