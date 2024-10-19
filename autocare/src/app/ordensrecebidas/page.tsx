"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Side from "@/Components/Sideoficinas"; // Verifique se o caminho está correto

// Estilos do componente
const PageWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #e0f7fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #00796b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

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
        const errorResponse = await response.text();
        console.error('Erro ao deletar orçamento:', errorResponse);
        alert(`Erro ao deletar orçamento: ${errorResponse}`);
        return;
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
        const errorResponse = await response.text();
        console.error('Erro ao salvar na gestão de ordens:', errorResponse);
        return;
      }

      setOrcamentos(orcamentos.filter((_, i) => i !== index));
      alert('Orçamento aceito e salvo na gestão de ordens!');
    } catch (error) {
      console.error('Erro ao aceitar orçamento:', error);
    }
  };

  return (
    <PageWrapper>
      <Side /> {/* Componente de menu lateral */}
      <ContentWrapper>
        <Container>
          <Title>Orçamentos Recebidos</Title>
          <Table>
            <thead>
              <tr>
                <Th>Cliente</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Número da Ordem</Th>
                <Th>Peças</Th>
                <Th>Modelo</Th>
                <Th>Ano</Th>
                <Th>Diagnóstico</Th>
                <Th>Solução</Th>
                <Th>Estimativa</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.length === 0 ? (
                <tr>
                  <Td colSpan={11} style={{ textAlign: 'center' }}>
                    Não há orçamentos disponíveis no momento.
                  </Td>
                </tr>
              ) : (
                orcamentos.map((orcamento, index) => (
                  <tr key={orcamento.NUMERO_ORDEM_SERVICO || index}>
                    <Td>{orcamento.cliente_nome}</Td>
                    <Td>{orcamento.cliente_email}</Td>
                    <Td>{orcamento.cliente_telefone}</Td>
                    <Td>{orcamento.NUMERO_ORDEM_SERVICO}</Td>
                    <Td>{orcamento.pecas}</Td>
                    <Td>{orcamento.modelo}</Td>
                    <Td>{orcamento.ano}</Td>
                    <Td>{orcamento.diagnostico}</Td>
                    <Td>{orcamento.solucao}</Td>
                    <Td>{orcamento.estimativa}</Td>
                    <Td>
                      <ButtonContainer>
                        <Button onClick={() => handleAccept(index)}>Aceitar</Button>
                        <Button onClick={() => handleReject(index)}>Recusar</Button>
                      </ButtonContainer>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default OrcamentosRecebidos;
