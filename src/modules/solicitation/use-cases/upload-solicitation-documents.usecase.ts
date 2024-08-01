import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

enum DocumentType {
  documentNotification = 'NOTIFICATION',
  documentCNH = 'CNH',
  documentCRLV = 'CRLV',
}

@Injectable()
export class UploadSolicitationDocumentsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    solicitationId,
    files,
  }: {
    solicitationId: string;
    files: Express.Multer.File[];
  }) {
    const solicitation = await this.prisma.solicitation.findUnique({
      where: {
        id: solicitationId,
      },
    });

    if (!solicitation) {
      throw new Error('Solicitation not found');
    }

    const filesUploaded = [];

    for (const file of files) {
      const fileUploaded = await this.prisma.solicitationDocument.create({
        data: {
          solicitationId,
          buffer: file.buffer,
          originalName: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          fileName: file.originalname.replace(/\.[^/.]+$/, ''),
          size: file.size,
          type: DocumentType[file.fieldname],
        },
      });

      delete fileUploaded.buffer;

      filesUploaded.push(fileUploaded);
    }

    return filesUploaded;
  }
}
