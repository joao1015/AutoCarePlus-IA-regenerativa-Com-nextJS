"use client"; 

import React, { useState } from 'react';

const ConhecaAuto = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: 'Proposta Metamind',
      description:
        'A Metamind visa criar um ecossistema inovador que democratize o acesso a sistemas automatizados para oficinas.',
      details:
        'Nossa solução permite que oficinas operem de forma moderna, oferecendo uma experiência digital sem servidores locais, apenas com internet.'
    },
    {
      id: 2,
      title: 'IA para Diagnóstico de Falhas',
      description:
        'Uma inteligência artificial que identifica falhas em veículos e oferece soluções detalhadas.',
      details:
        'A IA fornece uma descrição completa para evitar erros e alucinações, garantindo uma análise precisa do problema.'
    },
    {
      id: 3,
      title: 'Busca e Comparação de Oficinas',
      description:
        'Plataforma que permite encontrar oficinas credenciadas, comparar preços, tempo de serviço e avaliações.',
      details:
        'A plataforma facilita a busca de oficinas de acordo com a necessidade do cliente, com critérios como preço e avaliações.'
    },
    {
      id: 4,
      title: 'Serviços Extras',
      description:
        'Adicione serviços como leva e traz, alinhamento e mais de forma personalizada.',
      details:
        'Os clientes podem personalizar o serviço com opções extras, como leva e traz e alinhamento.'
    },
    {
      id: 5,
      title: 'Escolha de Peças',
      description:
        'Flexibilidade para escolher entre peças renovadas ou novas, conforme a preferência do cliente.',
      details:
        'A plataforma oferece a opção de escolher entre peças renovadas ou novas, dependendo do orçamento e preferência do cliente.'
    },
    {
      id: 6,
      title: 'Agendamento e Execução',
      description:
        'O cliente agenda o serviço, escolhe a oficina e recebe um atendimento personalizado.',
      details:
        'O sistema oferece um processo simples de agendamento, além de aprendizado contínuo da IA com base nas ordens de serviço.'
    }
  ];

  const steps = [
    {
      id: 1,
      title: 'Cliente chega com problema',
      explanation: 'O cliente identifica um problema em seu veículo e decide buscar uma solução através do nosso site.'
    },
    {
      id: 2,
      title: 'Acessa o site e faz cadastro/login',
      explanation: 'O cliente acessa o site AutoCarePlus e cria uma conta ou faz login para começar a utilizar o serviço.'
    },
    {
      id: 3,
      title: 'Interage com a IA para diagnóstico',
      explanation: 'O cliente interage com a inteligência artificial para descrever o problema e receber um diagnóstico preliminar.'
    },
    {
      id: 4,
      title: 'Direcionado para uma oficina especializada',
      explanation: 'Com base no diagnóstico, o cliente é direcionado para uma oficina especializada que pode resolver o problema.'
    }
  ];

  const workshopSteps = [
    {
      id: 1,
      title: 'Oficina de médio/pequeno porte quer aumentar clientela',
      explanation: 'A oficina deseja atrair mais clientes e decide se cadastrar na plataforma AutoCarePlus para expandir sua clientela.'
    },
    {
      id: 2,
      title: 'Interage com a IA e recebe orçamentos do dia',
      explanation: 'A oficina utiliza a IA para acessar todos os orçamentos do dia e escolher quais serviços ela pode aceitar.'
    },
    {
      id: 3,
      title: 'Aceita orçamentos pertinentes e realiza o serviço',
      explanation: 'A oficina aceita os orçamentos que considera pertinentes e realiza os serviços necessários para os clientes.'
    },
    {
      id: 4,
      title: 'Todos saem felizes com o serviço prestado',
      explanation: 'Após a realização dos serviços, tanto o cliente quanto a oficina ficam satisfeitos com o resultado.'
    }
  ];

  const handleToggle = (id: number) => {
    setOpenFeature(openFeature === id ? null : id);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-center text-blue-900 text-4xl mb-6">Conheça a AutoCarePlus</h1>
      <h2 className="text-center text-blue-700 text-2xl mb-8">Revolucionando o Acesso a Sistemas Automatizados para Oficinas</h2>

      <h2 className="text-center text-blue-700 text-2xl mb-8">Como Funciona o Nosso Site</h2>
      <div className="flex justify-around mb-8 space-y-4 sm:space-y-0 sm:flex-row flex-col items-center">
        <div className="flex flex-col items-center relative">
          <h3 className="text-blue-900">Cliente</h3>
          {steps.map(step => (
            <div key={step.id} className="relative my-4" onMouseEnter={() => setHoveredStep(step.id)} onMouseLeave={() => setHoveredStep(null)}>
              <div className={`absolute w-48 p-2 bg-white border border-blue-500 rounded-lg shadow-md top-[-5rem] left-1/2 transform -translate-x-1/2 ${hoveredStep === step.id ? 'block' : 'hidden'}`}>
                {step.explanation}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent border-t-4 border-blue-500"></div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md text-center w-48">{step.title}</div>
              {step.id < steps.length && <div className="text-blue-700 text-2xl mt-4">↓</div>}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center relative">
          <h3 className="text-blue-900">Oficina</h3>
          {workshopSteps.map(step => (
            <div key={step.id} className="relative my-4" onMouseEnter={() => setHoveredStep(step.id + 10)} onMouseLeave={() => setHoveredStep(null)}>
              <div className={`absolute w-48 p-2 bg-white border border-blue-500 rounded-lg shadow-md top-[-5rem] left-1/2 transform -translate-x-1/2 ${hoveredStep === step.id + 10 ? 'block' : 'hidden'}`}>
                {step.explanation}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent border-t-4 border-blue-500"></div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md text-center w-48">{step.title}</div>
              {step.id < workshopSteps.length && <div className="text-blue-700 text-2xl mt-4">↓</div>}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-center text-blue-700 text-2xl mb-8">Funcionalidades</h2>
      {features.map(feature => (
        <div key={feature.id} className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
          <h3 className="text-blue-700 text-xl">{feature.title}</h3>
          <p className="text-gray-700">{feature.description}</p>
          {openFeature === feature.id && <p className="text-gray-500 mt-2">{feature.details}</p>}
          <button onClick={() => handleToggle(feature.id)} className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition">
            {openFeature === feature.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConhecaAuto;
