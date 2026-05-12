import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DeleteBusinessUseCase } from "../application/use-cases/delete-business.use-case";
import { UpdateBusinessUseCase } from "../application/use-cases/put-business.use-case";
import { CreateBusinessUseCase } from "../application/use-cases/post-business.use-case";
import { GetBusinessUseCase } from "../application/use-cases/get-business.use-case";
import { PostBusinessDto } from "../dto/post-business.dto";
import { PutBusinessDto } from "../dto/put-business.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('businesses')
export class BusinessController {
  constructor(
    private readonly getBusiness: GetBusinessUseCase,
    private readonly createBusiness: CreateBusinessUseCase,
    private readonly updateBusiness: UpdateBusinessUseCase,
    private readonly deleteBusiness: DeleteBusinessUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getBusiness.execute();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      dest: './temp'
    }),
  )
  post(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: PostBusinessDto,
  ) {
    return this.createBusiness.execute(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      dest: './temp'
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: PutBusinessDto,
  ) {
    return this.updateBusiness.execute(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteBusiness.execute(id);
  }
}
