'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { PaymentDialog } from './PaymentDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handlePaymentSuccess = () => {
    clearCart();
    setShowPayment(false);
    toast({
      title: "Pagamento realizado com sucesso!",
      description: "Seu pedido foi confirmado e será enviado em breve.",
      duration: 5000,
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative bg-orange-500 hover:bg-orange-600 border-0"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-5 w-5 text-white" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-red-600 hover:bg-red-600 border-2 border-white"
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 bg-gray-50/95 backdrop-blur-sm border-0">
          <DialogHeader className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <DialogTitle className="text-lg font-bold">Carrinho de Compras</DialogTitle>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Seu carrinho está vazio</h3>
                <p className="text-sm text-gray-500">
                  Adicione produtos ao seu carrinho para continuar comprando
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[60vh] p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm">
                      <div className="w-16 h-16 relative rounded-md bg-white p-2 shadow-sm">
                        <Image
                          src={item.product.imagem || ''}
                          alt={item.product.nome}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {item.product.nome}
                        </h4>
                        <div className="text-sm text-gray-500">
                          R$ {item.product.preco.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-orange-500"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-orange-500"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-red-500"
                            onClick={() => removeItem(item.product.id)}
                            title="Remover item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        R$ {(item.quantity * item.product.preco).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-gray-200/50 bg-white/50 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold text-orange-500">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="bg-white/80 hover:bg-white hover:text-gray-900 text-gray-600"
                    onClick={clearCart}
                  >
                    Limpar Carrinho
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg"
                    onClick={() => {
                      setShowPayment(true);
                      setIsOpen(false);
                    }}
                  >
                    Finalizar Compra
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Frete grátis para compras acima de R$ 299,00
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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