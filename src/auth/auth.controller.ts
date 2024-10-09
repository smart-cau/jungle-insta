import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '~/src/auth/auth.service';
import { AuthCredentialsDto } from '~/src/auth/dto/auth-credentials-dto.dto';
import {
  ApiConflictResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiConflictResponse({ description: 'email 중복 시 발생' })
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('sign-in')
  @ApiUnauthorizedResponse({ description: '잘못된 email or password' })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
