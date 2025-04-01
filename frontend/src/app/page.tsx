'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { apiService } from '@/services/api';
import { ChevronLeft, ChevronRight, Truck, CreditCard, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-600">
          <p className="text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Principal */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 mix-blend-multiply opacity-10 bg-[url('/grid.svg')]" />
            <div className="relative flex items-center justify-between h-[400px] px-8">
              <button className="text-white p-2 hover:bg-black/20 rounded-full transition-colors">
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="text-center text-white">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                  Mega Promoção
                </h1>
                <p className="text-xl sm:text-2xl mb-8">
                  Até 65% de desconto
                </p>
                <div className="inline-block">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-lg">
                    10x sem juros
                  </span>
                </div>
              </div>

              <button className="text-white p-2 hover:bg-black/20 rounded-full transition-colors">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Frete Grátis</h3>
                <p className="text-sm text-gray-500">Em compras acima de R$ 299</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Parcele em até 10x</h3>
                <p className="text-sm text-gray-500">Sem juros no cartão</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Compra Segura</h3>
                <p className="text-sm text-gray-500">Site 100% seguro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Produtos */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ofertas em Destaque</h2>
            <p className="text-gray-500 mt-1">As melhores ofertas selecionadas para você</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Produtos: {products.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
