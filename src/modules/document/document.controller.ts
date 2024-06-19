import { Body, Controller, Post } from '@nestjs/common';
import { WebhookDto } from './dto/webhook.dto';
import { UpdateDocumentStatusUseCase } from './use-cases/update-document-status.usecase';

@Controller('document')
export class DocumentController {
  constructor(
    private readonly updateDocumentStatusUseCase: UpdateDocumentStatusUseCase,
  ) {}

  @Post('webhook')
  webhook(
    @Body()
    body: WebhookDto,
  ) {
    return this.updateDocumentStatusUseCase.execute(body);
  }
}
