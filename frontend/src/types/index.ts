export interface Product {
  id: string;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantidade: number;
  preco: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'pendente' | 'pago' | 'cancelado';
  items: OrderItem[];
  payment?: Payment;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  metodo: 'pix' | 'cartao';
  status: 'pendente' | 'pago' | 'cancelado';
  valor: number;
  qrCode?: string;
  dadosCartao?: {
    numero: string;
    nome: string;
    validade: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
} 