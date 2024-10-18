"use client"; // Para Next.js

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Usando o hook de busca de parâmetros
import styled from 'styled-components';
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

// Styled components para modal e agendamento
const AgendamentoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
  margin: 2rem auto;
  height: 70%;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-left: 7cm;
  margin-top: -20cm;
`;

const BalloonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1cm;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 10cm;
  margin-top: 1cm;
`;

const Balloon = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #3437f1;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  color: white;
  padding: 30px;
  width: 345px;
  height: 440px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.2s ease;
  border-width: 10px;
  position: relative;
  font-weight: bold;
  background-size: cover;
  background-position: center;

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.05)')};
  }
`;

const BalloonImageContainer = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  background-color: #2c6568;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BalloonTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const BalloonDescription = styled.p`
  font-size: 14px;
  text-align: center;
`;

const Button = styled.button<{ disabled: boolean }>`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? '#aaa' : '#117500')};
  color: #fff;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#aaa' : '#0000cc')};
  }
`;

const OpenModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #117500;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #0d5b00;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 12px;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 22px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: #000000;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background: #ffffff;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 24px;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  margin: 0;
`;

const ModalButton = styled.button`
  margin-top: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #117500;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d5b00;
  }
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

// Componente de Agendamento
const Agendamento: React.FC = () => {
  const searchParams = useSearchParams();
  const usuarioLogado = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('usuarioLogado') || '{}' : '{}');
  const lastMessage = searchParams.get('lastMessage') || 'Nenhum orçamento disponível.';
  const [success, setSuccess] = useState(false);
  const [disabledOfficinas, setDisabledOfficinas] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ordemServico, setOrdemServico] = useState<string>(''); // Adicionando estado para ordem de serviço

  const { pecas, modelo, ano, diagnostico, solucao, estimativa } = extractDados(lastMessage as string);

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
    const oficinaMap = { oficinaA: 1, oficinaB: 2, oficinaC: 3 };

    if (!(localStorageKey in oficinaMap)) {
      console.error('Oficina não encontrada');
      return;
    }

    const oficinaId = oficinaMap[localStorageKey as keyof typeof oficinaMap];

    const codigoOrdemServico = gerarCodigoOrdemServico(); // Gerar o número de ordem de serviço
    setOrdemServico(codigoOrdemServico); // Armazenar o número gerado no estado

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
      ordemServico: codigoOrdemServico, // Usar o número de ordem de serviço gerado
    };

    console.log('Agendamento:', orcamento); // Para depuração

    try {
      const response = await fetch('/api/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orcamento),
      });

      if (response.ok) {
        setSuccess(true);
        setDisabledOfficinas([...disabledOfficinas, localStorageKey]);
      } else {
        console.error('Erro ao salvar orçamento:', await response.json());
      }
    } catch (err) {
      console.error('Erro ao salvar orçamento:', err);
    }
  };

  return (
    <AgendamentoContainer>
      <h1>Agendamento</h1>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
          <ModalTitle>Último Orçamento</ModalTitle>
          <ModalMessage>{lastMessage}</ModalMessage>
          <InputContainer>
            <Input
              type="text"
              placeholder="Digite seu número de telefone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputContainer>
          <ModalButton onClick={() => {
            handleSelectOfficina(''); 
            setIsModalOpen(false);
          }}>Agendar</ModalButton>
        </ModalContent>
      </ModalOverlay>

      <BalloonsWrapper>
        {oficinas.map((oficina) => (
          <Balloon
            key={oficina.id}
            disabled={disabledOfficinas.includes(oficina.localStorageKey)}
          >
            <BalloonImageContainer>
              <Image src={oficina.image} alt={oficina.title} layout="fill" objectFit="cover" />
            </BalloonImageContainer>
            <BalloonTitle>{oficina.title}</BalloonTitle>
            <BalloonDescription>
              Endereço: {oficina.address}<br />
              Modelo: {modelo}<br />
              Ano: {ano}<br />
              Peças necessárias: {pecas}<br />
              Diagnóstico: {diagnostico}<br />
              Solução sugerida: {solucao}<br />
              Estimativa de custo: {estimativa}
            </BalloonDescription>
            <Button
              disabled={disabledOfficinas.includes(oficina.localStorageKey)}
              onClick={() => {
                setIsModalOpen(true);
                handleSelectOfficina(oficina.localStorageKey);
              }}
            >
              Agendar
            </Button>
          </Balloon>
        ))}
      </BalloonsWrapper>

      {success && <p>Agendamento realizado com sucesso! Código de ordem de serviço: {ordemServico}</p>}
    </AgendamentoContainer>
  );
};

export default Agendamento;
