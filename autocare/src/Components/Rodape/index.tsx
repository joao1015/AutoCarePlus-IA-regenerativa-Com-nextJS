import React from 'react';
import Image from 'next/image';
import LogoMetamind from './Imagens/LogoMetamind.png';

const Rodape = () => {
  return (
    <footer className="bg-black text-white font-poppins font-semibold text-sm border-t border-black py-5">
      <div className="max-w-6xl mx-auto px-4 relative text-center">
        {/* Links do rodapé */}
       

        {/* Links de redes sociais */}
        <div className="mb-5 text-lg">
          <a
            href="https://facebook.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 no-underline hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 no-underline hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 no-underline hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/company/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 no-underline hover:underline"
          >
            LinkedIn
          </a>
        </div>

        {/* Texto de direitos autorais */}
        <p>© 2024 Metamind Tecnologia. Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Rodape;
