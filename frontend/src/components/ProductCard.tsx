'use client';

import Image from 'next/image';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const originalPrice = product.preco * 1.2; // 20% mais caro
  const installmentValue = product.preco / 10; // 10x sem juros

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Badge de Oferta */}
      <div className="relative">
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          OFERTA
        </span>
      </div>

      {/* Imagem do Produto */}
      <div className="relative h-48 bg-gray-100">
        {product.imagem && (
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            className="object-contain p-4 hover:scale-105 transition-transform"
          />
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        <h3 className="text-sm text-gray-700 font-medium line-clamp-2 min-h-[40px]">
          {product.nome}
        </h3>

        {/* Preços */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              R$ {originalPrice.toFixed(2)}
            </span>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
              20% OFF
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              R$ {product.preco.toFixed(2)}
            </span>
            <span className="text-sm text-gray-600">
              10x de R$ {installmentValue.toFixed(2)} sem juros
            </span>
          </div>
        </div>

        {/* Controles de Quantidade e Botão */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => handleQuantityChange(-1)}
              className="p-1 hover:text-primary transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              className="p-1 hover:text-primary transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
} 