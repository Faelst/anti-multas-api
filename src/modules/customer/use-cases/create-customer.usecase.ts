import { Injectable } from '@nestjs/common';

import { CreateCustomerDto } from '../dto/create-customer.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AddAddressDto } from '../dto/add-address.dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(customer: CreateCustomerDto) {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { cpf: customer.cpf },
    });

    if (existingCustomer) {
      return existingCustomer;
    }

    return this.prisma.customer.create({
      data: {
        ...customer,
        cpf: customer.cpf,
        phone: customer.phone,
      },
    });
  }

  async addAddress(address: AddAddressDto) {
    return this.prisma.address.create({
      data: {
        city: address.city,
        number: address.number,
        state: address.state,
        street: address.street,
        complement: address.complement,
        neighborhood: address.neighborhood,
        zip_code: address.zipCode,
        customerId: address.customerId,
      },
    });
  }
}
