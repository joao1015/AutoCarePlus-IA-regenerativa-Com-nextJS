"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Image from 'next/image';
import icone from './Imagens/ia.png';  // Avatar do Chatbot
import userAvatar from './Imagens/usuario.png';  // Avatar do Usuário
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
  margin-top: -20cm;
`;

const ChatHeader = styled.div`
  width: 100%;
  background-color: #002cbb;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  padding: 17px;
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

const Avatar = styled(Image)<{ isUser: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: ${({ isUser }) => (isUser ? '0' : '10px')};
  margin-left: ${({ isUser }) => (isUser ? '10px' : '0')};
`;

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; name: string }[]>([]);
  const [context, setContext] = useState<any>({});
  const [canTriggerNextStep, setCanTriggerNextStep] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); 

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms)); 

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToWatson = async (text: string) => {
    try {
      const response = await axios.post(
        'https://api.us-south.assistant.watson.cloud.ibm.com/v1/workspaces/8a8032d0-e893-47de-a586-0398d3a35098/message?version=2021-06-14',
        {
          input: { text },
          context,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa('apikey:r_suOM3Fo1tcsPUKukbkHjkltOBjiJGYFdPx2mtIHb-8')}`,
          },
        }
      );

      setContext(response.data.context);

      const responseText = response.data.output.generic
        .map((item: any) => item.text || '')
        .join(' ')
        .replace(/[{}[\]]/g, '')
        .replace(/\\n/g, '\n')
        .replace(/['"]/g, '');

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseText || 'Sem resposta', isUser: false, name: 'AutoCarePlus' },
      ]);

      if (responseText.includes('Gostaria de agendar o serviço com uma oficina credenciada próxima a você?')) {
        setCanTriggerNextStep(true);
      }

      if (canTriggerNextStep && text.toLowerCase().includes('sim')) {
        await delay(3000);
        handleNext();
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem para o chatbot:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Ocorreu um erro, tente novamente.', isUser: false, name: 'Chatbot' },
      ]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true, name: 'Usuário' },
    ]);

    await sendMessageToWatson(message);
    setMessage('');
  };

  const handleNext = () => {
    const lastMessage = messages.at(-1)?.text || '';
    router.push(`/Orcamentos?lastMessage=${encodeURIComponent(lastMessage)}`);
  };

  return (
    <>
      <GlobalStyle />
      <ChatContainer>
        <ChatHeader>AutoCarePlus</ChatHeader>
        <ChatBody ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isUser={msg.isUser}>
              <Avatar
                src={msg.isUser ? userAvatar : icone}
                alt={msg.isUser ? 'User Avatar' : 'Chatbot Avatar'}
                isUser={msg.isUser}
              />
              <Message isUser={msg.isUser} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </MessageContainer>
          ))}
        </ChatBody>
        <ChatInputContainer>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e); 
              }
            }}
            placeholder="Digite sua mensagem..."
            aria-label="Campo de mensagem"
          />
          <Button onClick={handleSubmit} aria-label="Enviar mensagem">Enviar</Button>
        </ChatInputContainer>
      </ChatContainer>
    </>
  );
};

export default Chatbot;
