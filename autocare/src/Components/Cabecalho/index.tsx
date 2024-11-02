"use client"; // Adicione esta linha no topo do arquivo

import React, { useState } from 'react';
import Image from 'next/image';
import logo from './Imagems/LogoAutoCareplus.png';
import { FiHome, FiInfo, FiTool, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import Link from 'next/link';

interface CabecalhoProps {
  usuario?: {
    nome: string;
    avatarUrl?: string;
  } | null;
}

const Cabecalho: React.FC<CabecalhoProps> = ({ usuario }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative top-0 left-0 w-full h-20 bg-white flex items-center justify-between px-4 border-b-2 border-black hover:border-blue-500 z-50 lg:h-24">
      {/* Logo do lado esquerdo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src={logo}
          alt="Logo do AutoCarePlus"
          width={80}
          height={80}
          className="cursor-pointer md:w-24 md:h-24 sm:w-20 sm:h-20"
        />
      </Link>

      {/* Navegação do lado direito para telas médias e grandes */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12 flex-grow justify-center">
        <Link href="/" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiHome /> Início
        </Link>
        <Link href="/SejaCredenciado" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiUser /> Seja Cadastrado
        </Link>
        <Link href="/LoginOficinas" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiTool /> Oficinas Credenciadas
        </Link>
        <Link href="/ConhecaAutoCarePlus" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FaCar /> Conheça o AutoCarePlus
        </Link>
        <Link href="/SobreNos" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiInfo /> Sobre Nós
        </Link>
      </nav>

      {/* Botão Área do Cliente para telas médias e grandes */}
      <Link href="/AreadoCliente" className="hidden md:block bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300 lg:ml-4">
        Área do Cliente
      </Link>

      {/* Ícone de Menu "Hambúrguer" para telas pequenas */}
      <button onClick={toggleMenu} className="block md:hidden text-blue-500 focus:outline-none">
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Menu Responsivo para telas pequenas */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t-2 border-blue-500 flex flex-col items-center gap-4 py-4 shadow-lg z-50 md:hidden">
          <Link href="/" className="text-black flex items-center gap-2 font-bold hover:text-blue-500" onClick={toggleMenu}>
            <FiHome /> Início
          </Link>
          <Link href="/SejaCredenciado" className="text-black flex items-center gap-2 font-bold hover:text-blue-500" onClick={toggleMenu}>
            <FiUser /> Seja Cadastrado
          </Link>
          <Link href="/LoginOficinas" className="text-black flex items-center gap-2 font-bold hover:text-blue-500" onClick={toggleMenu}>
            <FiTool /> Oficinas Credenciadas
          </Link>
          <Link href="/ConhecaAutoCarePlus" className="text-black flex items-center gap-2 font-bold hover:text-blue-500" onClick={toggleMenu}>
            <FaCar /> Conheça o AutoCarePlus
          </Link>
          <Link href="/SobreNos" className="text-black flex items-center gap-2 font-bold hover:text-blue-500" onClick={toggleMenu}>
            <FiInfo /> Sobre Nós
          </Link>
          <Link href="/AreadoCliente" className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300" onClick={toggleMenu}>
            Área do Cliente
          </Link>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
