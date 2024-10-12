import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cabecalho from '../Cabecalho';
import Rodape from '../Rodape';

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

const OrcamentoCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 1rem;
  color: #333;
`;

const CardField = styled.div`
  flex: 1 1 200px;
`;

const FieldLabel = styled.span`
  font-weight: 600;
  color: #555;
`;

const FieldValue = styled.span`
  color: #333;
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StatusButton = styled.button`
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

const RejectButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const RodapeStyled = styled(Rodape)`
  margin-top: auto;
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
      <Cabecalho />
      <MainContent>
        {orcamentosAceitos.map((orcamento, index) => (
          <OrcamentoCard key={index}>
            <CardContent>
              <CardField>
                <FieldLabel>Cliente:</FieldLabel>
                <FieldValue>{orcamento.clienteNome}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Email:</FieldLabel>
                <FieldValue>{orcamento.clienteEmail}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Telefone:</FieldLabel>
                <FieldValue>{orcamento.clienteTelefone}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Descrição:</FieldLabel>
                <FieldValue>{orcamento.descricao}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Peças:</FieldLabel>
                <FieldValue>{orcamento.pecas || 'Não especificado'}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Modelo:</FieldLabel>
                <FieldValue>{orcamento.modelo || 'Não especificado'}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Ano:</FieldLabel>
                <FieldValue>{orcamento.ano || 'Não especificado'}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Placa:</FieldLabel>
                <FieldValue>{orcamento.placa || 'Não especificado'}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Data:</FieldLabel>
                <FieldValue>{orcamento.data || 'Não especificado'}</FieldValue>
              </CardField>
              <CardField>
                <FieldLabel>Status Atual:</FieldLabel>
                <FieldValue>{orcamento.status}</FieldValue>
              </CardField>
            </CardContent>
            <ButtonContainer>
              <StatusButton onClick={() => handleStatusChange(index, 'Em andamento')}>Em Andamento</StatusButton>
              <StatusButton onClick={() => handleStatusChange(index, 'Aguardando Peças')}>Aguardando Peças</StatusButton>
              <StatusButton onClick={() => handleStatusChange(index, 'Finalizado')}>Finalizado</StatusButton>
              <RejectButton onClick={() => handleReject(index)}>Rejeitar</RejectButton>
            </ButtonContainer>
          </OrcamentoCard>
        ))}

        {showModal && (
          <Modal>
            <ModalContent>
              <ModalTitle>Finalizar Serviço</ModalTitle>
              <div>
                <FieldLabel>Falha Relatada:</FieldLabel>
                <ModalTextarea value={failureDescription} onChange={(e) => setFailureDescription(e.target.value)} />
              </div>
              <div>
                <FieldLabel>Defeito Apresentado:</FieldLabel>
                <ModalTextarea value={defectDescription} onChange={(e) => setDefectDescription(e.target.value)} />
              </div>
              <div>
                <FieldLabel>Medidas Tomadas:</FieldLabel>
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
      <RodapeStyled />
    </Container>
  );
};

export default GestaoOrcamentos;
