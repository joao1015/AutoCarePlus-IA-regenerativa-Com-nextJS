"use client";


import Link from 'next/link';
import styled from 'styled-components';

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
    background-color: #1e90ff; /* Fundo azul no hover */
    color: #fff; /* Texto branco no hover */
  }
  
  &:active {
    background-color: #1c86ee; /* Azul mais escuro quando clicado */
  }
`;

function Side() {
  return (
    <SidebarContainer>
      <Link href="/Ordensrecebidas" passHref>
        <SidebarLink>Orçamentos Recebidos</SidebarLink>
      </Link>
      <Link href="/Gestao" passHref>
        <SidebarLink>Gestão de Orçamentos</SidebarLink>
      </Link>
      <Link href="/Garantia" passHref>
        <SidebarLink>Ordens Finalizadas</SidebarLink>
      </Link>
    </SidebarContainer>
  );
}

export default Side;


