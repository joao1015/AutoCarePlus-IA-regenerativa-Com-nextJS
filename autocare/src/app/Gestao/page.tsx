"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// Estilos do componente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const OrdemCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  color: #333;
  font-family: "Poppins", sans-serif;
`;

const OrdemHeader = styled.div`
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
  color: #00ccff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: black;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    margin-right: 0;
    background-color: #ff5252;

    &:hover {
      background-color: #ff1744;
    }
  }
`;

const GestaoOrdens: React.FC = () => {
  const [ordens, setOrdens] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await fetch("/api/gestao-ordens");
        const result = await response.json();
        console.log("Ordens de serviço recebidas:", result);

        if (response.ok) {
          setOrdens(result.ordens);
        } else {
          console.error("Erro ao buscar ordens de serviço:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };

    fetchOrdens();
  }, []);

  const handleConcluir = async (index: number) => {
    const ordem = ordens[index];

    try {
      const response = await fetch(`/api/gestao-ordens/${ordem.ID}/concluir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_ordem: "Concluída" }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao concluir ordem de serviço:", errorResponse);
        return;
      }

      console.log("Ordem de serviço concluída com sucesso.");

      const updatedOrdens = ordens.map((o, i) =>
        i === index ? { ...o, STATUS_ORDEM: "Concluída" } : o
      );
      setOrdens(updatedOrdens);
    } catch (error) {
      console.error("Erro ao concluir ordem de serviço:", error);
    }
  };

  return (
    <Container>
      <Title>Gestão de Ordens de Serviço</Title>
      {ordens.length === 0 ? (
        <p>Não há ordens de serviço disponíveis no momento.</p>
      ) : (
        ordens.map((ordem, index) => (
          <OrdemCard key={ordem.NUMERO_ORDEM_SERVICO || index}>
            <OrdemHeader>
              <ClienteInfo>
                <DataSection>
                  <DataTitle>Cliente: </DataTitle>
                  <DataValue>{ordem.CLIENTE_NOME || "Nome não disponível"}</DataValue>
                </DataSection>
                <DataSection>
                  <DataTitle>Email: </DataTitle>
                  <DataValue>{ordem.CLIENTE_EMAIL || "Email não disponível"}</DataValue>
                </DataSection>
                <DataSection>
                  <DataTitle>Telefone: </DataTitle>
                  <DataValue>{ordem.CLIENTE_TELEFONE || "Telefone não disponível"}</DataValue>
                </DataSection>
              </ClienteInfo>
            </OrdemHeader>
            <DataSection>
              <DataTitle>Número da Ordem de Serviço: </DataTitle>
              <DataValue>{ordem.NUMERO_ORDEM_SERVICO || "Número não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Peças: </DataTitle>
              <DataValue>{ordem.PECAS || "Peças não disponíveis"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Modelo: </DataTitle>
              <DataValue>{ordem.MODELO || "Modelo não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Ano: </DataTitle>
              <DataValue>{ordem.ANO || "Ano não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Diagnóstico: </DataTitle>
              <DataValue>{ordem.DIAGNOSTICO || "Diagnóstico não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Solução: </DataTitle>
              <DataValue>{ordem.SOLUCAO || "Solução não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Estimativa de Custo: </DataTitle>
              <DataValue>{ordem.ESTIMATIVA || "Estimativa não disponível"}</DataValue>
            </DataSection>
            <DataSection>
              <DataTitle>Status da Ordem: </DataTitle>
              <DataValue>{ordem.STATUS_ORDEM || "Em andamento"}</DataValue>
            </DataSection>
            <ButtonContainer>
              {ordem.STATUS_ORDEM !== "Concluída" && (
                <Button onClick={() => handleConcluir(index)}>Concluir</Button>
              )}
            </ButtonContainer>
          </OrdemCard>
        ))
      )}
    </Container>
  );
};

export default GestaoOrdens;
