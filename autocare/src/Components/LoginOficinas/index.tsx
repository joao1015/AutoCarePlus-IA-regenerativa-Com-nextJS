"use client"; // Deve estar no topo do arquivo

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
        router.push("/OficinaLogada");
      }, 2000);
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
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center border-t-4 border-blue-600"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 font-roboto">Área de Login</h2>

        <div className="mb-5 w-full">
          <label htmlFor="email" className="block text-lg font-semibold mb-2 text-gray-700 font-roboto">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border  rounded-lg focus:outline-none focus:border-blue-600 text-lg font-roboto text-black bg-white placeholder-gray-400 shadow-sm"
            placeholder="Digite seu email"
          />
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="senha" className="block text-lg font-semibold mb-2 text-gray-700 font-roboto">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg font-roboto text-black bg-white placeholder-gray-400 shadow-sm"
            placeholder="Digite sua senha"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4 font-semibold">{errorMessage}</p>}
        {showSuccessMessage && <p className="text-green-500 text-center mb-4 font-semibold">{successMessage}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all transform duration-200 hover:scale-105 shadow-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default OficinasLogin;
