import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
  port: 3333,
  databaseUrl: process.env.DATABASE_URL || ''
}; 