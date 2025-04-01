'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const { itemsCount } = useCart();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            E-commerce
          </Link>

          {/* Busca */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Busque aqui seu produto"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/favoritos" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Favoritos</span>
            </Link>

            <Link 
              href="/carrinho" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemsCount}
                </span>
              </div>
              <span>Carrinho</span>
            </Link>

            <Link 
              href="/entrar" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Entrar
            </Link>
          </nav>
        </div>

        {/* Menu de Categorias */}
        <nav className="flex items-center gap-6 h-12 text-gray-600">
          <Link href="/departamentos" className="hover:text-primary transition-colors">
            DEPARTAMENTOS
          </Link>
          <Link href="/hardware" className="hover:text-primary transition-colors">
            HARDWARE
          </Link>
          <Link href="/perifericos" className="hover:text-primary transition-colors">
            PERIFÉRICOS
          </Link>
          <Link href="/computadores" className="hover:text-primary transition-colors">
            COMPUTADORES
          </Link>
          <Link href="/celulares" className="hover:text-primary transition-colors">
            CELULARES
          </Link>
        </nav>
      </div>
    </header>
  );
} 