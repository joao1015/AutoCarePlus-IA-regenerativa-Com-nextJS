"use client"; // Certifique-se de que o Sidebar é tratado como um Client Component

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Importando o componente Image do Next.js
import icone from '@/Components/InteracaoIA/Imagens/ia.png';  // Avatar do Chatbot
import userAvatar from '@/Components/InteracaoIA/Imagens/usuario.png';  // Avatar do Usuário
import { useRouter } from 'next/navigation';

// Tipos para o objeto de resposta
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

// Funções de estilo global e animação com Tailwind classes adicionadas diretamente
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
      const response = await axios.post<WatsonResponse>(
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
        .map((item: GenericItem) => (item.response_type === 'text' && item.text ? item.text : ''))
        .filter((text) => text)
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
    router.push(`/Agendamendo?lastMessage=${encodeURIComponent(lastMessage)}`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 border-2 border-black rounded-lg shadow-lg bg-white h-[80vh] overflow-hidden">
      <header className="w-full bg-blue-900 text-white font-bold text-xl p-4 text-center">AutoCarePlus</header>
      <div ref={chatBodyRef} className="flex-1 w-full overflow-y-auto p-4 bg-gray-100 flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center ${
              msg.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <Image
              src={msg.isUser ? userAvatar : icone}
              alt={msg.isUser ? 'User Avatar' : 'Chatbot Avatar'}
              width={50}
              height={50}
              className={`rounded-full ${msg.isUser ? 'ml-4' : 'mr-4'}`}
            />
            <div
              className={`p-3 rounded-lg border border-black max-w-[70%] ${
                msg.isUser ? 'bg-green-100 text-black' : 'bg-red-100 text-black'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}
            />
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center p-4 bg-white border-t border-gray-200"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
