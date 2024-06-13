import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerController } from './auth.controller';
import { ValidateUserUseCase } from './use-cases/validate-user.usecase';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '960s' },
      }),
    }),
  ],
  controllers: [CustomerController],
  providers: [JwtStrategy, ValidateUserUseCase, PrismaService, ConfigService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
