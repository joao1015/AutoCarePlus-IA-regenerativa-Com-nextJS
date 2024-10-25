"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Side from "@/Components/Sideoficinas";
import Modal from "react-modal";

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

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FinalizarButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

// Estilos adicionais para o modal
const ModalWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const ModalLabel = styled.label`
  font-size: 1rem;
  color: #555;
  margin: 10px 0 5px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface DataToSend {
  isDiagnosticoCorrect: boolean | null;
  newDiagnostico?: string;
  newPecas?: string;
  newValorFinal?: string;
}

const GestaoOrdens: React.FC = () => {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState<number | null>(null);
  const [isDiagnosticoCorrect, setIsDiagnosticoCorrect] = useState<boolean | null>(null);
  const [newDiagnostico, setNewDiagnostico] = useState("");
  const [newPecas, setNewPecas] = useState("");
  const [newValorFinal, setNewValorFinal] = useState("");

  const router = useRouter();

  // Buscar ordens de serviço
  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await fetch("/api/gestao-ordens");
        const result = await response.json();
        console.log("Ordens de serviço recebidas:", result);

        if (response.ok) {
          setOrdens(result.ordens);
          const initialStatus = result.ordens.reduce(
            (acc: any, ordem: any, index: number) => {
              acc[index] = ordem.STATUS_ORDEM || "Em andamento";
              return acc;
            },
            {}
          );
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

  const openModal = (index: number) => {
    setCurrentOrderIndex(index);
    setIsModalOpen(true);
    setIsDiagnosticoCorrect(null);
    setNewDiagnostico("");
    setNewPecas("");
    setNewValorFinal("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrderIndex(null);
  };

  // Atualizar o status da ordem
  const handleUpdateStatus = async (index: number) => {
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

      if (response.ok) {
        console.log("Status atualizado com sucesso.");
      } else {
        console.error("Erro ao atualizar status:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao atualizar status da ordem:", error);
    }
  };

  // Finalizar a ordem de serviço
  const handleFinalizeOrder = async () => {
    if (currentOrderIndex === null) return;
    const ordem = ordens[currentOrderIndex];

    const dataToSend: DataToSend = {
      isDiagnosticoCorrect,
    };

    if (!isDiagnosticoCorrect) {
      dataToSend.newDiagnostico = newDiagnostico;
      dataToSend.newPecas = newPecas;
      dataToSend.newValorFinal = newValorFinal;
    }

    try {
      const response = await fetch(`/api/gestao-ordens/${ordem.ID}/finalizar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao finalizar ordem de serviço:", errorResponse);
        return;
      }

      console.log("Ordem de serviço finalizada com sucesso.");

      // Fechar o modal e redefinir currentOrderIndex antes de atualizar o estado
      closeModal();

      // Remover a ordem do estado
      const updatedOrdens = ordens.filter((_, i) => i !== currentOrderIndex);
      setOrdens(updatedOrdens);
    } catch (error) {
      console.error("Erro ao finalizar ordem de serviço:", error);
    }
  };

  const handleDiagnosticoResponse = (isCorrect: boolean) => {
    setIsDiagnosticoCorrect(isCorrect);
  };

  return (
    <PageWrapper>
      <Side />
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
                    value={selectedStatus[index] || ordem.STATUS_ORDEM || "Em andamento"}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [index]: newStatus,
                      }));
                    }}
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
                    <Button onClick={() => handleUpdateStatus(index)}>Atualizar Status</Button>
                    <FinalizarButton onClick={() => openModal(index)}>
                      Finalizar Ordem
                    </FinalizarButton>
                  </ButtonContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Finalizar Ordem"
          ariaHideApp={false}
        >
          <ModalWrapper>
            {currentOrderIndex !== null && ordens[currentOrderIndex] && (
              <>
                <ModalTitle>Finalizar Ordem</ModalTitle>
                <p>
                  Diagnóstico/Falha:{" "}
                  {ordens[currentOrderIndex].DIAGNOSTICO || "Não disponível"}
                </p>
                {isDiagnosticoCorrect === null ? (
                  <>
                    <p>Esta falha corresponde à verdadeira falha?</p>
                    <ModalButtons>
                      <ModalButton onClick={() => handleDiagnosticoResponse(true)}>
                        Sim
                      </ModalButton>
                      <ModalButton onClick={() => handleDiagnosticoResponse(false)}>
                        Não
                      </ModalButton>
                    </ModalButtons>
                  </>
                ) : isDiagnosticoCorrect ? (
                  <>
                    <p>Deseja finalizar a ordem?</p>
                    <ModalButtons>
                      <FinalizarButton onClick={handleFinalizeOrder}>Finalizar</FinalizarButton>
                      <ModalButton onClick={closeModal}>Cancelar</ModalButton>
                    </ModalButtons>
                  </>
                ) : (
                  <>
                    <ModalLabel>Verdadeira Falha:</ModalLabel>
                    <ModalInput
                      type="text"
                      value={newDiagnostico}
                      onChange={(e) => setNewDiagnostico(e.target.value)}
                    />
                    <ModalLabel>Peças a serem trocadas:</ModalLabel>
                    <ModalInput
                      type="text"
                      value={newPecas}
                      onChange={(e) => setNewPecas(e.target.value)}
                    />
                    <ModalLabel>Valor Final:</ModalLabel>
                    <ModalInput
                      type="text"
                      value={newValorFinal}
                      onChange={(e) => setNewValorFinal(e.target.value)}
                    />
                    <ModalButtons>
                      <FinalizarButton onClick={handleFinalizeOrder}>Finalizar</FinalizarButton>
                      <ModalButton onClick={closeModal}>Cancelar</ModalButton>
                    </ModalButtons>
                  </>
                )}
              </>
            )}
          </ModalWrapper>
        </Modal>
      </MainContent>
    </PageWrapper>
  );
};

export default GestaoOrdens;
