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
      console.log(error.response.data);
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
        expiryMonth: payment.creditCard.expMonth,
        expiryYear: payment.creditCard.expYear,
        ccv: payment.creditCard.cvv,
      },
      creditCardHolderInfo: {
        name: solicitation.customer.name,
        email: solicitation.customer.email,
        cpfCnpj: solicitation.customer.cpf,
        postalCode: solicitation.customer.Address.zip_code,
        addressNumber: solicitation.customer.Address.number,
        phone: solicitation.customer.phone,
      },
      value: solicitation.amount_payment,
      dueDate: new Date().toISOString(),
    };

    try {
      const { data, status } = await this.instance.post('/payments', payload);

      return { data, status };
    } catch (error) {
      console.log(error.response.data);
      throw new Error('Pagamento não autorizado, tenta novamente!');
    }
  }
}
