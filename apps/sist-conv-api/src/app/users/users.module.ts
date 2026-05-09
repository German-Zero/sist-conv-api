import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./infrastructure/entities/user.entity";
import { UserRepository } from "./domain/repositories/user.repository";
import { UsersController } from "./api/users.controller";
import { GetUserUseCase } from "./application/use-cases/get-user.use-case";
import { CreateUserUseCase } from "./application/use-cases/post-user.use-case";
import { UpdateUserUseCase } from "./application/use-cases/put-user.use-case";
import { DeleteUserUseCase } from "./application/use-cases/delete-user.use-case";
import { UserRepositoryImpl } from "./infrastructure/repositories/user.repository.impl";
import { PasswordHasher } from "../common/security/password-hasher";
import { BcryptPasswordHasher } from "../common/security/bcrypt-password-hasher";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [
    GetUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,

    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    }
  ],
  exports: [UserRepository]
})
export class UsersModule {}
