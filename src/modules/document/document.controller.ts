import { Body, Controller, Post } from '@nestjs/common';

@Controller('document')
export class DocumentController {
  constructor() {}

  @Post('webhook')
  webhook(
    @Body()
    body: {
      uuid: string;
      type_post: string;
      message: string;
    },
  ) {
    console.log('Webhook received', body);
    return { message: 'Webhook received', body };
  }
}
