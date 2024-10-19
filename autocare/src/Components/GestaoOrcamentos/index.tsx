import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTools, FaCarCrash, FaBoxOpen, FaCheck, FaWrench, FaBan } from 'react-icons/fa';

interface Orcamento {
  descricao: string;
  status: string;
  pecas: string;
  modelo: string;
  ano: string;
  placa: string;
  data: string;
  clienteNome: string;
  clienteEmail: string;
  clienteTelefone: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f9f9f9;
  font-family: 'Poppins', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusTag = styled.span<{ color: string }>`
  background-color: ${({ color }) => color};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StatusButton = styled.button`
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

const RejectButton = styled.button`
  background-color: #843e65;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const GestaoOrcamentos: React.FC = () => {
  const [orcamentosAceitos, setOrcamentosAceitos] = useState<Orcamento[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [failureDescription, setFailureDescription] = useState<string>('');
  const [defectDescription, setDefectDescription] = useState<string>('');
  const [measurements, setMeasurements] = useState<string>('');

  useEffect(() => {
    try {
      const storedAceitos = localStorage.getItem('orcamentosAceitos');
      if (storedAceitos) {
        setOrcamentosAceitos(JSON.parse(storedAceitos));
      }
    } catch (error) {
      console.error('Erro ao carregar orçamentos do localStorage:', error);
    }
  }, []);

  const statusColorMap: { [key: string]: string } = {
    'Em andamento': '#ffc107',
    'Aguardando Peças': '#17a2b8',
    'Finalizado': '#28a745',
    'Aguardando Carro': '#ff9800',
  };

  const handleStatusChange = (index: number, status: string) => {
    if (status === 'Finalizado') {
      setCurrentIndex(index);
      setShowModal(true);
    } else {
      const updatedOrcamentos = [...orcamentosAceitos];
      updatedOrcamentos[index] = { ...updatedOrcamentos[index], status };
      setOrcamentosAceitos(updatedOrcamentos);
      localStorage.setItem('orcamentosAceitos', JSON.stringify(updatedOrcamentos));
    }
  };

  const handleModalSubmit = () => {
    if (currentIndex !== null) {
      const updatedOrcamentos = [...orcamentosAceitos];
      const finalizedOrcamento = {
        ...updatedOrcamentos[currentIndex],
        status: 'Finalizado',
        falha: failureDescription,
        defeito: defectDescription,
        medidas: measurements,
      };

      const updatedAceitos = updatedOrcamentos.filter((_, i) => i !== currentIndex);
      localStorage.setItem('orcamentosAceitos', JSON.stringify(updatedAceitos));
      localStorage.setItem('ordensFinalizadas', JSON.stringify([...JSON.parse(localStorage.getItem('ordensFinalizadas') || '[]'), finalizedOrcamento]));

      setOrcamentosAceitos(updatedAceitos);
      setShowModal(false);
      setCurrentIndex(null);
      setFailureDescription('');
      setDefectDescription('');
      setMeasurements('');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentIndex(null);
    setFailureDescription('');
    setDefectDescription('');
    setMeasurements('');
  };

  const handleReject = (index: number) => {
    const updatedOrcamentos = orcamentosAceitos.filter((_, i) => i !== index);
    setOrcamentosAceitos(updatedOrcamentos);
    localStorage.setItem('orcamentosAceitos', JSON.stringify(updatedOrcamentos));
  };

  if (orcamentosAceitos.length === 0) {
    return <Container>Nenhum orçamento aceito no momento.</Container>;
  }

  return (
    <Container>
      <MainContent>
        <Table>
          <thead>
            <tr>
              <Th>Cliente</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Descrição</Th>
              <Th>Peças</Th>
              <Th>Modelo</Th>
              <Th>Ano</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {orcamentosAceitos.map((orcamento, index) => (
              <tr key={index}>
                <Td>{orcamento.clienteNome}</Td>
                <Td>{orcamento.clienteEmail}</Td>
                <Td>{orcamento.clienteTelefone}</Td>
                <Td>{orcamento.descricao}</Td>
                <Td>{orcamento.pecas || 'Não especificado'}</Td>
                <Td>{orcamento.modelo || 'Não especificado'}</Td>
                <Td>{orcamento.ano || 'Não especificado'}</Td>
                <Td>
                  <StatusTag color={statusColorMap[orcamento.status]}>
                    {orcamento.status}
                  </StatusTag>
                </Td>
                <Td>
                  <ButtonContainer>
                    <StatusButton onClick={() => handleStatusChange(index, 'Em andamento')}>
                      <FaTools /> Em andamento
                    </StatusButton>
                    <StatusButton onClick={() => handleStatusChange(index, 'Aguardando Peças')}>
                      <FaBoxOpen /> Aguardando Peças
                    </StatusButton>
                    <StatusButton onClick={() => handleStatusChange(index, 'Finalizado')}>
                      <FaCheck /> Finalizado
                    </StatusButton>
                    <RejectButton onClick={() => handleReject(index)}>
                      <FaBan /> Rejeitar
                    </RejectButton>
                  </ButtonContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal && (
          <Modal>
            <ModalContent>
              <ModalTitle>Finalizar Serviço</ModalTitle>
              <div>
                <span>Falha Relatada:</span>
                <ModalTextarea value={failureDescription} onChange={(e) => setFailureDescription(e.target.value)} />
              </div>
              <div>
                <span>Defeito Apresentado:</span>
                <ModalTextarea value={defectDescription} onChange={(e) => setDefectDescription(e.target.value)} />
              </div>
              <div>
                <span>Medidas Tomadas:</span>
                <ModalTextarea value={measurements} onChange={(e) => setMeasurements(e.target.value)} />
              </div>
              <ModalButtonContainer>
                <ModalButton onClick={handleModalSubmit}>Enviar</ModalButton>
                <ModalButton onClick={handleModalClose}>Cancelar</ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </Container>
  );
};

export default GestaoOrcamentos;
