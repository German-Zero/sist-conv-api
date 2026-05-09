import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute() {
    const users = await this.repo.findAll();

    return users.map(UserMapper.toResponse);
  }
}
