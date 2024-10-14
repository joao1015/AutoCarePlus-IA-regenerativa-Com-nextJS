"use client"; // Para Next.js

import Agenda from "@/Components/Agenda";
import React from 'react';
import styled from 'styled-components';
import Sidebar from '@/Components/SideBar';
import { useRouter } from 'next/navigation'; // Usando o hook de navegação do Next.js

// Certifique-se de incluir a propriedade "id"
interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

// Styled Component para o conteúdo principal com cor de fundo personalizada
const ConteudoPrincipal = styled.div`
 
  padding: 0px;
`;

const Agenda1: React.FC = () => {
  const router = useRouter(); // Hook para redirecionar após o logout

  // Recupera o usuário do localStorage
  const usuarioData = typeof window !== "undefined" ? localStorage.getItem('usuarioLogado') : null;
  const usuario: Usuario | null = usuarioData ? JSON.parse(usuarioData) : null;

  return (
    <div>
      {/* Passa o usuário como prop para o Sidebar */}
      <Sidebar usuario={usuario} />
      <ConteudoPrincipal>
        <main>
          <Agenda></Agenda>
        </main>
      </ConteudoPrincipal>
    </div>
  );
};

export default Agenda1;
