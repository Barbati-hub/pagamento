'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, CreditCard, Copy, Check } from 'lucide-react';
import { CartItem } from '@/types';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  items: CartItem[];
}

interface PixResponse {
  qrcode: string;
  qrcode_base64: string;
  copy_paste: string;
}

export function PaymentDialog({ open, onOpenChange, total, items }: PaymentDialogProps) {
  const [paymentStep, setPaymentStep] = useState<'method' | 'pix' | 'card'>('method');
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePix = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/pagamentos/pix', {
        valor: 0.01, // 1 centavo
        descricao: 'Teste de Pagamento'
      });
      setPixData(response.data);
      setPaymentStep('pix');
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-gray-50/95 backdrop-blur-sm border-0">
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <DialogTitle className="text-lg font-bold">
            {paymentStep === 'method' ? 'Resumo do Pedido' : 
             paymentStep === 'pix' ? 'Pagamento via PIX' : 
             'Pagamento com Cartão'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {paymentStep === 'method' ? (
            <>
              {/* Lista de Produtos */}
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
                        {item.quantity}x R$ {item.product.preco.toFixed(2)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        R$ {(item.quantity * item.product.preco).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200/50">
                <div className="flex items-center justify-between text-lg mb-6">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold text-orange-500">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                {/* Métodos de Pagamento */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Método de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto py-4 px-4 bg-white/80 hover:bg-white border-0 shadow-sm"
                      onClick={generatePix}
                      disabled={loading}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <QrCode className="h-6 w-6 text-orange-500" />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">PIX</div>
                          <div className="text-xs text-gray-500">
                            {loading ? 'Gerando...' : 'Aprovação Imediata'}
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto py-4 px-4 bg-white/80 hover:bg-white border-0 shadow-sm"
                      onClick={() => setPaymentStep('card')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <CreditCard className="h-6 w-6 text-orange-500" />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Cartão de Crédito</div>
                          <div className="text-xs text-gray-500">Até 12x sem juros</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : paymentStep === 'pix' && pixData ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <QRCodeSVG value={pixData.qrcode} size={200} />
              </div>
              
              <div className="space-y-2 w-full">
                <p className="text-sm text-gray-500 text-center">
                  Escaneie o QR Code acima ou copie o código PIX abaixo
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-white"
                    onClick={() => copyToClipboard(pixData.copy_paste)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar código PIX
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="font-medium text-sm">Valor a pagar:</p>
                <p className="text-2xl font-bold text-orange-500">R$ {total.toFixed(2)}</p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setPaymentStep('method')}
              >
                Escolher outro método de pagamento
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
} 