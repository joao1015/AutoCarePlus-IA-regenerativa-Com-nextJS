"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  max-width: 100%;
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
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

// Definição do ModalWrapper
const ModalWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
`;

const GarantiaPage: React.FC = () => {
  const [garantias, setGarantias] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGarantiaIndex, setCurrentGarantiaIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGarantias = async () => {
      try {
        const response = await fetch("/api/gestao-garantias");
        const result = await response.json();
        console.log("Garantias recebidas:", result);

        if (response.ok) {
          setGarantias(result.garantias);
        } else {
          console.error("Erro ao buscar garantias:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar garantias:", error);
      }
    };

    fetchGarantias();
  }, []);

  const openModal = (index: number) => {
    setCurrentGarantiaIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGarantiaIndex(null);
  };

  const handleDeleteGarantia = async () => {
    if (currentGarantiaIndex === null) return;
    const garantia = garantias[currentGarantiaIndex];

    try {
      const response = await fetch(`/api/gestao-garantias/${garantia.ID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao deletar garantia:", errorResponse);
        return;
      }

      console.log("Garantia deletada com sucesso.");

      // Remover a garantia do estado
      const updatedGarantias = garantias.filter((_, i) => i !== currentGarantiaIndex);
      setGarantias(updatedGarantias);

      closeModal();
    } catch (error) {
      console.error("Erro ao deletar garantia:", error);
    }
  };

  return (
    <PageWrapper>
      <Side />
      <MainContent>
        <Title>Gestão de Garantias</Title>
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
              <Th>Valor Final</Th>
              <Th>Data da Garantia</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {garantias.map((garantia, index) => (
              <tr key={garantia.NUMERO_ORDEM_SERVICO || index}>
                <Td>{garantia.CLIENTE_NOME || "Nome não disponível"}</Td>
                <Td>{garantia.CLIENTE_EMAIL || "Email não disponível"}</Td>
                <Td>{garantia.CLIENTE_TELEFONE || "Telefone não disponível"}</Td>
                <Td>{garantia.NUMERO_ORDEM_SERVICO || "Número não disponível"}</Td>
                <Td>{garantia.PECAS || "Peças não disponíveis"}</Td>
                <Td>{garantia.MODELO || "Modelo não disponível"}</Td>
                <Td>{garantia.ANO || "Ano não disponível"}</Td>
                <Td>{garantia.DIAGNOSTICO || "Diagnóstico não disponível"}</Td>
                <Td>{garantia.VALOR_FINAL || "Valor não disponível"}</Td>
                <Td>
                  {garantia.DATA_GARANTIA
                    ? new Date(garantia.DATA_GARANTIA).toLocaleDateString()
                    : "Data não disponível"}
                </Td>
                <Td>
                  <ButtonContainer>
                    <Button onClick={() => openModal(index)}>Excluir</Button>
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
          contentLabel="Excluir Garantia"
          ariaHideApp={false}
        >
          <ModalWrapper>
            {currentGarantiaIndex !== null && garantias[currentGarantiaIndex] && (
              <>
                <h2>Excluir Garantia</h2>
                <p>Tem certeza de que deseja excluir esta garantia?</p>
                <ButtonContainer>
                  <Button onClick={handleDeleteGarantia}>Excluir</Button>
                  <Button onClick={closeModal}>Cancelar</Button>
                </ButtonContainer>
              </>
            )}
          </ModalWrapper>
        </Modal>
      </MainContent>
    </PageWrapper>
  );
};

export default GarantiaPage;
