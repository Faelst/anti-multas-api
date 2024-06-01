import { Controller, Post, Body } from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { CreateCustomerUseCase } from './use-cases/create-customer.usecase';

@Controller('customer')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  create(@Body() createClientDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createClientDto);
  }

  @Post('add-address')
  addAddress(@Body() address: AddAddressDto) {
    return this.createCustomerUseCase.addAddress(address);
  }
}
