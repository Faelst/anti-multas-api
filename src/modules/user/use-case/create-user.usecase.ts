import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ firstName, lastName, email, password }: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
