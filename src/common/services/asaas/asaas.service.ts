import axios from 'axios';
import { CreateOrderDto } from '../../../modules/payment/dto/create-order.dto';
import { Address, Customer, Solicitation } from '@prisma/client';

export class AsaasService {
  constructor(
    private readonly instance = axios.create({
      baseURL: process.env.AACT_API_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'anti-multas-api',
        access_token: process.env.ASAAS_API_TOKEN,
      },
      timeout: 60000,
    }),
  ) {}

  async createCustomer(customer: Customer) {
    const payload = {
      name: customer.name,
      cpfCnpj: customer.cpf,
    };

    try {
      const { data, status } = await this.instance.post('/customers', payload);

      return { data, status };
    } catch (error) {
      console.log(error.response.data);
      throw new Error('Cliente não cadastrado');
    }
  }

  async listCustomers(cpf: string) {
    try {
      const { data, status } = await this.instance.get('/customers', {
        params: {
          cpfCnpj: cpf,
        },
      });

      return { data, status };
    } catch (error) {
      console.log(error.response);
      throw new Error('Cliente não encontrado');
    }
  }

  async createOrder(
    customerAsaasId: string,
    payment: CreateOrderDto,
    solicitation: Solicitation & { customer: Customer & { Address: Address } },
  ) {
    const payload = {
      customer: customerAsaasId,
      billingType: 'CREDIT_CARD',
      creditCard: {
        holderName: payment.creditCard.holderName,
        number: payment.creditCard.number,
        expiryMonth: payment.creditCard.expMonth.toString(),
        expiryYear: payment.creditCard.expYear.toString(),
        ccv: payment.creditCard.cvv.toString(),
      },
      creditCardHolderInfo: {
        name: solicitation.customer.name,
        email: solicitation.customer.email,
        cpfCnpj: solicitation.customer.cpf,
        postalCode: solicitation.customer.Address[0].zip_code,
        addressNumber: solicitation.customer.Address[0].number,
        phone: solicitation.customer.phone,
      },
      value: solicitation.amount_payment / 100,
      dueDate: new Date().toISOString().split('T')[0],
    };
    console.log(payload);
    try {
      const { data, status } = await this.instance.post('/payments', payload);

      return { data, status };
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.errors[0].code === 'invalid_creditCard') {
        throw new Error(error.response.data.errors[0].description);
      }
    }
  }
}
