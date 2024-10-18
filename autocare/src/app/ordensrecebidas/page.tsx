"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// Estilos do componente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #e0f7fa; /* Cor de fundo mais suave para melhor visualização */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const OrcamentoCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const OrcamentoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ClienteInfo = styled.div`
  font-size: 1.2rem;
`;

const DataSection = styled.div`
  margin-bottom: 10px;
`;

const DataTitle = styled.span`
  font-weight: bold;
  color: #555;
`;

const DataValue = styled.span`
  color: #00796b;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #00796b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004d40;
  }

  &:last-child {
    margin-right: 0;
    background-color: #d32f2f;

    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const OrcamentosRecebidos: React.FC = () => {
  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      console.log('Iniciando a busca de orçamentos...');
      try {
        const oficinaId = localStorage.getItem('oficinaId');
        if (!oficinaId) {
          alert('Nenhuma oficina logada.');
          return;
        }

        const response = await fetch(`/api/orcamentos?oficinaId=${oficinaId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar orçamentos.');
        }

        const result = await response.json();
        setOrcamentos(result.orcamentos);
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
        alert('Erro ao buscar orçamentos.');
      }
    };

    fetchOrcamentos();
  }, []);

  const handleReject = async (index: number) => {
    const rejectedOrcamento = orcamentos[index];

    try {
      const response = await fetch(`/api/orcamentos?numero_ordem_servico=${rejectedOrcamento.NUMERO_ORDEM_SERVICO}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar orçamento');
      }

      setOrcamentos(orcamentos.filter((_, i) => i !== index));
      alert('Orçamento deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
      alert('Erro ao deletar orçamento.');
    }
  };

  const handleAccept = async (index: number) => {
    const acceptedOrcamento = orcamentos[index];

    try {
      const response = await fetch('/api/gestao-ordens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente_nome: acceptedOrcamento.cliente_nome,
          cliente_email: acceptedOrcamento.cliente_email,
          cliente_telefone: acceptedOrcamento.cliente_telefone,
          pecas: acceptedOrcamento.pecas,
          modelo: acceptedOrcamento.modelo,
          ano: acceptedOrcamento.ano,
          diagnostico: acceptedOrcamento.diagnostico,
          solucao: acceptedOrcamento.solucao,
          estimativa: acceptedOrcamento.estimativa,
          numero_ordem_servico: acceptedOrcamento.NUMERO_ORDEM_SERVICO,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar na gestão de ordens');
      }

      setOrcamentos(orcamentos.filter((_, i) => i !== index));
      alert('Orçamento aceito e salvo na gestão de ordens!');
    } catch (error) {
      console.error('Erro ao aceitar orçamento:', error);
      alert('Erro ao aceitar orçamento.');
    }
  };

  return (
    <Container>
      <Title>Orçamentos Recebidos</Title>
      {orcamentos.length === 0 ? (
        <p>Não há orçamentos disponíveis no momento.</p>
      ) : (
        orcamentos.map((orcamento, index) => (
          <OrcamentoCard key={orcamento.NUMERO_ORDEM_SERVICO || index}>
            <OrcamentoHeader>
              <ClienteInfo>
                <DataSection>
                  <DataTitle>Cliente: </DataTitle>
                  <DataValue>{orcamento.cliente_nome}</DataValue>
                </DataSection>
                <DataSection>
                  <DataTitle>Email: </DataTitle>
                  <DataValue>{orcamento.cliente_email}</DataValue>
                </DataSection>
                <DataSection>
                  <DataTitle>Telefone: </DataTitle>
                  <DataValue>{orcamento.cliente_telefone}</DataValue>
                </DataSection>
              </ClienteInfo>
            </OrcamentoHeader>
            <DataSection>
              <DataTitle>Número da Ordem de Serviço: </DataTitle>
              <DataValue>{orcamento.NUMERO_ORDEM_SERVICO || 'Número não disponível'}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Peças: </DataTitle>
              <DataValue>{orcamento.pecas}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Modelo: </DataTitle>
              <DataValue>{orcamento.modelo}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Ano: </DataTitle>
              <DataValue>{orcamento.ano}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Diagnóstico: </DataTitle>
              <DataValue>{orcamento.diagnostico}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Solução: </DataTitle>
              <DataValue>{orcamento.solucao}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Estimativa de Custo: </DataTitle>
              <DataValue>{orcamento.estimativa}</DataValue>
            </DataSection>
            <ButtonContainer>
              <Button onClick={() => handleAccept(index)}>Aceitar</Button>
              <Button onClick={() => handleReject(index)}>Recusar</Button>
            </ButtonContainer>
          </OrcamentoCard>
        ))
      )}
    </Container>
  );
};

export default OrcamentosRecebidos;
