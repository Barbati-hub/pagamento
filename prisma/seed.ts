import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  await prisma.product.deleteMany();

  // Criar produtos
  await prisma.product.create({
    data: {
      nome: 'Smartphone Samsung Galaxy A71',
      descricao: 'Smartphone Samsung Galaxy A71 128GB Azul 6GB RAM',
      preco: 1999.99,
      imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421779-1200-1200/Smartphone-Samsung-Galaxy-A71-128GB'
    }
  });

  await prisma.product.create({
    data: {
      nome: 'Notebook Acer Aspire 5',
      descricao: 'Notebook Acer Aspire 5 Intel Core i5-1135G7 8GB 256GB SSD W11 15.6" Full HD',
      preco: 4999.99,
      imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421778-1200-1200/Notebook-Acer-Aspire-5-Intel-Core-i5'
    }
  });

  await prisma.product.create({
    data: {
      nome: 'Fone de Ouvido JBL T500BT',
      descricao: 'Fone de Ouvido Bluetooth JBL T500BT Preto',
      preco: 299.99,
      imagem: 'https://lojaibyte.vteximg.com.br/arquivos/ids/421780-1200-1200/Fone-de-Ouvido-JBL-T500BT'
    }
  });

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 