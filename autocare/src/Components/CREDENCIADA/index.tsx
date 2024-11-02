import React from 'react';
import { useLocation } from 'react-router-dom';
import Side from '../Sideoficinas/index'; // Ajuste o caminho conforme necessário
import Rodape from '../Rodape';
import Cabecalho from '../Cabecalho';

const PaginaDaCredenciada: React.FC = () => {
  const location = useLocation();
  const orcamento = location.state?.orcamento;

 
  if (!orcamento) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-poppins">Nenhum orçamento disponível.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Side />
      <div className="flex-1 p-5 max-w-[800px] mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="mb-5 text-[26px] font-poppins font-semibold text-center">
          Orçamento Recebido
        </h2>
        <p className="text-lg mb-2 font-poppins">
          Peças a serem trocadas: {orcamento.pecas}
        </p>
        <p className="text-lg mb-2 font-poppins">
          Modelo do veículo: {orcamento.modelo}
        </p>
        <p className="text-lg mb-2 font-poppins">
          Ano do veículo: {orcamento.ano}
        </p>
        <p className="text-lg mb-2 font-poppins">
          Placa do veículo: {orcamento.placa}
        </p>
        <p className="text-lg mb-2 font-poppins">
          Data do Orçamento: {orcamento.data}
        </p>
      </div>
    </div>
  );
};

export default PaginaDaCredenciada;
