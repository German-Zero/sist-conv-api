import { Body, Controller, Get, InternalServerErrorException, Post, Res, UseGuards } from "@nestjs/common";
import { LoginUseCase } from "../application/use-cases/login.use-case";
import { ChangePasswordUseCase } from "../application/use-cases/change-password.use-case";
import { JwtAuthGuard } from "../../common/security/jwt-auth.guard";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { AuthPayload } from "../domain/auth-payload";
import type { Response } from "express";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: LoginUseCase,
    private readonly changePass: ChangePasswordUseCase,
  ) {}

  @Post('/login')
  async loginUser(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.login.execute(body.email, body.password)
    if (!result.access_token) {
      throw new InternalServerErrorException('Token not generated')
    }

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(
    @CurrentUser() user: AuthPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePass.execute(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure:true,
      sameSite: 'lax',
      path: '/'
    });

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthPayload) {
    return {
      id: user.sub,
      email: user.email,
      role: user.role,
      changePassword: user.changePassword
    }
  }
}
