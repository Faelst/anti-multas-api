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
      customer: {
        name: solitication.customer.name,
        email: solitication.customer.email,
        document: solitication.customer.cpf,
        document_type: 'CPF',
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
      items: solitication.Inflations?.map((inflation) => ({
        code: randomUUID(),
        amount: inflation.payment_amount,
        description: inflation.description,
        quantity: 1,
      })),
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
                line_1: solitication.customer.Address[0].street,
                zip_code: solitication.customer.Address[0].zip_code,
                city: solitication.customer.Address[0].city,
                state: solitication.customer.Address[0].state,
                country: 'br',
              },
            },
          },
        },
      ],
    });

    try {
      const { data } = await this.pagarmeInstance.post('/orders', payload);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
