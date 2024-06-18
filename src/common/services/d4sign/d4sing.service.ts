import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export class D4SignService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosInstance = axios.create({
      baseURL: process.env.D4_SIGN_API_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    }),
  ) {
    this.axiosInstance.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        tokenAPI: process.env.D4_SIGN_API_TOKEN,
        cryptKey: process.env.D4_SIGN_API_CRYPT_KEY,
      };

      return config;
    });
  }

  async sendToSigner(documentId: string) {
    const { data } = await this.axiosInstance.post(
      `/documents/${documentId}/sendtosigner`,
      {
        message: 'Anti-Multas Por favor, assine o documento.',
        skip_email: '1',
        workflow: '0',
      },
    );

    return data.body;
  }

  async createSigner({
    email,
    documentId,
  }: {
    email: string;
    documentId: string;
  }) {
    const { data } = await this.axiosInstance.post(
      `/documents/${documentId}/createlist`,
      {
        signers: [
          {
            email,
            act: 1,
            foreign: 0,
            certificadoicpbr: 0,
            assinatura_presencial: 0,
          },
        ],
      },
    );

    return data.body;
  }

  async createDocument({
    customerName,
    customerRg,
    customerExpeditorRg,
    currentDate,
  }: {
    customerName: string;
    customerRg: string;
    customerExpeditorRg: string;
    currentDate: string;
  }) {
    const { data } = await this.axiosInstance.post(
      `/documents/${process.env.D4_SIGN_UUID_SAFE}/makedocumentbytemplateword`,
      {
        templates: {
          [`${process.env.D4_SIGN_TEMPLATE_ID}`]: {
            costumer_name: customerName,
            costumer_rg: customerRg,
            costumer_expeditor_rg: customerExpeditorRg,
            current_data: currentDate,
          },
        },
      },
    );

    return data;
  }
}
