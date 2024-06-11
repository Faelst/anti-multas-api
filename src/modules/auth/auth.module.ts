import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: 'secret',

      signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [JwtStrategy],

  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
