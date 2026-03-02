import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDTO, LoginResponseDTO, SignInDTO } from '../dtos/index.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignInDTO) {
    return this.authService.signup(dto);
  }

  @Get('login')
  login(@Body() dto: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(dto);
  }

  @Get('about-me')
  @UseGuards(AuthGuard('jwt'))
  aboutMe(@GetUser('email') email: string) {
    return this.authService.aboutMe(email);
  }
}
