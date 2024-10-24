"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Definição da interface para as ordens
interface Ordem {
  numero_ordem_servico: string;
  cliente_nome: string;
  cliente_email: string;
  status: string;
}

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

const NoResults = styled.p`
  color: #6c757d;
  margin-top: 10px;
`;

const StatusOrdens = () => {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [emailCliente, setEmailCliente] = useState('');
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleFilter = async () => {
    setError('');
    setShowResults(false);
    try {
      const response = await fetch('http://localhost:4000/ordens/todas');
      const result = await response.json();

      if (response.ok) {
        const filtered = result.ordens.filter((ordem: Ordem) =>
          ordem.cliente_email.toLowerCase().includes(emailCliente.toLowerCase().trim())
        );
        setOrdens(filtered);
        setShowResults(true);
        if (filtered.length === 0) {
          setError('Nenhuma ordem encontrada para este email.');
        }
      } else {
        setError(result.message || 'Erro ao buscar as ordens.');
      }
    } catch (error) {
      console.error('Erro ao buscar todas as ordens:', error);
      setError('Erro ao buscar as ordens.');
    }
  };

  return (
    <Container>
      <MainContent>
        <Title>Monitoramento de Ordens de Serviço</Title>
        <Input
          type="email"
          placeholder="Digite o email do cliente"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
        />
        <Button onClick={handleFilter}>Buscar Ordens</Button>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        {showResults && ordens.length > 0 ? (
          ordens.map((ordem, index) => (
            <OrcamentoCard key={index}>
              <div>
                <FieldLabel>Número da Ordem:</FieldLabel>
                <FieldValue>{ordem.numero_ordem_servico}</FieldValue>
              </div>
              <div>
                <FieldLabel>Nome do Cliente:</FieldLabel>
                <FieldValue>{ordem.cliente_nome}</FieldValue>
              </div>
              <div>
                <FieldLabel>Email do Cliente:</FieldLabel>
                <FieldValue>{ordem.cliente_email}</FieldValue>
              </div>
              <div>
                <FieldLabel>Status da Ordem:</FieldLabel>
                <FieldValue>{ordem.status}</FieldValue>
              </div>
            </OrcamentoCard>
          ))
        ) : (
          showResults && (
            <NoResults>Nenhuma ordem de serviço encontrada para este cliente.</NoResults>
          )
        )}
      </MainContent>
    </Container>
  );
};

export default StatusOrdens;
