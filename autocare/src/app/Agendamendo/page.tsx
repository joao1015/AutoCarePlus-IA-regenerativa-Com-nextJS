"use client"; // Para Next.js

import Agenda from "@/Components/Agenda";
import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/SideBar';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

// Interface do Usuário
interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

const Agenda1: React.FC = () => {
  const router = useRouter(); // Hook para redirecionar após o logout

  // Recupera o usuário do localStorage
  const usuarioData =
    typeof window !== 'undefined' ? localStorage.getItem('usuarioLogado') : null;
  const usuario: Usuario | null = usuarioData ? JSON.parse(usuarioData) : null;

  // Atualiza o localStorage sempre que o usuário for atualizado
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
  }, [usuario]);

  // Estado para controlar a exibição da sidebar em telas pequenas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Botão para abrir a sidebar em telas pequenas */}
   

      {/* Sidebar */}
      <div
        className={`bg-black text-white p-5 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 h-full w-4 md:static md:translate-x-0 md:w-1/5 md:min-w-[320px]`}
        style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}
      >
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 mt-[60px] p-5 overflow-y-auto md:mt-0">
        <main>
          <Agenda />
        </main>
      </div>
    </div>
  );
};

export default Agenda1;
