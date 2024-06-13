import { Injectable } from '@nestjs/common';
import { InflationsDto } from '../dto/create-solicitation.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class UpdateSolicitationUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    solicitationId,
    data,
  }: {
    solicitationId: string;
    data: Partial<InflationsDto>;
  }) {
    const solicitation = await this.prisma.solicitation.findUnique({
      where: { id: solicitationId },
    });

    if (!solicitation) {
      throw new Error('Solicitation not found');
    }

    return this.prisma.solicitation.update({
      where: { id: solicitationId },
      data: {
        vehicle_owner: data.vehicleOwner,
      },
    });
  }
}
