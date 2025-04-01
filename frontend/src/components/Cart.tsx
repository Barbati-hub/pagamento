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

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

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
        <DialogContent className="sm:max-w-[425px] p-0 bg-gray-50/95 backdrop-blur-sm border-0">
          <DialogHeader className="px-6 py-4 bg-orange-500 text-white">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <ShoppingCart className="h-5 w-5" />
              Carrinho de Compras
            </DialogTitle>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-700 text-center">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-500 text-center mt-1">
                Adicione produtos para começar suas compras
              </p>
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[60vh]">
                <div className="px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="flex gap-4 p-4 rounded-lg bg-white/80 hover:bg-white/90 transition-colors shadow-sm"
                    >
                      {/* Imagem do Produto */}
                      <div className="w-20 h-20 rounded-md bg-white p-2 shadow-sm">
                        <Image
                          src={item.product.imagem || ''}
                          alt={item.product.nome}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-medium text-sm text-gray-900 truncate">
                            {item.product.nome}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            R$ {item.product.preco.toFixed(2)}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-white"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-white"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          Subtotal: R$ {(item.product.preco * item.quantity).toFixed(2)}
                        </div>
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
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
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
      />
    </>
  );
} 