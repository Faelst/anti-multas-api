import { Injectable } from '@nestjs/common';
import { InfoSimplesService } from '../../../common/services/info-simples-api/info-simples.service';

const mock = {
  code: 200,
  code_message: 'A requisição foi processada com sucesso.',
  header: {
    api_version: 'v2',
    api_version_full: '2.2.18-20240527162702',
    product: 'Consultas',
    service: 'detran/mg/multas-descritivos',
    parameters: {
      chassi: '3N1BC1AS2CL356451',
      placa: 'HCE7383',
    },
    client_name: 'Antimultas Brasil Servicos Administrativos Ltda',
    token_name: 'Antimultas Brasil Servicos Administrativos Ltda',
    billable: true,
    price: '0.24',
    requested_at: '2024-05-27T19:03:30.000-03:00',
    elapsed_time_in_milliseconds: 8792,
    remote_ip: '44.205.12.170',
    signature:
      'U2FsdGVkX18Avez/s/wFpCN/y8qDXYbATT6R2TZyVYi4TgUSWBUO1M7khg4/rhgQiV7HrDTUMXAU08WYBEiq9w==',
  },
  data_count: 1,
  data: [
    {
      ano_fabricacao: '2011',
      ano_modelo: '2012',
      autuacoes: [
        {
          tipo: 'autuacao',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'NOTIFICACAO DA AUTUACAO EMITIDA',
          marca_cor: 'I/NISSAN TIIDA SEDAN 18F',
          codigo: '745-50',
          data: '06/04/2024',
          hora: '01:32',
          descricao:
            '20/05/2024 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local:
            'AVENIDA CRISTIANO MACHADO, 4001 SENTIDO BAIRRO / CENTRO FAIXA 3 - CENTRAL DIREI',
          municipio: 'BELO HORIZONTE',
          data_incluida: '15/04/2024',
          data_defesa: '20/05/2021',
          ait: 'AH11654007',
          processamento: '12933715',
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190329/0TVSzPJeQnbYhNfdeVU_E9eV4TruO6LL/autuacao-HCE7383-3N1BC1AS2CL356451-AH11654007.html',
        },
        {
          tipo: 'autuacao',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'NOTIFICACAO DA AUTUACAO EMITIDA',
          marca_cor: 'I/NISSAN TIIDA SEDAN 18F',
          codigo: '745-50',
          data: '06/04/2024',
          hora: '01:32',
          descricao:
            '20/05/2024 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local:
            'AVENIDA CRISTIANO MACHADO, 4001 SENTIDO BAIRRO / CENTRO FAIXA 3 - CENTRAL DIREI',
          municipio: 'BELO HORIZONTE',
          data_incluida: '15/04/2024',
          data_defesa: '20/05/2021',
          ait: 'AH11654007',
          processamento: '12933715',
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190329/0TVSzPJeQnbYhNfdeVU_E9eV4TruO6LL/autuacao-HCE7383-3N1BC1AS2CL356451-AH11654007.html',
        },
        {
          tipo: 'autuacao',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'NOTIFICACAO DA AUTUACAO EMITIDA',
          marca_cor: 'I/NISSAN TIIDA SEDAN 18F',
          codigo: '745-50',
          data: '06/04/2025',
          hora: '01:32',
          descricao:
            '20/05/2025- TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local:
            'AVENIDA CRISTIANO MACHADO, 4001 SENTIDO BAIRRO / CENTRO FAIXA 3 - CENTRAL DIREI',
          municipio: 'BELO HORIZONTE',
          data_incluida: '15/04/2024',
          data_defesa: '20/05/2025',
          ait: 'AH11654007',
          processamento: '12933715',
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190329/0TVSzPJeQnbYhNfdeVU_E9eV4TruO6LL/autuacao-HCE7383-3N1BC1AS2CL356451-AH11654007.html',
        },
        {
          tipo: 'autuacao',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'NOTIFICACAO DA AUTUACAO EMITIDA',
          marca_cor: 'I/NISSAN TIIDA SEDAN 18F',
          codigo: '745-50',
          data: '06/04/2025',
          hora: '01:32',
          descricao:
            '20/05/2025 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local:
            'AVENIDA CRISTIANO MACHADO, 4001 SENTIDO BAIRRO / CENTRO FAIXA 3 - CENTRAL DIREI',
          municipio: 'BELO HORIZONTE',
          data_incluida: '15/04/2024',
          data_defesa: '20/05/2025',
          ait: 'AH11654007',
          processamento: '12933715',
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190329/0TVSzPJeQnbYhNfdeVU_E9eV4TruO6LL/autuacao-HCE7383-3N1BC1AS2CL356451-AH11654007.html',
        },
      ],
      data_licenciamento: '8/1/2023',
      impedimentos_e_restricoes: '',
      impedimentos_e_restricoes_url: '',
      ipva_pago: '2023',
      marca: 'PASSAGEIRO / AUTOMOVEL I/NISSAN TIIDA SEDAN 18F',
      mensagem_pendencias: 'Este Veículo tem 1 autuação e tem 2 multas.',
      mensagem_veiculo_recuperado: null,
      multas: [
        {
          tipo: 'multa',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'A PAGAR',
          marca_cor: 'I NISSAN TIIDA SEDAN-PRATA',
          codigo: '745-50',
          data: '21/08/2025',
          hora: '14:47',
          descricao:
            'TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local: 'AVENIDA PRESIDENTE JUSCELINO KUBITSCHEK',
          municipio: 'BELO HORIZONTE',
          data_incluida: '06/11/2023',
          data_defesa: '06/12/2021',
          ait: 'AH11027711',
          processamento: '12470229',
          valor: 'R$ 130,16',
          normalizado_valor: 130.16,
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190325/OQlYIWuy3gERTXZkB0t0oALImuE1CbrF/multa-HCE7383-3N1BC1AS2CL356451-AH11027711.html',
        },
        {
          tipo: 'multa',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'A PAGAR',
          marca_cor: 'I NISSAN TIIDA SEDAN-PRATA',
          codigo: '745-50',
          data: '21/08/2025',
          hora: '14:47',
          descricao:
            'TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local: 'AVENIDA PRESIDENTE JUSCELINO KUBITSCHEK',
          municipio: 'BELO HORIZONTE',
          data_incluida: '06/11/2023',
          data_defesa: '06/12/2021',
          ait: 'AH11027711',
          processamento: '12470229',
          valor: 'R$ 130,16',
          normalizado_valor: 130.16,
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190325/OQlYIWuy3gERTXZkB0t0oALImuE1CbrF/multa-HCE7383-3N1BC1AS2CL356451-AH11027711.html',
        },
        {
          tipo: 'multa',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'A PAGAR',
          marca_cor: 'I NISSAN TIIDA SEDAN-PRATA',
          codigo: '745-50',
          data: '09/10/2023',
          hora: '21:52',
          descricao:
            '15/01/2025 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local: 'AVENIDA TERESA CRISTINA, 9793SENTIDO BA',
          municipio: 'BELO HORIZONTE',
          data_incluida: '14/12/2023',
          data_defesa: '15/01/2025',
          ait: 'AH11239364',
          processamento: '12560432',
          valor: 'R$ 130,16',
          normalizado_valor: 130.16,
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190327/XhB2_SN33iHTyXar19gmmvj6TnvcqWo-/multa-HCE7383-3N1BC1AS2CL356451-AH11239364.html',
        },
        {
          tipo: 'multa',
          orgao: 'PREF. DE: MG - BELO HORIZONTE',
          placa: 'HCE7383',
          situacao: 'A PAGAR',
          marca_cor: 'I NISSAN TIIDA SEDAN-PRATA',
          codigo: '745-50',
          data: '15/01/2025',
          hora: '21:52',
          descricao:
            '15/01/2025 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20',
          local: 'AVENIDA TERESA CRISTINA, 9793SENTIDO BA',
          municipio: 'BELO HORIZONTE',
          data_incluida: '14/12/2023',
          data_defesa: '15/01/2025',
          ait: 'AH11239364',
          processamento: '12560432',
          valor: 'R$ 130,16',
          normalizado_valor: 130.16,
          html_url:
            'https://storage.googleapis.com/infosimples-api-tmp/detran/mg/multas-descritivos/20240527190327/XhB2_SN33iHTyXar19gmmvj6TnvcqWo-/multa-HCE7383-3N1BC1AS2CL356451-AH11239364.html',
        },
      ],
      municipio: 'BELO HORIZONTE',
      municipio_anterior: '',
      numero_ar: '',
      parcela_ipva: '3',
      parcela_seguro: '',
      parcela_seguro_anterior: '',
      placa_anterior: '',
      seguro_anterior_pago: '',
      seguro_pago: '',
      situacao_licenciamento: 'VEICULO LICENCIADO PARA O ANO 2023',
      taxa_licenciamento_paga: '2023',
      site_receipt:
        'https://storage.googleapis.com/infosimples-api-tmp/api/detran/mg/multas-descritivos/20240527190330/WZzIG5D64_YS-NH6Gx99sB--bdkZ7n_4/045a3abf3472bd162ab0375e0c59fe7b_0_MY4.html',
    },
  ],
  errors: [],
  site_receipts: [
    'https://storage.googleapis.com/infosimples-api-tmp/api/detran/mg/multas-descritivos/20240527190330/WZzIG5D64_YS-NH6Gx99sB--bdkZ7n_4/045a3abf3472bd162ab0375e0c59fe7b_0_MY4.html',
  ],
};

@Injectable()
export class FindTrafficInflationUseCase {
  constructor(private readonly infoSimplesService: InfoSimplesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ chassi, vehiclePlate }) {
    // const { data } = await this.infoSimplesService.getTrafficInflations({
    //   chassi,
    //   vehiclePlate,
    // });

    return mock;
  }
}
