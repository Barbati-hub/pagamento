import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateQRCode } from '../utils/qrcode';

const prisma = new PrismaClient();

export const paymentController = {
  // Iniciar pagamento
  async initiatePayment(req: Request, res: Response) {
    const { orderId, userId, metodo } = req.body;
    try {
      // Buscar o pedido
      const order = await prisma.order.findUnique({
        where: { id: orderId }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      // Criar o pagamento
      const payment = await prisma.payment.create({
        data: {
          orderId,
          userId,
          metodo,
          valor: order.total,
          status: 'pendente'
        }
      });

      // Se for PIX, gerar QR Code
      if (metodo === 'pix') {
        const qrCode = await generateQRCode(payment.id, order.total);
        await prisma.payment.update({
          where: { id: payment.id },
          data: { qrCode }
        });
      }

      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao iniciar pagamento' });
    }
  },

  // Processar pagamento com cartão
  async processCardPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    const { dadosCartao } = req.body;

    try {
      // Aqui você implementaria a integração com um gateway de pagamento
      // Por enquanto, vamos apenas simular um processamento bem-sucedido
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          dadosCartao,
          status: 'pago'
        }
      });

      // Atualizar status do pedido
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'pago' }
      });

      return res.json(payment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  },

  // Verificar status do pagamento PIX
  async checkPixPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId }
      });

      if (!payment) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      // Aqui você implementaria a verificação real do status do PIX
      // Por enquanto, vamos apenas retornar o status atual
      return res.json({ status: payment.status });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao verificar status do pagamento' });
    }
  },

  // Cancelar pagamento
  async cancelPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    try {
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'cancelado' }
      });

      // Atualizar status do pedido
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'cancelado' }
      });

      return res.json(payment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cancelar pagamento' });
    }
  }
}; 