"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OficinasLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const oficinasFixas = [
    { id: 1, nome: 'Oficina AutoTech', email: 'oficina1@example.com', senha: '123' },
    { id: 2, nome: 'Oficina Mecânica Rápida', email: 'oficina2@example.com', senha: '123' },
    { id: 3, nome: 'Oficina SuperCar', email: 'oficina3@example.com', senha: '123' },
  ];

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const oficinaValida = oficinasFixas.find(
      (oficina) => oficina.email === email && oficina.senha === senha
    );

    if (oficinaValida) {
      setErrorMessage('');
      setSuccessMessage(`Login bem-sucedido! Bem-vindo à ${oficinaValida.nome}`);
      setShowSuccessMessage(true);

      localStorage.setItem('oficinaId', String(oficinaValida.id));

      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push('/OficinaLogada');
      }, 3000);
    } else {
      setSuccessMessage('');
      setShowSuccessMessage(false);
      setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Acessar Conta</h2>
        
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg text-gray-700"
          />
        </div>

        <div className="mb-4 w-full relative">
          <label htmlFor="senha" className="block text-lg font-medium mb-2 text-gray-800">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg text-gray-700"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {showSuccessMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-transform transform duration-200 hover:translate-y-[-2px]"
        >
          Logar
        </button>
      </form>
    </div>
  );
};

export default OficinasLogin;
