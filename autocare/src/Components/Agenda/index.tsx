"use client"; // Para Next.js

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Usando o hook de busca de parâmetros
import Image from 'next/image'; // Para otimizar imagens
import oficinaAImage from './imagens/garagem.png';
import oficinaBImage from './imagens/servico-automotivo (1).png';
import oficinaCImage from './imagens/servico-automotivo.png';

// Funções para extrair dados
const extractPecas = (text: string): string => {
  const pecasMatch = text.match(/Peças necessárias:\s*(.+)/);
  return pecasMatch ? pecasMatch[1] : 'Não especificado';
};

const extractModelo = (text: string): string => {
  const modeloMatch = text.match(/Modelo:\s*(.+)/);
  return modeloMatch ? modeloMatch[1] : 'Não especificado';
};

const extractAno = (text: string): string => {
  const anoMatch = text.match(/Ano:\s*(.+)/);
  return anoMatch ? anoMatch[1] : 'Não especificado';
};

const extractDiagnostico = (text: string): string => {
  const diagnosticoMatch = text.match(/Diagnóstico:\s*(.+)/);
  return diagnosticoMatch ? diagnosticoMatch[1] : 'Não especificado';
};

const extractSolucao = (text: string): string => {
  const solucaoMatch = text.match(/Solução sugerida:\s*(.+)/);
  return solucaoMatch ? solucaoMatch[1] : 'Não especificado';
};

const extractEstimativa = (text: string): string => {
  const estimativaMatch = text.match(/Estimativa de custo:\s*(.+)/);
  return estimativaMatch ? estimativaMatch[1] : 'Não especificado';
};

// Função para extrair todos os dados
const extractDados = (text: string) => {
  return {
    pecas: extractPecas(text),
    modelo: extractModelo(text),
    ano: extractAno(text),
    diagnostico: extractDiagnostico(text),
    solucao: extractSolucao(text),
    estimativa: extractEstimativa(text),
  };
};

// Função para gerar um código de 7 dígitos
const gerarCodigoOrdemServico = (): string => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

// Componente de Agendamento
const Agendamento: React.FC = () => {
  const searchParams = useSearchParams();
  const usuarioLogado = JSON.parse(
    typeof window !== 'undefined' ? localStorage.getItem('usuarioLogado') || '{}' : '{}'
  );
  const lastMessage =
    searchParams.get('lastMessage') || 'Nenhum orçamento disponível.';
  const [success, setSuccess] = useState(false);
  const [disabledOfficinas, setDisabledOfficinas] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState(''); // Atualizando número de telefone
  const [ordemServico, setOrdemServico] = useState<string>(''); // Adicionando estado para ordem de serviço

  const { pecas, modelo, ano, diagnostico, solucao, estimativa } = extractDados(lastMessage);

  const oficinas = [
    {
      id: 1,
      title: 'Oficina Faria Lima',
      localStorageKey: 'oficinaA',
      image: oficinaAImage,
      address: 'Av. Faria Lima, 1234, São Paulo, SP',
    },
    {
      id: 2,
      title: 'Oficina Barra Funda',
      localStorageKey: 'oficinaB',
      image: oficinaBImage,
      address: 'Rua Barra Funda, 567, São Paulo, SP',
    },
    {
      id: 3,
      title: 'Oficina Vila Sonia',
      localStorageKey: 'oficinaC',
      image: oficinaCImage,
      address: 'Av. Vila Sonia, 789, São Paulo, SP',
    },
  ];

  const handleSelectOfficina = async (localStorageKey: string) => {
    if (disabledOfficinas.includes(localStorageKey)) {
      console.warn('Oficina já selecionada anteriormente');
      return;
    }

    const oficinaMap = { oficinaA: 1, oficinaB: 2, oficinaC: 3 };

    if (!(localStorageKey in oficinaMap)) {
      console.error('Oficina não encontrada');
      return;
    }

    const oficinaId = oficinaMap[localStorageKey as keyof typeof oficinaMap];

    const codigoOrdemServico = gerarCodigoOrdemServico();
    setOrdemServico(codigoOrdemServico);

    const orcamento = {
      cliente: {
        nome: usuarioLogado.nome || 'Nome não disponível',
        email: usuarioLogado.email || 'Email não disponível',
        telefone: phoneNumber || 'Telefone não disponível',
      },
      pecas,
      modelo,
      ano,
      diagnostico,
      solucao,
      estimativa,
      oficinaId,
      ordemServico: codigoOrdemServico,
    };

    console.log('Tentando agendar:', orcamento);

    try {
      const response = await fetch('/api/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orcamento),
      });

      console.log('Response status:', response.status); // Debug

      if (response.ok) {
        setSuccess(true);
        setDisabledOfficinas([...disabledOfficinas, localStorageKey]);
        console.log('Agendamento realizado com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar orçamento:', errorData);
      }
    } catch (err) {
      console.error('Erro ao salvar orçamento:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-xl my-8 mx-auto w-[95%] shadow-lg">
      <h1 className="text-black text-center text-2xl font-bold">Agendamento</h1>

      <div className="flex flex-wrap justify-center gap-8 mt-8 pb-8 w-full">
        {oficinas.map((oficina) => (
          <div
            key={oficina.id}
            className={`flex flex-col items-center relative bg-[#3437f1] border border-gray-300 rounded-xl font-poppins text-white p-4 sm:p-6 md:p-8 w-full sm:w-1/2 lg:w-1/3 max-w-xs sm:max-w-sm shadow-md cursor-pointer transition-transform duration-200 ease-in-out ${
              disabledOfficinas.includes(oficina.localStorageKey)
                ? 'bg-gray-500 cursor-not-allowed'
                : 'hover:scale-105'
            }`}
            onClick={() =>
              !disabledOfficinas.includes(oficina.localStorageKey) &&
              handleSelectOfficina(oficina.localStorageKey)
            }
          >
            <div className="absolute top-2 -mt-10 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white bg-[#2c6568] flex items-center justify-center">
              <Image
                src={oficina.image}
                alt={oficina.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg sm:text-xl mt-12 mb-5">{oficina.title}</h2>
            <p className="text-sm sm:text-base text-center mt-5 leading-relaxed">
              Endereço: {oficina.address}
              <br />
              Modelo: {modelo}
              <br />
              Ano: {ano}
              <br />
              Peças necessárias: {pecas}
              <br />
              Diagnóstico: {diagnostico}
              <br />
              Solução sugerida: {solucao}
              <br />
              Estimativa de custo: {estimativa}
            </p>
            <button
              className={`mt-6 py-2 px-4 sm:mt-8 sm:py-3 sm:px-6 rounded-lg text-white text-sm sm:text-base transition-colors duration-300 ${
                disabledOfficinas.includes(oficina.localStorageKey)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#117500] hover:bg-[#0000cc]'
              }`}
              disabled={disabledOfficinas.includes(oficina.localStorageKey)}
            >
              Agendar
            </button>
          </div>
        ))}
      </div>

      {success && (
        <p className="text-green-600 font-semibold mt-4">
          Agendamento realizado com sucesso! Código de ordem de serviço:{' '}
          {ordemServico}
        </p>
      )}
    </div>
  );
};

export default Agendamento;
