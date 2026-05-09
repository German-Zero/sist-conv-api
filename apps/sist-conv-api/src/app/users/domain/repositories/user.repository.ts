import { User } from "../../infrastructure/entities/user.entity";

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract remove(user: User): Promise<void>;
}
