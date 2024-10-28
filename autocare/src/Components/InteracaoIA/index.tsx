"use client"; // Para Next.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Image from 'next/image'; // Importando o componente Image do Next.js
import icone from '@/Components/InteracaoIA/Imagens/ia.png';  // Avatar do Chatbot
import userAvatar from '@/Components/InteracaoIA/Imagens/usuario.png';  // Avatar do Usuário
import { useRouter } from 'next/navigation';

// Global styles including animations
const GlobalStyle = createGlobalStyle`
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  border: 2px solid #000000;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  height: 80vh;
  overflow: hidden;
  position: relative;
`;

const ChatHeader = styled.div`
  width: 100%;
  background-color: #002cbb;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  padding: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #444444;
`;

const ChatBody = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatInputContainer = styled.div`
  width: 100%;
  display: flex;
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
  border-radius: 40px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  color: black;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #117500;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  margin-left: 10px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #357ABD;
    transform: scale(1.05);
  }

  &:focus {
    outline: 3px solid #4a90e2;
  }
`;

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  max-width: 90%;
  flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
  animation: ${({ isUser }) => (isUser ? 'fadeInRight 0.5s' : 'fadeInLeft 0.5s')};
`;

const Message = styled.div<{ isUser: boolean }>`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #000000;
  background-color: ${({ isUser }) => (isUser ? '#d4edda' : '#f8d7da')};
  color: ${({ isUser }) => (isUser ? '#000000' : '#000000')};
  margin-left: ${({ isUser }) => (isUser ? '10px' : '0')};
  margin-right: ${({ isUser }) => (isUser ? '0' : '10px')};
  max-width: 70%;
  white-space: pre-wrap;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 800px; // Define uma largura máxima
  position: relative;
`;

const AnnotatedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh; // Garante que a imagem não ultrapasse a altura da tela
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff5c5c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
`;

// No JSX


interface GenericItem {
  text?: string;
  response_type?: string;
}

interface WatsonResponse {
  output: {
    generic: GenericItem[];
  };
  context: any;
}

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; name: string }[]>([]);
  const [context, setContext] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [annotatedImage, setAnnotatedImage] = useState<string | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true, name: 'Usuário' }]);
    await sendMessageToWatson(message);
    setMessage('');
  };

  const sendMessageToWatson = async (text: string) => {
    try {
      const response = await axios.post<WatsonResponse>(
        'https://api.us-south.assistant.watson.cloud.ibm.com/v1/workspaces/8a8032d0-e893-47de-a586-0398d3a35098/message?version=2021-06-14',
        { input: { text }, context },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa('apikey:r_suOM3Fo1tcsPUKukbkHjkltOBjiJGYFdPx2mtIHb-8')}`,
          },
        }
      );

      setContext(response.data.context);
      const responseText = response.data.output.generic
        .map((item: GenericItem) => (item.response_type === 'text' && item.text ? item.text : ''))
        .filter((text) => text)
        .join(' ');

      setMessages((prevMessages) => [...prevMessages, { text: responseText || 'Sem resposta', isUser: false, name: 'AutoCarePlus' }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o chatbot:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Ocorreu um erro, tente novamente.', isUser: false, name: 'Chatbot' }]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
    setShowModal(!!file);
    setAnnotatedImage(null); // Adicione esta linha para redefinir a imagem anotada ao selecionar uma nova imagem
  };

  const handleImageSend = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post("http://127.0.0.1:5001/detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob"
        });

        const imageUrl = URL.createObjectURL(response.data);
        setAnnotatedImage(imageUrl);
        // Remova setShowModal(false);
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
      }
    }
  };
  const handleSendFailure = async () => {
    const failureMessage = 'falha na injeção eletrônica';
  
    // Adiciona a mensagem ao estado das mensagens como se fosse enviada pelo usuário
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: failureMessage, isUser: true, name: 'Usuário' },
    ]);
  
    // Fecha o modal
    closeModal();
  
    // Envia a mensagem para o Watson Assistant
    await sendMessageToWatson(failureMessage);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setAnnotatedImage(null);
  };


  return (
    <>
      <GlobalStyle />
      <ChatContainer>
        <ChatHeader>AutoCarePlus</ChatHeader>
        <ChatBody ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isUser={msg.isUser}>
              <Image
                src={msg.isUser ? userAvatar : icone}
                alt={msg.isUser ? 'User Avatar' : 'Chatbot Avatar'}
                width={50}
                height={50}
                style={{
                  borderRadius: '50%',
                  marginRight: msg.isUser ? '0' : '10px',
                  marginLeft: msg.isUser ? '10px' : '0',
                }}
              />
              <Message isUser={msg.isUser} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </MessageContainer>
          ))}
          {annotatedImage && (
            <MessageContainer isUser={false}>
              <Image src={annotatedImage} alt="Imagem Anotada" width={200} height={200} />
            </MessageContainer>
          )}
        </ChatBody>
        <ChatInputContainer>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            placeholder="Digite sua mensagem..."
            aria-label="Campo de mensagem"
          />
          <Button onClick={handleSubmit} aria-label="Enviar mensagem">Enviar</Button>
          <Button onClick={() => document.getElementById("fileInput")?.click()} aria-label="Anexar Imagem">Anexar</Button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </ChatInputContainer>
      </ChatContainer>

      {showModal && (
  <Modal>
    <ModalContent>
      {!annotatedImage ? (
        <>
          <h3>Pré-visualização da Imagem</h3>
          {selectedImage && (
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Imagem Selecionada"
              width={1300}
              height={1300}
            />
          )}
          <div style={{ marginTop: '15px' }}>
            <Button onClick={handleImageSend}>Enviar</Button>
            <CloseButton onClick={closeModal}>X</CloseButton>
          </div>
        </>
      ) : (
        <>
          <h3>Resultado da Análise</h3>
          <AnnotatedImage src={annotatedImage} alt="Imagem Anotada" />
          <div style={{ marginTop: '15px' }}>
            <Button onClick={handleSendFailure}>Enviar Falha</Button>
            <Button onClick={closeModal}>Fechar</Button>
          </div>
        </>
      )}
    </ModalContent>
  </Modal>
)}


    </>
  );
};

export default Chatbot;

