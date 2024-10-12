import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
`;

const Title = styled.h1`
  text-align: center;
  color: #002d72;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.h2`
  text-align: center;
  color: #004a99;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const DiagramSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: center;
  }
`;


const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Step = styled.div`
  background: #ffffff;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
  position: relative;
  z-index: 1; // Ensure steps are above arrows
`;

const Arrow = styled.div`
  font-size: 2rem;
  color: #004a99;
  text-align: center;
  width: 200px;
  position: absolute;
  top: 100%;
  transform: translateY(0%);
  z-index: 0; // Ensure arrows are below steps
`;

const Balloon = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  background-color: #fff;
  border: 1px solid #004a99;
  border-radius: 5px;
  padding: 0.5rem;
  width: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
`;

const BalloonArrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #004a99;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #004a99;
`;

const FeatureDescription = styled.p`
  color: #333333;
`;

const Details = styled.p`
  margin-top: 1rem;
  color: #666666;
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #004a99;
  }
`;

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
    <Container>
      <Title>Conheça a AutoCarePlus</Title>
      <Subtitle>Revolucionando o Acesso a Sistemas Automatizados para Oficinas</Subtitle>

      <Subtitle>Como Funciona o Nosso Site</Subtitle>
      <DiagramSection>
        <DiagramContainer>
          <h3>Cliente</h3>
          {steps.map(step => (
            <div key={step.id} style={{ position: 'relative', margin: '1rem 0' }} onMouseEnter={() => setHoveredStep(step.id)} onMouseLeave={() => setHoveredStep(null)}>
              <Balloon visible={hoveredStep === step.id}>{step.explanation}<BalloonArrow /></Balloon>
              <Step>{step.title}</Step>
              {step.id < steps.length && <Arrow>↓</Arrow>}
            </div>
          ))}
        </DiagramContainer>

        <DiagramContainer>
          <h3>Oficina</h3>
          {workshopSteps.map(step => (
            <div key={step.id} style={{ position: 'relative', margin: '1rem 0' }} onMouseEnter={() => setHoveredStep(step.id + 10)} onMouseLeave={() => setHoveredStep(null)}>
              <Balloon visible={hoveredStep === step.id + 10}>{step.explanation}<BalloonArrow /></Balloon>
              <Step>{step.title}</Step>
              {step.id < workshopSteps.length && <Arrow>↓</Arrow>}
            </div>
          ))}
        </DiagramContainer>
      </DiagramSection>

      <Subtitle>Funcionalidades</Subtitle>
      {features.map(feature => (
        <FeatureCard key={feature.id}>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
          {openFeature === feature.id && <Details>{feature.details}</Details>}
          <Button onClick={() => handleToggle(feature.id)}>
            {openFeature === feature.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
          </Button>
        </FeatureCard>
      ))}
    </Container>
  );
};

export default ConhecaAuto;
