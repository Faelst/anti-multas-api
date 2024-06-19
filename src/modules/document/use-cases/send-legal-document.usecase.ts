import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class SendDocumentToLegalUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(solicitationId: string) {
    const solicitation = await this.prisma.solicitation.findUnique({
      where: { id: solicitationId },
      include: {
        customer: {
          include: {
            Address: true,
          },
        },
        Inflations: true,
        SolicitationDocument: true,
        solicitationTransaction: {
          include: {
            transaction: true,
          },
        },
      },
    });

    console.log('Document signed', solicitation);
  }
}
