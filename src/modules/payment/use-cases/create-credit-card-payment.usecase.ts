import { HttpStatus, Injectable } from '@nestjs/common';

import { PagarmeService } from '../../../common/services/pagarme/pagarme.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateCreditCardPaymentUseCase {
  constructor(
    private readonly pagarmeService: PagarmeService,
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
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

      // const { data, status } = await this.pagarmeService.createOrder(
      //   solicitation,
      //   payment,
      // );

      const { data, status } = {
        status: 200,
        data: {
          status: 'paid',
        },
      };

      if (status === HttpStatus.OK && data.status === 'paid') {
        await this.prisma.solicitation.update({
          where: { id: payment.solicitationId },
          data: {
            status: 'Aguardando Assinatura',
          },
        });

        this.eventEmitter.emit('document.send-email-to-signer', {
          solicitation: solicitation,
        });
      }

      return data;
    } catch (error) {
      return error;
    }
  }
}
