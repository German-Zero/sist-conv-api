import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessRepository } from "../../domain/repositories/business.repository";
import { BusinessMapper } from "../mappers/businesses.mapper";
import { PutBusinessDto } from "../../dto/put-business.dto";
import cloudinary from "../../../config/cloudinary.config";
import * as fs from 'fs';

@Injectable()
export class UpdateBusinessUseCase {
  constructor(
    private readonly repo: BusinessRepository,
  ) {}

    async execute (id: string, dto: PutBusinessDto, file?: Express.Multer.File) {
      const business = await this.repo.findById(id);

    if (!business) {
      throw new NotFoundException('Business Not Found');
    }

    if (file) {
      if (business.logoPublicId) {
        await cloudinary.uploader.destroy(
          business.logoPublicId,
        );
      }

      const uploadResult =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder: 'businesses',
          },
        );

      business.logoUrl = uploadResult.secure_url;
      business.logoPublicId =
        uploadResult.public_id;

      fs.unlinkSync(file.path);
    }

    Object.assign(business, dto);

    await this.repo.save(business);

    return BusinessMapper.toResponse(business);
  }
}
