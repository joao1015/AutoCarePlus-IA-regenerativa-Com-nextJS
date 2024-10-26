"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '../SideBar';

const Container = styled.div`
  display: flex;
  align-content: center;
  height: auto; // Ajustado para ocupar toda a altura da tela
  background-color: #f0f2f5;
  font-family: 'Roboto', sans-serif;
`;

const SidebarContainer = styled.div`
  width: auto; // Defina uma largura fixa para a sidebar, se necessário
  height: auto; // Ajuste para ocupar a altura total do contêiner
  background-color: #000000;
`;

const MainContent = styled.main`
  flex: 1;
  max-width:700px;
  height: auto; // Ajustado para ocupar toda a altura
  margin-top: 3cm;; // Remove o espaçamento automático
  margin-bottom: 7cm;
  margin-left: 12cm;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center; // Centraliza o conteúdo verticalmente

  @media (max-width: 1300px) {
    margin-top: 3cm;; // Remove o espaçamento automático
    margin-bottom: 2cm;
    margin-left: 4cm;
  }
`;


const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-align: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputIcon = styled(FiSearch)`
  position: absolute;
  top: 12px;
  left: 14px;
  color: #95a5a6;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #dcdfe3;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  outline: none;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const OrcamentoCard = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  margin-top: 30px;
  border-radius: 12px;
  border: 1px solid #dcdfe3;
`;

const FieldLabel = styled.span`
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const FieldValue = styled.span`
  color: #7f8c8d;
  font-size: 1rem;
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
  margin-top: 15px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  svg {
    margin-right: 8px;
  }
`;

const StatusOrdens = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [emailCliente, setEmailCliente] = useState('');
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFilter = async () => {
    setError('');
    setShowResults(false);

    if (!emailCliente) {
      setError('Por favor, insira seu e-mail.');
      return;
    }

    if (!isValidEmail(emailCliente)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const response = await fetch(`/api/StatusApi?email=${emailCliente}`, {
        method: 'GET',
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(result.status);
        setShowResults(true);
      } else {
        setError(result.error || 'Erro ao buscar as ordens.');
      }
    } catch (error) {
      console.error('Erro ao buscar ordem de serviço:', error);
      setError('Erro ao buscar a ordem de serviço.');
    }
  };

  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <Title>Monitoramento de Status da Ordem de Serviço</Title>
        <Form>
          <InputGroup>
            <InputIcon size={20} />
            <Input
              type="email"
              placeholder="Digite seu email"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
            />
          </InputGroup>
          <Button onClick={handleFilter}>Buscar Status</Button>
        </Form>

        {error && (
          <ErrorMsg>
            <FiAlertCircle size={18} />
            {error}
          </ErrorMsg>
        )}

        {showResults && status && (
          <OrcamentoCard>
            <FieldLabel>Status da Ordem:</FieldLabel>
            <FieldValue>{status}</FieldValue>
          </OrcamentoCard>
        )}
      </MainContent>
    </Container>
  );
};

export default StatusOrdens;
