import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    customerId,
    data,
  }: {
    customerId: string;
    data: Partial<CreateCustomerDto>;
  }) {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      throw new Error('Customer not found');
    }

    return this.prisma.customer.update({
      where: { id: customerId },
      data: {
        rg: data.rg,
        email: data.email,
        expeditor_rg: data.expeditorRg,
        occupation: data.occupation,
        cnh_number: data.cnhNumber,
        cnh_uf: data.cnhUf,
        civil_state: data.civilState,
      },
    });
  }
}
