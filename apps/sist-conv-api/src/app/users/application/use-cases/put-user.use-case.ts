import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PutUserDto } from "../../dto/put-user.dto";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute (id: string, dto: PutUserDto) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    Object.assign(user, dto);

    await this.repo.save(user);

    return UserMapper.toResponse(user);
  }
}
