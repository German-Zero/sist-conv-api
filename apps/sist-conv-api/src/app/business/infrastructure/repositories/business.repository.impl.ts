import { Injectable } from "@nestjs/common";
import { BusinessRepository } from "../../domain/repositories/business.repository";
import { Business } from "../entities/business.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BusinessRepositoryImpl implements BusinessRepository {
  constructor(
    @InjectRepository(Business)
    private readonly repo: Repository<Business>,
  ) {}

  save(business: Business): Promise<Business> {
    return this.repo.save(business);
  }

  findById(id: string): Promise<Business | null> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<Business[]> {
    return this.repo.find();
  }

  async remove(business: Business): Promise<void> {
    await this.repo.remove(business);
  }
}
