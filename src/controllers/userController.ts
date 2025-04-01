import { Request, Response } from 'express'
import prisma from '../config/prisma'

export const createUser = async (req: Request, res: Response) => {
  const { nome, endereco, email, senha } = req.body
  try {
    const user = await prisma.user.create({
      data: { nome, endereco, email, senha },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: error })
  }
}
