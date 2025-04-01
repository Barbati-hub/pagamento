'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, CreditCard, Copy, Check } from 'lucide-react';
import { CartItem } from '@/types';
import Image from 'next/image';
import axios from 'axios';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  items: CartItem[];
  onPaymentSuccess?: () => void;
}

interface PixResponse {
  qrcode: string;
  qrcode_base64: string;
  copy_paste: string;
}

interface CardFormData {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
}

export function PaymentDialog({ open, onOpenChange, total, items, onPaymentSuccess }: PaymentDialogProps) {
  const [paymentStep, setPaymentStep] = useState<'method' | 'pix' | 'card'>('method');
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardData, setCardData] = useState<CardFormData>({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });
  const [cardError, setCardError] = useState('');

  const generatePix = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3333/pagamentos/pix', {
        valor: total,
        descricao: `Pedido com ${items.length} ${items.length === 1 ? 'item' : 'itens'}`
      });
      setPixData(response.data);
      setPaymentStep('pix');
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCardError('');

    try {
      // Validações básicas
      if (!cardData.numero || !cardData.nome || !cardData.validade || !cardData.cvv) {
        throw new Error('Preencha todos os campos do cartão');
      }

      if (cardData.numero.length < 16) {
        throw new Error('Número do cartão inválido');
      }

      if (cardData.cvv.length < 3) {
        throw new Error('CVV inválido');
      }

      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você implementaria a integração real com o gateway de pagamento
      
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      
      onOpenChange(false);
    } catch (error) {
      setCardError(error instanceof Error ? error.message : 'Erro ao processar pagamento');
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
          ) : paymentStep === 'pix' ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <img 
                  src={pixData?.qrcode_base64} 
                  alt="QR Code PIX"
                  className="w-[200px] h-[200px]"
                />
              </div>
              
              <div className="space-y-2 w-full">
                <p className="text-sm text-gray-500 text-center">
                  Escaneie o QR Code acima ou copie os dados abaixo
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-white"
                    onClick={() => pixData && copyToClipboard(pixData.copy_paste)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar dados
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap break-all">
                    {pixData?.copy_paste}
                  </pre>
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
          ) : (
            <form onSubmit={handleCardSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="numero" className="text-sm font-medium text-gray-900">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    id="numero"
                    maxLength={16}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={cardData.numero}
                    onChange={(e) => setCardData({ ...cardData, numero: e.target.value.replace(/\D/g, '') })}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-gray-900">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={cardData.nome}
                    onChange={(e) => setCardData({ ...cardData, nome: e.target.value })}
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="validade" className="text-sm font-medium text-gray-900">
                      Validade
                    </label>
                    <input
                      type="text"
                      id="validade"
                      maxLength={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={cardData.validade}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2);
                        }
                        setCardData({ ...cardData, validade: value });
                      }}
                      placeholder="MM/AA"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-sm font-medium text-gray-900">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              {cardError && (
                <div className="text-red-500 text-sm text-center">
                  {cardError}
                </div>
              )}

              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <p className="font-medium text-sm">Valor a pagar:</p>
                  <p className="text-2xl font-bold text-orange-500">R$ {total.toFixed(2)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setPaymentStep('method')}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : 'Pagar Agora'}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 