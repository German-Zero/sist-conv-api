import { Injectable } from "@nestjs/common";
import { BusinessRepository } from "../../domain/repositories/business.repository";
import { BusinessMapper } from "../mappers/businesses.mapper";

@Injectable()
export class GetBusinessUseCase {
  constructor(
    private readonly repo: BusinessRepository,
  ) {}

    async execute() {
      const businesses = await this.repo.findAll();

      return businesses.map(BusinessMapper.toResponse);
  }
}
