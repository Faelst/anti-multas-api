import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadSolicitationDocumentsUseCase } from './use-cases/upload-solicitation-documents.usecase';

@Controller('solicitation')
export class SolicitationController {
  constructor(
    private readonly createSolicitationUseCase: CreateSolicitationUseCase,
    private readonly uploadSolicitationDocumentsUseCase: UploadSolicitationDocumentsUseCase,
  ) {}

  @Post('')
  executePayment(@Body() infractions: CreateSolicitationDto) {
    return this.createSolicitationUseCase.execute(infractions);
  }

  @Post('upload-documents/:solicitationId')
  @UseInterceptors(FilesInterceptor('documents'))
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('solicitationId') solicitationId: string,
  ) {
    return this.uploadSolicitationDocumentsUseCase.execute({
      solicitationId,
      files: files,
    });
  }
}
