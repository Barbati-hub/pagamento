import axios from 'axios';
import { Product, Order, Payment } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error - No Response:', error.message);
    } else {
      // Error in request configuration
      console.error('Request Config Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Produtos
  async getProducts(): Promise<Product[]> {
    try {
      const response = await api.get('/produtos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Erro ao buscar produtos');
    }
  },

  // Pedidos
  async createOrder(items: any) {
    try {
      const response = await api.post('/pedidos', items);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Erro ao criar pedido');
    }
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const response = await api.get(`/pedidos/usuario/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Erro ao buscar pedidos');
    }
  },

  // Pagamentos
  async initiatePayment(orderId: string, userId: string, method: 'pix' | 'cartao'): Promise<Payment> {
    try {
      const response = await api.post('/pagamentos', { orderId, userId, method });
      return response.data;
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error);
      throw new Error('Erro ao iniciar pagamento');
    }
  },

  async processCardPayment(paymentId: string, cardData: { numero: string; nome: string; validade: string }): Promise<Payment> {
    try {
      const response = await api.post(`/pagamentos/${paymentId}/processar`, cardData);
      return response.data;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw new Error('Erro ao processar pagamento');
    }
  },

  async checkPixPayment(paymentId: string): Promise<Payment> {
    try {
      const response = await api.get(`/pagamentos/${paymentId}/status`);
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw new Error('Erro ao verificar status do pagamento');
    }
  },
};

export default api; 