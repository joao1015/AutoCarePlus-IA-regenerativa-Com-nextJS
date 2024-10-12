import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components para layout mais profissional
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const OrcamentoCard = styled.div`
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
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #10B981;
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

const OrcamentosRecebidos: React.FC = () => {
  const [orcamentos, setOrcamentos] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const oficinaId = localStorage.getItem('oficinaId'); // Pega o oficinaId do localStorage

        if (!oficinaId) {
          console.error('Nenhuma oficina logada.');
          return;
        }

        const response = await fetch(`http://localhost:4000/orcamentos/${oficinaId}`); // Filtra por oficinaId
        const result = await response.json();
        if (response.ok) {
          setOrcamentos(result.orcamentos);
        } else {
          console.error('Erro ao buscar orçamentos:', result.error);
        }
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
      }
    };

    fetchOrcamentos();
  }, []);

  const handleReject = async (index: number) => {
    const rejectedOrcamento = orcamentos[index];

    // Remover do estado atual
    const updatedOrcamentos = orcamentos.filter((_, i) => i !== index);
    setOrcamentos(updatedOrcamentos);

    // Enviar atualização para backend (opcional)
    try {
      await fetch(`http://localhost:4000/orcamentos/rejeitar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: rejectedOrcamento.id }), // Enviar o ID do orçamento rejeitado
      });
      console.log('Orçamento rejeitado com sucesso.');
    } catch (error) {
      console.error('Erro ao rejeitar orçamento:', error);
    }
  };

  const handleAccept = async (index: number) => {
    const acceptedOrcamento = orcamentos[index];

    // Adicionar ao localStorage como aceito
    const storedAceitos = JSON.parse(localStorage.getItem('orcamentosAceitos') || '[]');
    const updatedAceitos = [...storedAceitos, acceptedOrcamento];
    localStorage.setItem('orcamentosAceitos', JSON.stringify(updatedAceitos));

    // Atualizar backend (opcional)
    try {
      await fetch(`http://localhost:4000/orcamentos/aceitar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: acceptedOrcamento.id }), // Enviar o ID do orçamento aceito
      });
      console.log('Orçamento aceito com sucesso.');
    } catch (error) {
      console.error('Erro ao aceitar orçamento:', error);
    }

    // Remover do estado atual de orçamentos recebidos
    const updatedOrcamentos = orcamentos.filter((_, i) => i !== index);
    setOrcamentos(updatedOrcamentos);

    // Redirecionar para a página de gestão de orçamentos (opcional)
    window.location.href = '/gestao-orcamentos'; // Altere o caminho para a página correta
  };

  return (
    <Container>
      <Title>Orçamentos Recebidos</Title>
      {orcamentos.length === 0 ? (
        <p>Não há orçamentos disponíveis no momento.</p>
      ) : (
        orcamentos.map((orcamento, index) => (
          <OrcamentoCard key={index}>
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
