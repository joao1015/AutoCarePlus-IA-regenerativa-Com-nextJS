import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Side from '../Sideoficinas/index'; // Ajuste o caminho conforme necessário
import Rodape from '../Rodape';
import Cabecalho from '../Cabecalho';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 26px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;
`;

const OrcamentoDetail = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
`;

const PaginaDaCredenciada: React.FC = () => {
  const location = useLocation();
  const orcamento = location.state?.orcamento;

  // Caso não haja orçamento, exibir mensagem informativa


  return (



  
    <LayoutContainer>
     
      <Side></Side>
      <MainContent>
        <Title>Orçamento Recebido</Title>
        <OrcamentoDetail>Peças a serem trocadas: {orcamento.pecas}</OrcamentoDetail>
        <OrcamentoDetail>Modelo do veículo: {orcamento.modelo}</OrcamentoDetail>
        <OrcamentoDetail>Ano do veículo: {orcamento.ano}</OrcamentoDetail>
        <OrcamentoDetail>Placa do veículo: {orcamento.placa}</OrcamentoDetail>
        <OrcamentoDetail>Data do Orçamento: {orcamento.data}</OrcamentoDetail>
      </MainContent>
 
    </LayoutContainer>
  
  );
};

export default PaginaDaCredenciada;
