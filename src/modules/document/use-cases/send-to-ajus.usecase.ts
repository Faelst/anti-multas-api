import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class SendToAjusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(solicitationId: string) {
    const solicitation = await this.prisma.solicitation.findUnique({
      where: { id: solicitationId },
      include: {
        customer: {
          include: {
            Address: true,
          },
        },
        Inflations: true,
        SolicitationDocument: true,
        solicitationTransaction: {
          include: {
            transaction: true,
          },
        },
      },
    });

    const autor = [
      {
        nome: solicitation.customer.name,
        CNPJCPF: solicitation.customer.cpf,
        tipoPessoa: 'PF',
        estadoCivil: solicitation.customer.civil_state,
        carteiraIdentidade: solicitation.customer.rg,
        orgaoExpedidor: solicitation.customer.expeditor_rg,
        numeroCNH: solicitation.customer.cnh_number,
        ufCNH: solicitation.customer.cnh_uf,
        ddd: '',
        telefone: solicitation.customer.phone,
        email: solicitation.customer.email,
        endereco: {
          logradouro: solicitation.customer.Address[0].street,
          numero: solicitation.customer.Address[0].number,
          complemento: solicitation.customer.Address[0].complement,
          bairro: solicitation.customer.Address[0].neighborhood,
          cep: solicitation.customer.Address[0].zip_code,
          cidade: solicitation.customer.Address[0].city,
          uf: solicitation.customer.Address[0].state,
        },
        arquivos: solicitation.SolicitationDocument.filter(
          (doc) => doc.type === 'CNH' || doc.type === 'RG',
        ).map((doc) => ({
          nomeArquivo: `${doc.type} - ${doc.originalName}`,
          base64: doc.buffer.toString('base64'),
        })),
      },
    ];

    const arquivos = solicitation.SolicitationDocument.filter(
      (doc) => doc.type !== 'CNH',
    ).map((doc) => ({
      nomeArquivo: `${doc.type} - ${doc.originalName}`,
      base64: doc.buffer.toString('base64'),
    }));

    for (const inflations of solicitation.Inflations) {
      const payload = {
        // id: 0,
        tipoAcaoJudicial: 'Infração de Trânsito',
        natureza:
          inflations.recurseType === 'SIMPLE'
            ? 'RECURSO SIMPLES'
            : 'RECURSO ESPECIAL',
        situacao: 'Ativo',
        classificacao: 'Comum',
        processoVirtual: true,
        nomeCaptacao: solicitation.indicator,
        autor,
        arquivos,
        infracaoTransito: {
          listaCodDETRAN: [inflations.code],
          uf: 'MG',
          cidade: 'Belo Horizonte',
          numeroAIT: inflations.ait,
          numeroProcessamento: inflations.processamento,
          nomeProprietarioVeiculo: '',
          local: inflations.location,
          valor: inflations.inflation_amount / 100,
          data: inflations.date,
          hora: inflations.hour,
          condutorIdentificado: true,
          fici: true,
          numeroPortariaPunitiva: '',
          relatorio: '',
          veiculo: {
            uf: '',
            codTipoVeiculo: '',
            marca: '',
            modelo: '',
            ano: '',
            placa: inflations.vehiclePlate,
            cor: '',
            chassi: inflations.chassis,
            renavam: '',
          },
        },
        reu: [
          {
            nome: '',
            CNPJCPF: '',
            tipoPessoa: 'PJ',
          },
        ],
      };

      await axios.post(
        'https://sistema.ajus.com.br/webservices/infracao-transito-cadastro/',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpbmZyYWNhby10cmFuc2l0by1jYWRhc3RybyIsIm5hbWUiOiJzYWxpYmFfY29udGFnZW0iLCJpYXQiOjE1MTYyMzkwMjJ9.gRErCwGSPLvfxLa6f7b9nNZVEBx38YyGA7_ME8nXjAY',
          },
        },
      );
    }
  }
}
