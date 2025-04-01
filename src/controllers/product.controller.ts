import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productController = {
  // Listar todos os produtos
  async listProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  // Obter um produto específico
  async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id }
      });
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  // Criar um novo produto
  async createProduct(req: Request, res: Response) {
    const { nome, preco, descricao, imagem } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          nome,
          preco: parseFloat(preco),
          descricao,
          imagem
        }
      });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  // Atualizar um produto
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, preco, descricao, imagem } = req.body;
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          nome,
          preco: parseFloat(preco),
          descricao,
          imagem
        }
      });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  // Deletar um produto
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.product.delete({
        where: { id }
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
}; 