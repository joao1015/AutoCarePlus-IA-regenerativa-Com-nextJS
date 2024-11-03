"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from './Imagems/LogoAutoCareplus.png';
import { FiHome, FiInfo, FiTool, FiUser, FiMenu, FiX, FiBarChart } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import Link from 'next/link';

const Cabecalho: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para monitorar o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-4 border-b-2 border-black z-50 lg:h-24">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src={logo}
          alt="Logo do AutoCarePlus"
          width={80}
          height={80}
          className="cursor-pointer"
        />
      </Link>

      {/* Menu para telas grandes */}
      <nav className={`${isLargeScreen ? "flex" : "hidden"} items-center gap-8 lg:gap-12 flex-grow justify-center`}>
        <Link href="/" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiHome /> Início
        </Link>
        <Link href="/SejaCredenciado" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiUser /> Seja Cadastrado
        </Link>
        <Link href="/LoginOficinas" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiTool /> Oficinas Credenciadas
        </Link>
        <Link href="/Analise" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiBarChart /> Análise de Oficinas
        </Link>
        <Link href="/ConhecaAutoCarePlus" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FaCar /> Conheça o AutoCarePlus
        </Link>
        <Link href="/SobreNos" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiInfo /> Sobre Nós
        </Link>
      </nav>

      {/* Botão "Área do Cliente" visível apenas em telas grandes */}
      {isLargeScreen && !isMenuOpen && (
        <Link
          href="/AreadoCliente"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            color: '#1E40AF',
            backgroundColor: 'white',
            border: '2px solid #1E40AF',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#1E40AF';
            (e.currentTarget as HTMLElement).style.color = 'white';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
            (e.currentTarget as HTMLElement).style.color = '#1E40AF';
          }}
        >
          Área do Cliente
        </Link>
      )}

      {/* Ícone do Menu para telas pequenas */}
      {!isLargeScreen && (
        <button onClick={toggleMenu} className="text-blue-500 focus:outline-none">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Menu Responsivo para telas pequenas */}
      {!isLargeScreen && isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t-2 border-blue-500 flex flex-col items-center gap-4 py-4 shadow-lg z-50">
          <Link href="/" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FiHome /> Início
          </Link>
          <Link href="/SejaCredenciado" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FiUser /> Seja Cadastrado
          </Link>
          <Link href="/LoginOficinas" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FiTool /> Oficinas Credenciadas
          </Link>
          <Link href="/Analise" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FiBarChart /> Análise de Oficinas
          </Link>
          <Link href="/ConhecaAutoCarePlus" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FaCar /> Conheça o AutoCarePlus
          </Link>
          <Link href="/SobreNos" onClick={toggleMenu} className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
            <FiInfo /> Sobre Nós
          </Link>
          <Link href="/AreadoCliente" onClick={toggleMenu} className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300">
            Área do Cliente
          </Link>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
