import { Router } from 'express';
import QRCode from 'qrcode';

const router = Router();

router.post('/pix', async (req, res) => {
  try {
    const { valor, descricao } = req.body;

    // Validar os dados recebidos
    if (!valor || valor <= 0) {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    if (!descricao) {
      return res.status(400).json({ error: 'Descrição é obrigatória' });
    }

    // Criar texto do PIX com os dados do teste
    const pixText = `
      Telefone: 69984528189
      Nome: Douglas Alves Barbati
      Valor: R$ ${valor.toFixed(2)}
      Descrição: ${descricao}
      (TESTE - NÃO É UM PIX REAL)
    `.trim();

    // Gerar QR Code
    const qrcode = await QRCode.toDataURL(pixText);

    const pixData = {
      qrcode: pixText,
      qrcode_base64: qrcode,
      copy_paste: pixText
    };

    console.log('PIX gerado para teste:', { valor, descricao });
    res.json(pixData);
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ 
      error: 'Erro ao gerar PIX',
      details: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 