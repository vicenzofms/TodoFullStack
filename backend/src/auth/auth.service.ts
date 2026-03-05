import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, LoginResponseDTO, SignInDTO } from '../dtos/auth.dto.js';
import * as argon from 'argon2';
import { DbService } from '../db/db.service.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private jwt: JwtService,
    private cfgService: ConfigService,
  ) {}

  async signup(dto: SignInDTO): Promise<LoginResponseDTO> {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          name: dto.name ?? '',
          pwHash: hash,
        },
      });

      const jwtToken = await this.getToken(user.id, user.email);
      return { name: user.name, token: jwtToken };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // já existe um usuário com esse email
        // ver mais em: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            errorMessage: 'Já existe um usuário com esse endereço de e-mail.',
          });
        }
      }
      // erro não vem do Prisma
      throw error;
    }
  }

  async login(dto: LoginDTO): Promise<LoginResponseDTO> {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // garante que existe um usuário
      if (!user)
        throw new ForbiddenException({
          errorMessage: 'Endereço de e-mail não foi encontrado.',
        });

      const passwordMatch = await argon.verify(user.pwHash, dto.password);
      if (!passwordMatch)
        throw new ForbiddenException({
          errorMessage: 'A senha está incorreta.',
        });

      // tudo certo!
      const jwtToken = await this.getToken(user.id, user.email);
      return {
        name: user.name,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async aboutMe(email: string) {
    try {
      const user = await this.dbService.user.findUnique({ where: { email } });

      if (!user)
        return new ForbiddenException({
          errorMessage: 'Usuário não encontrado.',
        });

      const { pwHash, ...safeUser } = user; // remove a hash da senha

      return safeUser;
    } catch (error) {
      throw error;
    }
  }

  private getToken(uid: string, email: string): Promise<string> {
    const payload = {
      sub: uid,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: this.cfgService.get('JWT_SECRET'),
    });
  }
}
