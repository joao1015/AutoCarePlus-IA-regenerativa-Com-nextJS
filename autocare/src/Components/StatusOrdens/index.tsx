// Componentes do Front-end - página de busca de status
"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  padding: 20px;
  background-color: #f4f4f4;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 900px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: calc(100% - 24px);
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const OrcamentoCard = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
`;

const FieldLabel = styled.span`
  font-weight: 600;
  color: #495057;
  display: inline-block;
  margin-bottom: 5px;
`;

const FieldValue = styled.span`
  margin-left: 10px;
  color: #6c757d;
`;

const ErrorMsg = styled.p`
  color: #dc3545;
  margin-top: 10px;
`;

const StatusOrdens = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [emailCliente, setEmailCliente] = useState('');
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleFilter = async () => {
    setError('');
    setShowResults(false);
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
      <MainContent>
        <Title>Monitoramento de Status da Ordem de Serviço</Title>
        <Input
          type="email"
          placeholder="Digite o email do cliente"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
        />
        <Button onClick={handleFilter}>Buscar Status</Button>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        {showResults && status && (
          <OrcamentoCard>
            <div>
              <FieldLabel>Status da Ordem:</FieldLabel>
              <FieldValue>{status}</FieldValue>
            </div>
          </OrcamentoCard>
        )}
      </MainContent>
    </Container>
  );
};

export default StatusOrdens;
