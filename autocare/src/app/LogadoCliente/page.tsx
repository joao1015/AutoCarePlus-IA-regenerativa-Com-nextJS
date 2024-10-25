"use client";

import IA from "@/Components/InteracaoIA";
import React from 'react';
import styled from 'styled-components';
import Sidebar from '@/Components/SideBar';
import { useRouter } from 'next/navigation';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

const PaginaContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ConteudoPrincipal = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const PaginaLogada: React.FC = () => {
  const router = useRouter();

  const usuarioData = typeof window !== "undefined" ? localStorage.getItem('usuarioLogado') : null;
  const usuario: Usuario | null = usuarioData ? JSON.parse(usuarioData) : null;

  return (
    <PaginaContainer>
      <Sidebar usuario={usuario} /> 
      <ConteudoPrincipal>
        <main>
          <IA />
        </main>
      </ConteudoPrincipal>
    </PaginaContainer>
  );
};

export default PaginaLogada;
