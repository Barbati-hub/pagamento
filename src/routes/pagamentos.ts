import { Router } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { config } from '../config';

const router = Router();

// Configurar o Mercado Pago
const mercadopago = new MercadoPagoConfig({ accessToken: config.mercadoPagoAccessToken });
const payment = new Payment(mercadopago);

router.post('/pix', async (req, res) => {
  try {
    const { valor, descricao } = req.body;

    const result = await payment.create({
      body: {
        transaction_amount: valor,
        description: descricao,
        payment_method_id: 'pix',
        payer: {
          email: 'test@test.com',
        }
      }
    });

    if (!result.point_of_interaction?.transaction_data?.qr_code) {
      throw new Error('Dados do PIX não gerados corretamente');
    }

    const pixData = {
      qrcode: result.point_of_interaction.transaction_data.qr_code,
      qrcode_base64: result.point_of_interaction.transaction_data.qr_code_base64 || '',
      copy_paste: result.point_of_interaction.transaction_data.qr_code
    };

    res.json(pixData);
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    res.status(500).json({ error: 'Erro ao gerar PIX' });
  }
});

export default router; 