import React from 'react';

const Rodape = () => {
  return (
    <footer className="bg-black text-white font-poppins font-semibold text-sm border-t border-black py-5">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4">
        {/* Links do rodapé */}
        <div className="mb-5 text-center">
          <a href="/sobre-nos" className="mx-2 text-white no-underline hover:underline">
            Sobre Nós
          </a>
          <a href="/contato" className="mx-2 text-white no-underline hover:underline">
            Contato
          </a>
          <a href="/privacidade" className="mx-2 text-white no-underline hover:underline">
            Política de Privacidade
          </a>
          <a href="/termos" className="mx-2 text-white no-underline hover:underline">
            Termos de Serviço
          </a>
        </div>

        {/* Botões de download de apps (se aplicável) */}
        <div className="my-2">
          <img
            src="link-para-imagem-app1"
            alt="App 1"
            className="w-30 mx-2"
          />
          <img
            src="link-para-imagem-app2"
            alt="App 2"
            className="w-30 mx-2"
          />
        </div>

        {/* Links de redes sociais */}
        <div className="mb-5">
          <a
            href="https://facebook.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-lg text-white no-underline hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-lg text-white no-underline hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-lg text-white no-underline hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/company/seudominio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-lg text-white no-underline hover:underline"
          >
            LinkedIn
          </a>
        </div>

        {/* Texto de direitos autorais */}
        <p className="text-center">
          © 2024 Metamind Tecnologia. Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Rodape;
