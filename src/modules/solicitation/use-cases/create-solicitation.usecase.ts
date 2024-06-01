import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { SolicitationStatus } from '../../../common/enums/solicitation-status.enum';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';

@Injectable()
export class CreateSolicitationUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ customerId, inflations }: CreateSolicitationDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        Address: true,
      },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const paymentAmount = inflations.reduce(
      (acc, inflation) => acc + inflation.paymentAmount,
      0,
    );

    const solicitation = await this.prisma.solicitation.create({
      data: {
        status: SolicitationStatus.PENDING,
        customerId: customer.id,
        amount_payment: paymentAmount * 100,
      },
    });

    const inflationsData = inflations.map((inflation) => ({
      especial_amount: inflation.especialAmount * 100,
      simple_amount: inflation.simpleAmount * 100,
      inflation_amount: inflation.inflationAmount * 100,
      payment_amount: inflation.paymentAmount * 100,
      type_selected: inflation.type,
      description: inflation.description,
      solicitationId: solicitation.id,
    }));

    await this.prisma.inflations.createMany({
      data: inflationsData,
    });

    const inflationsCreated = await this.prisma.inflations.findMany({
      where: { solicitationId: solicitation.id },
    });

    await this.prisma.solicitationTransaction.create({
      data: {
        solicitationId: solicitation.id,
        customerId: customer.id,
        transactionId: null,
      },
    });

    return {
      solicitation,
      inflations: inflationsCreated,
    };
  }
}
