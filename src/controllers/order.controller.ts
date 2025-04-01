import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const orderController = {
  // Criar um novo pedido
  async createOrder(req: Request, res: Response) {
    const { userId, items } = req.body;
    try {
      // Calcular o total do pedido
      const total = items.reduce((acc: number, item: any) => {
        return acc + (item.preco * item.quantidade);
      }, 0);

      // Criar o pedido com seus itens
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantidade: item.quantidade,
              preco: item.preco
            }))
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  },

  // Obter pedidos de um usuário
  async getUserOrders(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: true
            }
          },
          payment: true
        }
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  },

  // Obter um pedido específico
  async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: true
            }
          },
          payment: true
        }
      });
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
  },

  // Atualizar status do pedido
  async updateOrderStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const order = await prisma.order.update({
        where: { id },
        data: { status }
      });
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
    }
  }
}; 