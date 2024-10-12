import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

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

const Sidebar: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      const usuarioData = JSON.parse(usuarioLogado);
      console.log('Usuário recuperado do localStorage:', usuarioData);
      setUsuario(usuarioData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    navigate('/entrar');
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
      <BotaoDeslogar onClick={handleLogout}>Deslogar</BotaoDeslogar>
    </SidebarContainer>
  );
};

export default Sidebar;
