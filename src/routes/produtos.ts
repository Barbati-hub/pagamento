import { Router } from 'express';

const router = Router();

// Dados mockados dos produtos (do seed.ts)
const produtos = [
  {
    id: '1',
    nome: 'Smartphone Samsung Galaxy A71',
    descricao: 'Smartphone Samsung Galaxy A71 128GB Azul 6GB RAM',
    preco: 1999.99,
    imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421779-1200-1200/Smartphone-Samsung-Galaxy-A71-128GB'
  },
  {
    id: '2',
    nome: 'Notebook Acer Aspire 5',
    descricao: 'Notebook Acer Aspire 5 Intel Core i5-1135G7 8GB 256GB SSD W11 15.6" Full HD',
    preco: 4999.99,
    imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421778-1200-1200/Notebook-Acer-Aspire-5-Intel-Core-i5'
  },
  {
    id: '3',
    nome: 'Fone de Ouvido JBL T500BT',
    descricao: 'Fone de Ouvido Bluetooth JBL T500BT Preto',
    preco: 299.99,
    imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421780-1200-1200/Fone-de-Ouvido-JBL-T500BT'
  }
];

// Listar todos os produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// Buscar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

export default router; 