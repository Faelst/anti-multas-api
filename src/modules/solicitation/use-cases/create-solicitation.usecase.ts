import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { SolicitationStatus } from '../../../common/enums/solicitation-status.enum';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';

@Injectable()
export class CreateSolicitationUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ customerId, infractions, indicator }: CreateSolicitationDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        Address: true,
      },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const paymentAmount = infractions.reduce(
      (acc, inflation) => acc + inflation.paymentAmount,
      0,
    );

    const solicitation = await this.prisma.solicitation.create({
      data: {
        status: SolicitationStatus.PENDING,
        customerId: customer.id,
        amount_payment: paymentAmount * 100,
        indicator,
      },
    });

    const inflationsData = infractions.map((infraction) => ({
      code: infraction.code,
      especial_amount: infraction.especialAmount * 100,
      simple_amount: infraction.simpleAmount * 100,
      inflation_amount: infraction.inflationAmount * 100,
      payment_amount: infraction.paymentAmount * 100,
      type_selected: infraction.type,
      description: infraction.description,
      solicitationId: solicitation.id,
      vehiclePlate: infraction.vehiclePlate,
      chassis: infraction.chassis,
      date: infraction.date,
      hour: infraction.hour,
      location: infraction.location,
      ait: infraction.ait,
      orgao: infraction.orgao,
      processamento: infraction.processamento,
      recurseType:
        infraction.recurseType === 'recursoSimples' ? 'SIMPLE' : 'ESPECIAL',
    }));

    await this.prisma.inflations.createMany({
      data: inflationsData as any,
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
