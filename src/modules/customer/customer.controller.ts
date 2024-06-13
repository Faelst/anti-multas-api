import { Controller, Post, Body, Put, Param } from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { CreateCustomerUseCase } from './use-cases/create-customer.usecase';
import { UpdateCustomerUseCase } from './use-cases/update-customer.usecase';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createClientDto);
  }

  @Post('add-address')
  addAddress(@Body() address: AddAddressDto) {
    return this.createCustomerUseCase.addAddress(address);
  }

  @Put(':customerId')
  update(
    @Param('customerId') customerId: string,
    @Body() data: Partial<CreateCustomerDto>,
  ) {
    return this.updateCustomerUseCase.execute({
      customerId,
      data,
    });
  }
}
