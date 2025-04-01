'use client';

import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PaymentDialog } from '@/components/PaymentDialog';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, total, itemsCount, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePaymentSuccess = () => {
    clearCart();
    setShowPayment(false);
    toast({
      title: "Pagamento realizado com sucesso!",
      description: "Seu pedido foi confirmado e será enviado em breve.",
      duration: 5000,
    });
    router.push('/');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Seu Carrinho</h1>
          <p className="text-gray-500 mb-8">Seu carrinho está vazio.</p>
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                {/* Imagem */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md">
                  {item.product.imagem && (
                    <Image
                      src={item.product.imagem}
                      alt={item.product.nome}
                      fill
                      className="object-contain p-2"
                    />
                  )}
                </div>

                {/* Informações */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.nome}</h3>
                  <p className="text-sm text-gray-500">{item.product.descricao}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-orange-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-orange-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900">
                        R$ {(item.product.preco * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({itemsCount} {itemsCount === 1 ? 'item' : 'itens'})</span>
                  <span className="text-gray-900">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  em até 10x de R$ {(total / 10).toFixed(2)} sem juros
                </p>
              </div>

              <button 
                onClick={() => setShowPayment(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium mt-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Finalizar Compra</span>
              </button>

              <Link
                href="/"
                className="block text-center text-orange-500 hover:text-orange-600 font-medium mt-4"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        total={total}
        items={items}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
} 