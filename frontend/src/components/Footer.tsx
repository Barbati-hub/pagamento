import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/central-ajuda" className="text-gray-400 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-gray-400 hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/frete" className="text-gray-400 hover:text-white transition-colors">
                  Política de Frete
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/fale-conosco" className="text-gray-400 hover:text-white transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-gray-400 hover:text-white transition-colors">
                  Rastreamento
                </Link>
              </li>
              <li>
                <Link href="/whatsapp" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Redes Sociais</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 E-commerce. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 