"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWrench, FaBox, FaCar, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Side from "@/Components/Sideoficinas";

// Estilos do componente
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const MainContent = styled.div`
  flex: 1;
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

const StatusTag = styled.select`
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FinalizarButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const GestaoOrdens: React.FC = () => {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await fetch("/api/gestao-ordens");
        const result = await response.json();
        console.log("Ordens de serviço recebidas:", result);

        if (response.ok) {
          setOrdens(result.ordens);
          // Inicializar o status selecionado com o status atual das ordens
          const initialStatus = result.ordens.reduce((acc: any, ordem: any, index: number) => {
            acc[index] = ordem.STATUS_ORDEM;
            return acc;
          }, {});
          setSelectedStatus(initialStatus);
        } else {
          console.error("Erro ao buscar ordens de serviço:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };

    fetchOrdens();
  }, []);

  const handleStatusChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setSelectedStatus((prev) => ({
      ...prev,
      [index]: newStatus,
    }));
  };

  const handleFinalizar = async (index: number) => {
    const ordem = ordens[index];
    const newStatus = selectedStatus[index];

    try {
      const response = await fetch(`/api/gestao-ordens/${ordem.ID}/concluir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_ordem: newStatus }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao concluir ordem de serviço:", errorResponse);
        return;
      }

      console.log("Ordem de serviço concluída com sucesso.");

      // Atualizar status da ordem no front-end
      const updatedOrdens = ordens.map((o, i) =>
        i === index ? { ...o, STATUS_ORDEM: newStatus } : o
      );
      setOrdens(updatedOrdens);
    } catch (error) {
      console.error("Erro ao concluir ordem de serviço:", error);
    }
  };

  return (
    <PageWrapper>
      <Side /> {/* Componente Side para navegação lateral */}
      <MainContent>
        <Title>Gestão de Ordens de Serviço</Title>
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
              <Th>Diagnóstico/Falha</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem, index) => (
              <tr key={ordem.NUMERO_ORDEM_SERVICO || index}>
                <Td>{ordem.CLIENTE_NOME || "Nome não disponível"}</Td>
                <Td>{ordem.CLIENTE_EMAIL || "Email não disponível"}</Td>
                <Td>{ordem.CLIENTE_TELEFONE || "Telefone não disponível"}</Td>
                <Td>{ordem.NUMERO_ORDEM_SERVICO || "Número não disponível"}</Td>
                <Td>{ordem.PECAS || "Peças não disponíveis"}</Td>
                <Td>{ordem.MODELO || "Modelo não disponível"}</Td>
                <Td>{ordem.ANO || "Ano não disponível"}</Td>
                <Td>{ordem.DIAGNOSTICO || "Diagnóstico não disponível"}</Td>
                <Td>
                  <StatusTag
                    value={selectedStatus[index] || ordem.STATUS_ORDEM}
                    onChange={(e) => handleStatusChange(index, e)}
                  >
                    <option value="Em andamento">Em andamento</option>
                    <option value="Aguardando Peças">Aguardando Peças</option>
                    <option value="Aguardando Chegada do Carro">
                      Aguardando Chegada do Carro
                    </option>
                    <option value="Concluída">Concluída</option>
                    <option value="Cancelada">Cancelada</option>
                  </StatusTag>
                </Td>
                <Td>
                  <ButtonContainer>
                    {selectedStatus[index] !== "Concluída" && (
                      <FinalizarButton onClick={() => handleFinalizar(index)}>
                        Finalizar
                      </FinalizarButton>
                    )}
                  </ButtonContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>
    </PageWrapper>
  );
};

export default GestaoOrdens;
