// src/Componentes/AvatarSelector.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Component para o contêiner de seleção de avatar
const AvatarSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Styled Component para os avatares
const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin: 5px;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: #007bff;
  }
`;

// Lista de avatares predefinidos (exemplo)
const avatars = [
  'https://via.placeholder.com/50?text=A',
  'https://via.placeholder.com/50?text=B',
  'https://via.placeholder.com/50?text=C',
  // Adicione mais URLs de avatares conforme necessário
];

const AvatarSelector: React.FC<{ onSelect: (avatar: string) => void }> = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar); // Chama a função de callback com o avatar selecionado
  };

  return (
    <AvatarSelectorContainer>
      {avatars.map((avatar, index) => (
        <AvatarImage
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          onClick={() => handleAvatarClick(avatar)}
          style={{ borderColor: avatar === selectedAvatar ? '#007bff' : 'transparent' }}
        />
      ))}
    </AvatarSelectorContainer>
  );
};

export default AvatarSelector;
