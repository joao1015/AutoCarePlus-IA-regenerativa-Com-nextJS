"use client";  // Certifique-se de que esta linha está no topo

import styled from 'styled-components';
import Link from 'next/link';

const SidebarContainer = styled.div`
  width: 220px;
  background-color: #000; /* Fundo preto */
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif; /* Fonte Poppins */
`;

const SidebarLink = styled.a`
  display: block;
  padding: 10px;
  color: #fff; /* Texto branco */
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #1e90ff; /* Fundo azul ao passar o mouse */
    color: #fff; /* Texto branco ao passar o mouse */
  }
  
  &:active {
    background-color: #1c86ee; /* Azul mais escuro quando clicado */
  }
`;

export default function Sideoficinas() {
  return (
    <SidebarContainer>
      <Link href="/ordensrecebidas" passHref>
        <SidebarLink>Orçamentos Recebidos</SidebarLink>
      </Link>
      <Link href="/gestao-orcamentos" passHref>
        <SidebarLink>Gestão de Orçamentos</SidebarLink>
      </Link>
      <Link href="/ordens-finalizadas" passHref>
        <SidebarLink>Ordens Finalizadas</SidebarLink>
      </Link>
    </SidebarContainer>
  );
}
