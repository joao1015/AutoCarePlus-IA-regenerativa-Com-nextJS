"use client"; // Para Next.js

import Agenda from "@/Components/Agenda";
import React from 'react';
import styled from 'styled-components';
import Sidebar from '@/Components/SideBar';
import { useRouter } from 'next/navigation';

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

// Styled Component para o layout principal
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

// Styled Component para o conteúdo principal
const ConteudoPrincipal = styled.div`
  flex: 1;
  margin-top: 60px; /* Adiciona espaço suficiente para evitar sobreposição com o header */
  padding: 20px;
  overflow-y: auto;
`;

const SidebarContainer = styled.div`
  width: 20%;
  min-width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Agenda1: React.FC = () => {
  const router = useRouter(); // Hook para redirecionar após o logout

  // Recupera o usuário do localStorage
  const usuarioData = typeof window !== "undefined" ? localStorage.getItem('usuarioLogado') : null;
  const usuario: Usuario | null = usuarioData ? JSON.parse(usuarioData) : null;

  return (
    <PageContainer>
      {/* Passa o usuário como prop para o Sidebar */}
      <SidebarContainer>
        <Sidebar usuario={usuario} />
      </SidebarContainer>
      <ConteudoPrincipal>
        <main>
          <Agenda />
        </main>
      </ConteudoPrincipal>
    </PageContainer>
  );
};

export default Agenda1;