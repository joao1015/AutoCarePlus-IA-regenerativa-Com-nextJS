import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rodape from '../Rodape';
import Cabecalho from '../Cabecalho';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the container fills the viewport height */
  padding: 20px;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 15px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  margin-top: auto; /* Pushes the footer to the bottom of the container */
`;

const OrdensFinalizadas: React.FC = () => {
  const [ordens, setOrdens] = useState<any[]>([]);

  useEffect(() => {
    const storedOrdens = JSON.parse(localStorage.getItem('ordensFinalizadas') || '[]');
    setOrdens(storedOrdens);
  }, []);

  // Função para verificar se a ordem está dentro do prazo de garantia de 6 meses
  const verificarGarantia = (dataFinalizacao: string): string => {
    const dataAtual = new Date();
    const dataFinal = new Date(dataFinalizacao);

    // Adicionando 6 meses à data de finalização
    const dataExpiracaoGarantia = new Date(dataFinal);
    dataExpiracaoGarantia.setMonth(dataFinal.getMonth() + 6);

    // Comparando com a data atual
    if (dataAtual <= dataExpiracaoGarantia) {
      return 'Em garantia';
    } else {
      return 'Fora da garantia';
    }
  };

  return (
    <Container>
      <Cabecalho />
      <Title>Ordens Finalizadas</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Descrição</TableHeader>
            <TableHeader>Peças</TableHeader>
            <TableHeader>Modelo</TableHeader>
            <TableHeader>Ano</TableHeader>
            <TableHeader>Placa</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Falha</TableHeader>
            <TableHeader>Defeito</TableHeader>
            <TableHeader>Medidas</TableHeader>
            <TableHeader>Garantia</TableHeader> {/* Nova coluna para a garantia */}
          </tr>
        </thead>
        <tbody>
          {ordens.map((ordem, index) => (
            <TableRow key={index}>
              <TableCell>{ordem.descricao}</TableCell>
              <TableCell>{ordem.pecas || 'Não especificado'}</TableCell>
              <TableCell>{ordem.modelo || 'Não especificado'}</TableCell>
              <TableCell>{ordem.ano || 'Não especificado'}</TableCell>
              <TableCell>{ordem.placa || 'Não especificado'}</TableCell>
              <TableCell>{ordem.data || 'Não especificado'}</TableCell>
              <TableCell>{ordem.falha || 'Não especificado'}</TableCell>
              <TableCell>{ordem.defeito || 'Não especificado'}</TableCell>
              <TableCell>{ordem.medidas || 'Não especificado'}</TableCell>
              <TableCell>
                {ordem.data ? verificarGarantia(ordem.data) : 'Data inválida'}
              </TableCell> {/* Exibe se está ou não em garantia */}
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Footer>
        <Rodape />
      </Footer>
    </Container>
  );
};

export default OrdensFinalizadas;
