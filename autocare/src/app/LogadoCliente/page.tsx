"use client"; // Para Next.js

import IA from "@/Components/InteracaoIA";
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

// Styled Component para o conteúdo principal
const ConteudoPrincipal = styled.div`
  margin-left: 200px; /* Espaçamento para a sidebar */
`;

const PaginaLogada: React.FC = () => {
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
          <IA />
        </main>
      </ConteudoPrincipal>
    </div>
  );
};

export default PaginaLogada;
