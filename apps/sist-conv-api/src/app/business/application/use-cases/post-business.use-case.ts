import { BadRequestException, Injectable } from "@nestjs/common";
import { BusinessRepository } from "../../domain/repositories/business.repository";
import { PostBusinessDto } from "../../dto/post-business.dto";
import { Business } from "../../infrastructure/entities/business.entity";
import { BusinessMapper } from "../mappers/businesses.mapper";
import cloudinary from "../../../config/cloudinary.config";
import * as fs from 'fs';

@Injectable()
export class CreateBusinessUseCase {
  constructor(
    private readonly repo: BusinessRepository,
  ) {}

  async execute(dto: PostBusinessDto, file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('Logo file is required');
    }

    const uploadResult = await cloudinary.uploader.upload(
      file.path,
      {
        folder: 'businesses',
      },
    );

    fs.unlinkSync(file.path);

    const business = new Business();
    business.name = dto.name;
    business.address = dto.address;
    business.discount = dto.discount;
    business.logoUrl = uploadResult.secure_url;
    business.logoPublicId = uploadResult.public_id;
    await this.repo.save(business);

    return BusinessMapper.toResponse(business);
  }
}
