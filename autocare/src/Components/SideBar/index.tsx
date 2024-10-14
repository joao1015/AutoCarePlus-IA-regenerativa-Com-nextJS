import React from 'react';
import styled from 'styled-components';

// Defina a interface para o usuário
interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

// Interface para as props do Sidebar
interface SidebarProps {
  usuario: Usuario | null;
}

// Styled Component para o Sidebar
const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  background-color: #000;
  color: #fff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

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

const MensagemBoasVindas = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
`;

// Sidebar aceita a prop 'usuario'
const Sidebar: React.FC<SidebarProps> = ({ usuario }) => {
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    window.location.href = '/entrar'; // Redireciona após logout
  };

  return (
    <SidebarContainer>
      {usuario ? (
        <>
          <MensagemBoasVindas>Bem-vindo, {usuario.nome}!</MensagemBoasVindas>
         
          <p>Endereço: {usuario.logradouro}, {usuario.numero}</p>
          <p>Cidade: {usuario.cidade}</p>
          <p>Estado: {usuario.estado}</p>
        </>
      ) : (
        <MensagemBoasVindas>Bem-vindo!</MensagemBoasVindas>
      )}
      <BotaoDeslogar onClick={handleLogout}>Deslogar</BotaoDeslogar>
    </SidebarContainer>
  );
};

export default Sidebar;
