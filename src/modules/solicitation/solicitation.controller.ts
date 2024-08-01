import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSolicitationDto,
  InflationsDto,
} from './dto/create-solicitation.dto';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadSolicitationDocumentsUseCase } from './use-cases/upload-solicitation-documents.usecase';
import { UpdateSolicitationUseCase } from './use-cases/update-solicitation.usecase';

@Controller('solicitation')
export class SolicitationController {
  constructor(
    private readonly createSolicitationUseCase: CreateSolicitationUseCase,
    private readonly uploadSolicitationDocumentsUseCase: UploadSolicitationDocumentsUseCase,
    private readonly updateSolicitationUseCase: UpdateSolicitationUseCase,
  ) {}

  @Post('')
  executePayment(@Body() infractions: CreateSolicitationDto) {
    return this.createSolicitationUseCase.execute(infractions);
  }

  @Post('upload-documents/:solicitationId')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('solicitationId') solicitationId: string,
  ) {
    return this.uploadSolicitationDocumentsUseCase.execute({
      solicitationId,
      files: files,
    });
  }

  @Put(':solicitationId')
  updateSolicitation(
    @Param('solicitationId') solicitationId: string,
    @Body() data: Partial<InflationsDto>,
  ) {
    return this.updateSolicitationUseCase.execute({
      solicitationId,
      data,
    });
  }
}
