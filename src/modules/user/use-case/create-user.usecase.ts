import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ firstName, lastName, email, password, cpf }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    return this.prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        cpf,
        email,
        password: hashedPassword,
        customerId: customer ? customer.id : null,
      },
    });
  }
}
