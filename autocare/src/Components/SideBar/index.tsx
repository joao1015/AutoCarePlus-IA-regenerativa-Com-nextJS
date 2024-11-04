"use client"; // Certifique-se de que o Sidebar é tratado como um Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiLogOut, FiFileText } from 'react-icons/fi';

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
      window.location.href = '/AreadoCliente'; // Redireciona para a página de login
    }
  };

  return (
    <>
     
     
     {/* Botões fixos na parte inferior para telas pequenas */}
<div className="absolute bottom-[-5cm] left-0 right-0 bg-black text-white flex justify-around p-3 md:hidden z-50">
  <button onClick={handleLogout} className="flex flex-col items-center text-white">
    <FiLogOut size={24} />
    <span className="text-xs mt-1">Deslogar</span>
  </button>
  <Link href="/Status">
    <div className="flex flex-col items-center text-white">
      <FiFileText size={24} />
      <span className="text-xs mt-1">Status</span>
    </div>
  </Link>
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
