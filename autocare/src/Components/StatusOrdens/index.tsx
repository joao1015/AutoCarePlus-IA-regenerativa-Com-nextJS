"use client";

import React, { useState } from 'react';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '../SideBar';

const StatusOrdens = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [emailCliente, setEmailCliente] = useState('');
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFilter = async () => {
    setError('');
    setShowResults(false);

    if (!emailCliente) {
      setError('Por favor, insira seu e-mail.');
      return;
    }

    if (!isValidEmail(emailCliente)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const response = await fetch(`/api/StatusApi?email=${emailCliente}`, {
        method: 'GET',
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(result.status);
        setShowResults(true);
      } else {
        setError(result.error || 'Erro ao buscar as ordens.');
      }
    } catch (error) {
      console.error('Erro ao buscar ordem de serviço:', error);
      setError('Erro ao buscar a ordem de serviço.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f0f2f5] font-roboto">
      <div className="w-full md:w-auto bg-black">
        <Sidebar />
      </div>
      <main className="flex-1 flex items-center justify-center p-5">
        <div className="w-full max-w-[700px] bg-white p-10 rounded-[12px] shadow-lg">
          <h2 className="text-[#2c3e50] mb-[30px] text-[1.8rem] text-center">
            Monitoramento de Status da Ordem de Serviço
          </h2>
          <div className="flex flex-col">
            <div className="relative mb-[20px]">
              <FiSearch size={20} className="absolute top-[12px] left-[14px] text-[#95a5a6]" />
              <input
                type="email"
                placeholder="Digite seu email"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                className="w-full pl-[40px] pr-[12px] pt-[12px] pb-[12px] border border-[#dcdfe3] rounded-lg text-[1rem] text-[#2c3e50] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/20 bg-white text-black"
              />
            </div>
            <button
              onClick={handleFilter}
              className="bg-[#3498db] text-white px-0 py-[14px] rounded-lg cursor-pointer text-[1rem] font-medium mt-[10px] transition-colors duration-300 ease-in-out hover:bg-[#2980b9]"
            >
              Buscar Status
            </button>
          </div>

          {error && (
            <p className="text-[#e74c3c] mt-[15px] flex items-center text-[0.9rem]">
              <FiAlertCircle size={18} className="mr-2" />
              {error}
            </p>
          )}

          {showResults && status && (
            <div className="bg-[#ecf0f1] p-[20px] mt-[30px] rounded-[12px] border border-[#dcdfe3]">
              <span className="font-semibold text-[#2c3e50] block mb-[8px] text-[1rem]">
                Status da Ordem:
              </span>
              <span className="text-[#7f8c8d] text-[1rem]">{status}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StatusOrdens;
