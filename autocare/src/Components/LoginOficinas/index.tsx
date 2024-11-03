"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Página de Login da Oficina
function OficinasLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const isAdmin = email === 'Admin@admin.com' && senha === '87654321';

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAdmin) {
      setErrorMessage('');
      setSuccessMessage('Acesso concedido para cadastro de oficina!');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push('/cadastro-oficina');
      }, 2000);
    } else {
      setSuccessMessage('');
      setShowSuccessMessage(false);
      setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.');
    }
  };

  const handleCadastroClick = () => {
    if (isAdmin) {
      setErrorMessage('');
      setSuccessMessage('Acesso concedido para cadastro de oficina!');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push('/ListaOficina');
      }, 2000);
    } else {
      setErrorMessage('Somente administradores têm permissão para acessar o cadastro de oficinas.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Acessar Conta</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="senha" className="block text-lg font-medium mb-2">Senha</label>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} />
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {showSuccessMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Logar
          </button>
          <button
            type="button"
            onClick={handleCadastroClick}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Cadastro de Oficina
          </button>
        </div>
      </form>
    </div>
  );
}

export default OficinasLogin;
