import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessRepository } from "../../domain/repositories/business.repository";
import cloudinary from "../../../config/cloudinary.config";

@Injectable()
export class DeleteBusinessUseCase {
  constructor(
    private readonly repo: BusinessRepository,
  ) {}

  async execute(id: string) {
    const business = await this.repo.findById(id);

    if (!business) {
      throw new NotFoundException('Business Not Found');
    }

    if (business.logoPublicId) {
      await cloudinary.uploader.destroy(
        business.logoPublicId,
      );
    }

    await this.repo.remove(business);

    return { message: 'Business deleted successfully' };
  }
}
