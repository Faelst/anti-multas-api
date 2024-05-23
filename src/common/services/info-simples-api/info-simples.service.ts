import axios from 'axios';

export class InfoSimplesService {
  constructor(
    private readonly axiosInstance = axios.create({
      baseURL: process.env.INFO_SIMPLES_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        Origin: 'https://www.infosimples.com',
      },
      timeout: 60000,
    }),
  ) {
    this.axiosInstance.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        token: process.env.INFO_SIMPLES_API_TOKEN,
      };

      return config;
    });
  }

  async getTrafficInflations({
    chassi,
    vehiclePlate,
  }: {
    chassi: string;
    vehiclePlate: string;
  }) {
    return this.axiosInstance.get(
      `/v2/consultas/detran/mg/multas-descritivos?timeout=600&placa=${vehiclePlate}&chassi=${chassi}`,
    );
  }
}
