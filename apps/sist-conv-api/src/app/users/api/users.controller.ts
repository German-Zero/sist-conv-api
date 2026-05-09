import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GetUserUseCase } from "../application/use-cases/get-user.use-case";
import { CreateUserUseCase } from "../application/use-cases/post-user.use-case";
import { UpdateUserUseCase } from "../application/use-cases/put-user.use-case";
import { DeleteUserUseCase } from "../application/use-cases/delete-user.use-case";
import { PutUserDto } from "../dto/put-user.dto";
import { PostUserDto } from "../dto/post-user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUser: GetUserUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getUser.execute();
  }

  @Post()
  post(@Body() dto: PostUserDto) {
    return this.createUser.execute(dto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: PutUserDto,
  ) {
    return this.updateUser.execute(id,dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
