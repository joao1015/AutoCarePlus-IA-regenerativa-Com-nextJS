import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

// Estilos para o container da sidebar
const SidebarContainer = styled.div`
  width: 270px;
  height: auto;
  background-color: #000;
  color: #fff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

// Estilos para o botão de deslogar
const BotaoDeslogar = styled.button`
  background-color: #117500;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d5b00;
  }
`;

// Estilos para a mensagem de boas-vindas
const MensagemBoasVindas = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
`;

// Estilos para os links da sidebar
const SidebarLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #117500;
  }
`;

const Sidebar: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Recuperar os dados do usuário logado do localStorage
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

  // Função para deslogar
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('token');
      window.location.href = '/entrar'; // Redireciona para a página de login
    }
  };

  return (
    <SidebarContainer>
      {usuario ? (
        <>
          <MensagemBoasVindas>Bem-vindo, {usuario.nome}!</MensagemBoasVindas>
          <p>Email: {usuario.email}</p>
          <p>Endereço: {usuario.logradouro}, {usuario.numero}</p>
          <p>Cidade: {usuario.cidade}</p>
          <p>Estado: {usuario.estado}</p>
        </>
      ) : (
        <MensagemBoasVindas>Bem-vindo!</MensagemBoasVindas>
      )}

      {/* Link para monitoramento de status de serviço */}
      <Link href="/Status" passHref>
      <SidebarLink>Status de Serviço</SidebarLink>
      </Link>



      {/* Botão para deslogar */}
      <BotaoDeslogar onClick={handleLogout}>Deslogar</BotaoDeslogar>
    </SidebarContainer>
  );
};

export default Sidebar;
