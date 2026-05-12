import { Module } from "@nestjs/common";
import { BusinessController } from "./api/business.controller";
import { Business } from "./infrastructure/entities/business.entity";
import { BusinessRepository } from "./domain/repositories/business.repository";
import { BusinessRepositoryImpl } from "./infrastructure/repositories/business.repository.impl";
import { DeleteBusinessUseCase } from "./application/use-cases/delete-business.use-case";
import { UpdateBusinessUseCase } from "./application/use-cases/put-business.use-case";
import { CreateBusinessUseCase } from "./application/use-cases/post-business.use-case";
import { GetBusinessUseCase } from "./application/use-cases/get-business.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]),
  ],
  controllers: [BusinessController],
  providers: [
    GetBusinessUseCase,
    CreateBusinessUseCase,
    UpdateBusinessUseCase,
    DeleteBusinessUseCase,

    {
      provide: BusinessRepository,
      useClass: BusinessRepositoryImpl,
    }
  ],
  exports: [BusinessRepository]
})
export class BusinessModule {}
