"use client";

import React from 'react';
import styled from 'styled-components';
import SidebarWrapper from '@/Components/SidebarWrapper';
import IA from '@/Components/InteracaoIA';

const PaginaContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ebe4e4; /* Define o fundo branco */
`;

const ConteudoPrincipal = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const PaginaLogada: React.FC = () => {
  const usuarioData = typeof window !== 'undefined' ? localStorage.getItem('usuarioLogado') : null;
  const usuario = usuarioData ? JSON.parse(usuarioData) : null;

  return (
    <PaginaContainer>
      <SidebarWrapper usuario={usuario} />
      <ConteudoPrincipal>
        <main>
          <IA />
        </main>
      </ConteudoPrincipal>
    </PaginaContainer>
  );
};

export default PaginaLogada;
