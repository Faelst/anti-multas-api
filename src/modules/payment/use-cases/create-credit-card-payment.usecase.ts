import { HttpStatus, Injectable } from '@nestjs/common';

import { AsaasService } from '../../../common/services/asaas/asaas.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateCreditCardPaymentUseCase {
  constructor(
    private readonly paymentService: AsaasService,
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

      let { data: asaasCustomer } = await this.paymentService.listCustomers(
        solicitation.customer.cpf,
      );

      if (!asaasCustomer.data.length) {
        asaasCustomer = await this.paymentService.createCustomer(
          solicitation.customer,
        );
      }

      const { data, status } = await this.paymentService.createOrder(
        asaasCustomer.data.length
          ? asaasCustomer.data[0].id
          : asaasCustomer.data.id,
        payment,
        solicitation as any,
      );

      if (status === HttpStatus.OK && data.status === 'CONFIRMED') {
        await this.prisma.solicitation.update({
          where: { id: payment.solicitationId },
          data: {
            status: 'Pagamento Realizado',
          },
        });

        this.eventEmitter.emit('document.send-email-to-signer', {
          solicitation: solicitation,
        });

        return data;
      }

      if (status === HttpStatus.OK && data.status === 'PENDING') {
        await this.prisma.solicitation.update({
          where: { id: payment.solicitationId },
          data: {
            status: 'Pagamento Pendente',
          },
        });

        return data;
      }

      if (!['PENDING', 'CONFIRMED'].includes(data.status)) {
        await this.prisma.solicitation.update({
          where: { id: payment.solicitationId },
          data: {
            status: 'Pagamento Falhou',
          },
        });

        return data;
      }
    } catch (error) {
      throw error;
    }
  }
}
