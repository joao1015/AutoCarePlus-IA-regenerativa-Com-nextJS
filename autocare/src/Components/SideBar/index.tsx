"use client"; // Certifique-se de que o Sidebar é tratado como um Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

const Sidebar: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usuarioLogado = localStorage.getItem('usuarioLogado');
      if (usuarioLogado) {
        const usuarioData = JSON.parse(usuarioLogado);
        console.log('Usuário recuperado do localStorage:', usuarioData);
        setUsuario(usuarioData);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('token');
      window.location.href = '/entrar'; // Redireciona para a página de login
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     
      <button
  onClick={toggleSidebar}
  className="md:hidden absolute top-[17cm] left-1/2 transform -translate-x-1/2 z-50 text-white bg-blue-500 p-2 rounded-full"
>
  {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
</button>


    
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center ${
          isOpen ? 'block' : 'hidden'
        } md:hidden`}
      >
        {/* Em telas pequenas, exibe apenas o botão "Deslogar" quando o menu é aberto */}
        <div className="text-white text-center">
          <button
            onClick={handleLogout}
            className="bg-[#117500] text-white border-none cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#0d5b00]"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
            }}
          >
            Deslogar
          </button>
        </div>
      </div>

      {/* Sidebar para telas maiores */}
      <div className="hidden md:flex md:flex-col md:w-[270px] md:h-auto md:bg-black md:text-white md:p-5 md:font-poppins">
        {usuario ? (
          <div className="mb-5 font-semibold text-[16px]">
            Bem-vindo, {usuario.nome}!
          </div>
        ) : (
          <div className="mb-5 font-semibold text-[16px]">Bem-vindo!</div>
        )}

        {/* Link para monitoramento de status de serviço */}
        <Link
          href="/Status"
          className="block text-white no-underline transition-colors duration-300 hover:text-[#117500] mb-2"
          style={{
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          Status de Serviço
        </Link>

        <button
          onClick={handleLogout}
          className="bg-[#117500] text-white border-none cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#0d5b00]"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            marginTop: '20px',
          }}
        >
          Deslogar
        </button>

        {usuario && (
          <div className="mt-5">
            <p className="text-[14px]">Email: {usuario.email}</p>
            <p className="text-[14px]">
              Endereço: {usuario.logradouro}, {usuario.numero}
            </p>
            <p className="text-[14px]">Cidade: {usuario.cidade}</p>
            <p className="text-[14px]">Estado: {usuario.estado}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
