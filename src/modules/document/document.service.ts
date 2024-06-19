import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { D4SignService } from '../../common/services/d4sign/d4sing.service';
import { Customer, Solicitation } from '@prisma/client';
import { SendDocumentToLegalUseCase } from './use-cases/send-legal-document.usecase';

@Injectable()
export class DocumentEventReceiverService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly d4SignService: D4SignService,
    private readonly sendDocumentToLegalUseCase: SendDocumentToLegalUseCase,
  ) {}

  @OnEvent('document.signed')
  async handleDocumentSigned(solicitationId: string) {
    this.sendDocumentToLegalUseCase.execute(solicitationId);
  }

  @OnEvent('document.send-email-to-signer')
  async handleSendEmailToSigner({
    solicitation,
  }: {
    solicitation: Solicitation & { customer: Customer };
  }) {
    try {
      const { uuid: documentId } = await this.d4SignService.createDocument({
        customerName: solicitation.customer.name,
        currentDate: new Date().toISOString(),
        customerExpeditorRg: solicitation.customer.expeditor_rg,
        customerRg: solicitation.customer.rg,
      });

      await this.d4SignService.createSigner({
        email: solicitation.customer.email,
        documentId: documentId,
      });

      await this.d4SignService.sendToSigner(documentId);

      await this.prisma.solicitation.update({
        where: {
          id: solicitation.id,
        },
        data: {
          status: 'Aguardando Assinatura',
          signer_document_id: documentId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
