"use client"; // Importante para uso no Next.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from './Imagems/LogoAutoCareplus.png';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Cabecalho: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para monitorar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Tela média (md) começa em 768px no Tailwind
    };

    handleResize(); // Definir valor inicial
    window.addEventListener("resize", handleResize); // Atualizar ao redimensionar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-4 border-b-2 border-black z-50 lg:h-24">
      <Link href="/" className="flex-shrink-0">
        <Image
          src={logo}
          alt="Logo do AutoCarePlus"
          width={80}
          height={80}
          className="cursor-pointer"
        />
      </Link>

      {/* Menu completo para telas grandes */}
      <nav className={`${isLargeScreen ? "flex" : "hidden"} items-center gap-8 lg:gap-12 flex-grow justify-center`}>
        <Link href="/" className="text-black font-bold hover:text-blue-500">Início</Link>
        <Link href="/SejaCredenciado" className="text-black font-bold hover:text-blue-500">Seja Cadastrado</Link>
        <Link href="/LoginOficinas" className="text-black font-bold hover:text-blue-500">Oficinas Credenciadas</Link>
        <Link href="/Analise" className="text-black font-bold hover:text-blue-500">Análise</Link>
        <Link href="/SobreNos" className="text-black font-bold hover:text-blue-500">Sobre Nós</Link>
      </nav>

      {/* Botão Área do Cliente para telas grandes */}
      {isLargeScreen && (
        <Link href="/AreadoCliente" className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300 lg:ml-4">
          Área do Cliente
        </Link>
      )}

      {/* Ícone de Menu "Hambúrguer" para telas pequenas */}
      {!isLargeScreen && (
        <button onClick={toggleMenu} className="text-blue-500 focus:outline-none">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Menu Responsivo para telas pequenas */}
      {!isLargeScreen && isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t-2 border-blue-500 flex flex-col items-center gap-4 py-4 shadow-lg z-50">
          <Link href="/" onClick={toggleMenu} className="text-black font-bold hover:text-blue-500">Início</Link>
          <Link href="/SejaCredenciado" onClick={toggleMenu} className="text-black font-bold hover:text-blue-500">Seja Cadastrado</Link>
          <Link href="/LoginOficinas" onClick={toggleMenu} className="text-black font-bold hover:text-blue-500">Oficinas Credenciadas</Link>
          <Link href="/Analise" onClick={toggleMenu} className="text-black font-bold hover:text-blue-500">Análise</Link>
          <Link href="/SobreNos" onClick={toggleMenu} className="text-black font-bold hover:text-blue-500">Sobre Nós</Link>
          <Link href="/AreadoCliente" onClick={toggleMenu} className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300">
            Área do Cliente
          </Link>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
