import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user) {
    return {
      access_token: this.jwtService.sign(
        { username: user.username, sub: user.userId },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
    };
  }

  async validarUsuario({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.prisma.
    
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    if (user.password === password) {
      return await this.generateToken(user);
    }

    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }
}
