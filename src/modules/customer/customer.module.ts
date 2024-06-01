import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCustomerUseCase } from './use-cases/create-customer.usecase';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, CreateCustomerUseCase],
})
export class CustomerModule {}
