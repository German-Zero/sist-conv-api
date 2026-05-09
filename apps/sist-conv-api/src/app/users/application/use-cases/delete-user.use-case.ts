import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    await this.repo.remove(user);
  }
}
