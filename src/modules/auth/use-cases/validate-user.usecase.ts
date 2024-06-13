import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    return {
      access_token: this.jwtService.sign(
        {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          customerId: user.customerId,
          sub: user.id,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '960s',
        },
      ),
    };
  }
}
