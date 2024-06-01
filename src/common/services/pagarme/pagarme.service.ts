import { Prisma } from '@prisma/client';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from '../../../modules/payment/dto/create-order.dto';

export class PagarmeService {
  constructor(
    private readonly pagarmeInstance = axios.create({
      baseURL: process.env.PAGARME_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.PAGARME_API_KEY,
        password: '',
      },
      timeout: 60000,
    }),
  ) {}

  async createOrder(solitication: any, payment: CreateOrderDto) {
    const payload = JSON.stringify({
      items: solitication.Inflations?.map((inflation) => ({
        id: randomUUID(),
        title: inflation.description,
        unit_price: inflation.paymentAmount,
        quantity: 1,
        tangible: false,
      })),
      customer: {
        name: solitication.customer.name,
        email: solitication.customer.email,
        document: solitication.customer.cpf,
        type: 'individual',
        phones: {
          home_phone: {
            country_code: '55',
            area_code: '21',
            number: '000000000',
          },
          mobile_phone: {
            country_code: '55',
            area_code: solitication.customer.phone?.slice(0, 2),
            number: solitication.customer.phone?.slice(2),
          },
        },
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            recurrence: false,
            installments: payment.creditCard.installments,
            statement_descriptor: 'AntiMultas',
            card: {
              number: payment.creditCard.number,
              holder_name: payment.creditCard.holderName,
              exp_month: payment.creditCard.expMonth,
              exp_year: payment.creditCard.expYear,
              cvv: payment.creditCard.cvv,
              billing_address: {
                line_1: solitication.customer.Address.street,
                zip_code: solitication.customer.Address.zip_code,
                city: solitication.customer.Address.city,
                state: solitication.customer.Address.state,
                country: 'br',
              },
            },
          },
        },
      ],
    });

    const { data } = await this.pagarmeInstance.post('/orders', payload);

    return data;
  }
}
