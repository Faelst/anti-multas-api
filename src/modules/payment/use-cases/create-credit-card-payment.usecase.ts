import { Injectable } from '@nestjs/common';

import { PagarmeService } from '../../../common/services/pagarme/pagarme.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class CreateCreditCardPaymentUseCase {
  constructor(
    private readonly pagarmeService: PagarmeService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(payment: CreateOrderDto) {
    try {
      const solicitation = await this.prisma.solicitation.findUnique({
        where: { id: payment.solicitationId },
        include: {
          customer: {
            include: {
              Address: true,
            },
          },
          Inflations: true,
        },
      });

      if (!solicitation) {
        throw new Error('Solicitation not found');
      }

      return this.pagarmeService.createOrder(solicitation, payment);
    } catch (error) {
      return error;
    }
  }
}
