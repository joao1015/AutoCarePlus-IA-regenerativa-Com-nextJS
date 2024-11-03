"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const OficinasLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  // Verifica se o login é de administrador
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
      setErrorMessage('Somente administradores têm permissão para acessar o cadastro de oficinas. Por favor, insira as credenciais corretas.');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 w-full max-w-md flex flex-col items-center border border-gray-300 rounded-lg shadow-md"
      >
        <h2 className="mb-5 text-2xl font-semibold text-textDark text-center">
          Acessa conta - Preencha seus dados da Credenciada
        </h2>
        <div className="mb-5 w-full flex flex-col items-center relative">
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-textGray w-full text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 border border-border rounded-md text-lg bg-gray-200 text-textGray outline-none focus:border-blue-700"
            placeholder="Insira seu email"
          />
        </div>
        <div className="mb-5 w-full flex flex-col items-center relative">
          <label htmlFor="senha" className="block mb-2 text-lg font-medium text-textGray w-full text-left">
            Senha
          </label>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full h-12 px-4 border border-border rounded-md text-lg bg-gray-200 text-textGray outline-none focus:border-blue-700"
            placeholder="Insira sua senha"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-4 top-10 bg-transparent border-none text-lg text-textGray"
          >
            <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="flex gap-4 mt-5 w-full justify-center">
          <button
            type="submit"
            className="w-1/2 max-w-xs h-12 bg-primary text-white font-semibold rounded-md hover:bg-green-600 transform hover:translate-y-[-3px] transition-all duration-200"
          >
            Logar
          </button>
          <button
            type="button"
            onClick={handleCadastroClick}
            className="w-1/2 max-w-xs h-12 bg-secondary text-white font-semibold rounded-md hover:bg-blue-600 transform hover:translate-y-[-3px] transition-all duration-200"
          >
            Cadastro de Oficina
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-lg mt-4 text-center">{errorMessage}</p>}
        {showSuccessMessage && <p className="text-green-500 text-lg mt-4 text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default OficinasLogin;
