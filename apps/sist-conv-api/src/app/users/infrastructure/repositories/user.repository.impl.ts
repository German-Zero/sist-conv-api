import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async remove(user: User): Promise<void> {
    await this.repo.remove(user);
  }
}
