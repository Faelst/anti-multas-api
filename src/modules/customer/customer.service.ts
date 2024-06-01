import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(client: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({ data: client });
  }
}
