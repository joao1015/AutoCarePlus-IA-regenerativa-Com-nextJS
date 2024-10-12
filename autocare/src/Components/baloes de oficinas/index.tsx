// OficinasBalloons.tsx
import React from 'react';
import styled from 'styled-components';

// Tipagem para as oficinas
type Oficina = {
  id: number;
  title: string;
  description: string;
};

// Tipagem das props esperadas pelo componente
type OficinasBalloonsProps = {
  oficinas: Oficina[];
  onSelectOfficina: (title: string) => void;
};

// Estilos para os balões
const BalloonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1cm;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const Balloon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  width: 345px;
  height: 355px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;
  border-width: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const BalloonTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const BalloonDescription = styled.p`
  font-size: 14px;
  text-align: center;
`;

// Componente OficinasBalloons
const OficinasBalloons: React.FC<OficinasBalloonsProps> = ({ oficinas, onSelectOfficina }) => {
  return (
    <BalloonsWrapper>
      {oficinas.map((oficina) => (
        <Balloon key={oficina.id} onClick={() => onSelectOfficina(oficina.title)}>
          <BalloonTitle>{oficina.title}</BalloonTitle>
          <BalloonDescription>{oficina.description}</BalloonDescription>
        </Balloon>
      ))}
    </BalloonsWrapper>
  );
};

export default OficinasBalloons;
