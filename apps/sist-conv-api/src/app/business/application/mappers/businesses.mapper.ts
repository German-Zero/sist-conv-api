import { GetBusinessDto } from "../../dto/business-res.dto";
import { Business } from "../../infrastructure/entities/business.entity";

export class BusinessMapper {
  static toResponse(business: Business): GetBusinessDto {
    return {
      id: business.id,
      name: business.name,
      address: business.address,
      discount: business.discount,
      logoUrl: business.logoUrl,
    };
  }
}
