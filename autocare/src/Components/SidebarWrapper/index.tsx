"use client"; // Garante que o SidebarWrapper seja um Client Component

import React, { useEffect } from 'react';
import Sidebar from '@/Components/SideBar';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

interface SidebarWrapperProps {
  usuario: Usuario | null;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ usuario }) => {
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuarioLogado');
    }
  }, [usuario]);

  return <Sidebar />;
};

export default SidebarWrapper;
