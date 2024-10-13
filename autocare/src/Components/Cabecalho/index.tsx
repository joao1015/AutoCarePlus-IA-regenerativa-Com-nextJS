import React from 'react';
import Image from 'next/image';
import logo from './Imagems/LogoAutoCareplus.png';
import { FiHome, FiInfo, FiTool, FiUser } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import Link from 'next/link';


interface CabecalhoProps {
  usuario?: {
    nome: string;
    avatarUrl?: string;
  } | null;
}

const Cabecalho: React.FC<CabecalhoProps> = ({ usuario }) => {
  return (
    <header className="relative top-0 left-0 w-full h-22 bg-white flex items-center justify-between p-4 border-b-2 border-black hover:border-blue-500 z-50">
      {/* Logo do lado esquerdo */}
      <Link href="/">
        <Image
          src={logo}
          alt="Logo do AutoCarePlus"
          width={120}
          height={120}
          className="cursor-pointer"
        />
      </Link>
      
      {/* Navegação do lado direito */}
      <nav className="flex items-center gap-12 flex-grow justify-center">
        <Link href="/" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiHome /> Início
        </Link>
        <Link href="SejaCredenciado" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiUser /> Seja Cadastrado
        </Link>
        <Link href="LoginOficinas" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiTool /> Oficinas Credenciadas
        </Link>
        <Link href="ConhecaAutoCarePlus" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FaCar /> Conheça o AutoCarePlus
        </Link>
        <Link href="SobreNos" className="text-black flex items-center gap-2 font-bold hover:text-blue-500">
          <FiInfo /> Sobre Nós
        </Link>
      </nav>
      
      {/* Botão Área do Cliente */}
      <Link href="AreadoCliente" className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300">
        Área do Cliente
      </Link>
    </header>
  );
};

export default Cabecalho;
