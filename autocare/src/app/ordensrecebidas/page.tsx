"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Side from "@/Components/Sideoficinas"; // Certifique-se de que o caminho está correto
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHash,
  FiSettings,
  FiTool,
  FiCalendar,
  FiClipboard,
  FiCheckSquare,
  FiDollarSign,
} from 'react-icons/fi';

const OrcamentosRecebidos: React.FC = () => {
  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const oficinaId = localStorage.getItem('oficinaId');
        if (!oficinaId) {
          alert('Nenhuma oficina logada.');
          return;
        }

        const response = await fetch(`/api/orcamentos?oficinaId=${oficinaId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar orçamentos.');
        }

        const result = await response.json();
        setOrcamentos(result.orcamentos);
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
        alert('Erro ao buscar orçamentos.');
      }
    };

    fetchOrcamentos();
  }, []);

  const handleReject = async (index: number) => {
    const rejectedOrcamento = orcamentos[index];
    try {
      const response = await fetch(
        `/api/orcamentos?numero_ordem_servico=${rejectedOrcamento.NUMERO_ORDEM_SERVICO}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Erro ao deletar orçamento:', errorResponse);
        alert(`Erro ao deletar orçamento: ${errorResponse}`);
        return;
      }

      setOrcamentos(orcamentos.filter((_, i) => i !== index));
      alert('Orçamento deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
      alert('Erro ao deletar orçamento.');
    }
  };

  const handleAccept = async (index: number) => {
    const acceptedOrcamento = orcamentos[index];
    try {
      const response = await fetch('/api/gestao-ordens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente_nome: acceptedOrcamento.cliente_nome,
          cliente_email: acceptedOrcamento.cliente_email,
          cliente_telefone: acceptedOrcamento.cliente_telefone,
          pecas: acceptedOrcamento.pecas,
          modelo: acceptedOrcamento.modelo,
          ano: acceptedOrcamento.ano,
          diagnostico: acceptedOrcamento.diagnostico,
          solucao: acceptedOrcamento.solucao,
          estimativa: acceptedOrcamento.estimativa,
          numero_ordem_servico: acceptedOrcamento.NUMERO_ORDEM_SERVICO,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Erro ao salvar na gestão de ordens:', errorResponse);
        alert(`Erro ao salvar na gestão de ordens: ${errorResponse}`);
        return;
      }

      setOrcamentos(orcamentos.filter((_, i) => i !== index));
      alert('Orçamento aceito e salvo na gestão de ordens!');
    } catch (error) {
      console.error('Erro ao aceitar orçamento:', error);
      alert('Erro ao aceitar orçamento.');
    }
  };

  return (
    <div className="flex">
      <Side /> {/* Componente de menu lateral */}
      <div className="flex-grow p-5">
        <div className="min-h-screen bg-white flex flex-col p-5">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
            Orçamentos Recebidos
          </h1>
          {orcamentos.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Não há orçamentos disponíveis no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orcamentos.map((orcamento, index) => (
                <div
                  key={orcamento.NUMERO_ORDEM_SERVICO || index}
                  className="border rounded-lg shadow p-4"
                >
                  <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    <FiUser /> {orcamento.cliente_nome}
                  </h2>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiMail /> <strong>Email:</strong>
                    <span className="max-w-xs md:max-w-sm overflow-hidden text-ellipsis whitespace-nowrap truncate">
                      {orcamento.cliente_email}
                    </span>
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiPhone /> <strong>Telefone:</strong>{' '}
                    {orcamento.cliente_telefone}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiHash /> <strong>Número da Ordem:</strong>{' '}
                    {orcamento.NUMERO_ORDEM_SERVICO}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiSettings /> <strong>Peças:</strong> {orcamento.pecas}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiTool /> <strong>Modelo:</strong> {orcamento.modelo}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiCalendar /> <strong>Ano:</strong> {orcamento.ano}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiClipboard /> <strong>Diagnóstico:</strong>{' '}
                    {orcamento.diagnostico}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiCheckSquare /> <strong>Solução:</strong>{' '}
                    {orcamento.solucao}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiDollarSign /> <strong>Estimativa:</strong>{' '}
                    {orcamento.estimativa}
                  </p>
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => handleAccept(index)}
                      className="bg-teal-700 text-white py-2 px-3 md:px-4 rounded hover:bg-teal-900 transition-colors text-sm md:text-base"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => handleReject(index)}
                      className="bg-red-700 text-white py-2 px-3 md:px-4 rounded hover:bg-red-900 transition-colors text-sm md:text-base"
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrcamentosRecebidos;
