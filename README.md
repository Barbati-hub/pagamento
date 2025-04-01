# Sistema de E-commerce

Este é um sistema de e-commerce simples desenvolvido com Node.js, Express, TypeScript e Prisma.

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Ajuste as variáveis conforme necessário

4. Configure o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

## Executando o projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Obtém um produto específico
- `POST /api/products` - Cria um novo produto
- `PUT /api/products/:id` - Atualiza um produto
- `DELETE /api/products/:id` - Remove um produto

### Pedidos
- `POST /api/orders` - Cria um novo pedido
- `GET /api/orders/user/:userId` - Lista pedidos de um usuário
- `GET /api/orders/:id` - Obtém um pedido específico
- `PUT /api/orders/:id/status` - Atualiza o status de um pedido

### Pagamentos
- `POST /api/payments` - Inicia um novo pagamento
- `POST /api/payments/:paymentId/card` - Processa pagamento com cartão
- `GET /api/payments/:paymentId/pix/status` - Verifica status do pagamento PIX
- `POST /api/payments/:paymentId/cancel` - Cancela um pagamento

## Funcionalidades

- Gerenciamento de produtos
- Carrinho de compras
- Processamento de pedidos
- Pagamentos via PIX e Cartão de Crédito
- Geração de QR Code para pagamentos PIX
- Verificação de status de pagamentos 