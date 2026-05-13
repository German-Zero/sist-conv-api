import { Body, Controller, Get, InternalServerErrorException, Patch, Post, Res, UseGuards } from "@nestjs/common";
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

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  async changePassword(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: AuthPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    const result = await this.changePass.execute(user.sub, dto)

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { success: true, }

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

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure:true,
      sameSite: 'lax',
    });

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthPayload) {
    return {
      id: user.sub,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      career: user.career,
      dni: user.dni,
      userType: user.role,
      changePassword: user.changePassword
    }
  }
}
