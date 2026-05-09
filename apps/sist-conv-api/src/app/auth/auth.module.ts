import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { JwtStrategy } from "./infrastructure/jwt.strategy";
import { JwtAuthGuard } from "../common/security/jwt-auth.guard";
import { RolesGuard } from "../common/security/roles.guard";
import { BcryptPasswordHasher } from "../common/security/bcrypt-password-hasher";
import { PasswordHasher } from "../common/security/password-hasher";
import { AuthController } from "./api/auth.controller";
import { ChangePasswordUseCase } from "./application/use-cases/change-password.use-case";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ChangePasswordUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    }
  ],
  exports: []
})
export class AuthModule {}
