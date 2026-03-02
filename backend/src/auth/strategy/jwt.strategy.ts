import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(cfgService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: cfgService.get('JWT_SECRET') as string,
    });
  }

  validate(payload: any): { uid: string; email: string } {
    // o que eu retornar aqui vai para o user object da minha request
    return {
      uid: payload.sub,
      email: payload.email,
    };
  }
}
