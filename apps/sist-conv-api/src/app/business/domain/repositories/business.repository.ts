import { Business } from "../../infrastructure/entities/business.entity";

export abstract class BusinessRepository {
  abstract findAll(): Promise<Business[]>;
  abstract findById(id: string): Promise<Business | null>;
  abstract save(business: Business): Promise<Business>;
  abstract remove(business: Business): Promise<void>;
}
