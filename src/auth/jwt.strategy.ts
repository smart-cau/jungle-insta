import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '~/src/auth/user.repository';
import * as config from 'config';
import { AuthCredentialsDto } from '~/src/auth/dto/auth-credentials-dto.dto';
import { User } from '~/src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthCredentialsDto): Promise<User> {
    const { email } = payload;
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
