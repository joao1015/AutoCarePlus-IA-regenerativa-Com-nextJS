"use client"; // Adicione esta linha

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function FormularioCadastroCliente() {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value;
    setCep(cep);

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError(true);
          setMessage('CEP não encontrado.');
          return;
        }

        setLogradouro(data.logradouro || '');
        setEstado(data.uf || '');
        setCidade(data.localidade || '');
        setError(false);
        setMessage(null);
      } catch (error) {
        setError(true);
        setMessage('Erro ao buscar CEP.');
      }
    }
  };

  const handleNext = () => {
    if (step === 6) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const novoUsuario = {
      nome,
      email,
      senha,
      logradouro,
      numero,
      cidade,
      estado,
    };

    try {
      const response = await fetch('../../app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Conta criada com sucesso!');
        setError(false);

        localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        router.push('/entrar');
      } else {
        setError(true);
        setMessage(data.error || 'Erro ao criar a conta.');
      }
    } catch (error) {
      setError(true);
      setMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="w-full h-full mt-20"> 
      <div className="py-12 px-4 sm:px-6 lg:px-8" style={{ marginLeft: '13cm' }}>
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Bem-vindo à nossa plataforma!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha suas informações abaixo para criar uma conta e aproveitar todos os nossos serviços com facilidade e segurança.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 w-4/5 max-w-xl p-6 shadow-lg rounded-lg mx-auto font-roboto" style={{ marginTop: '-1cm' }}>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Crie sua Conta Gratuita</h2>
          
          {message && (
            <p className={`text-center text-lg ${error ? 'text-red-600' : 'text-green-600'} mb-4`}>
              {message}
            </p>
          )}

          {/* Etapa 1: Nome */}
          {step === 1 && (
            <div className="mb-6">
              <label htmlFor="nome" className="block text-lg font-medium mb-2 text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!nome}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Etapa 2: Email */}
          {step === 2 && (
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!email}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Etapa 3: CEP */}
          {step === 3 && (
            <div className="mb-6">
              <label htmlFor="cep" className="block text-lg font-medium mb-2 text-gray-700">
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={cep}
                onChange={handleCepChange}
                maxLength={8}
                required
                placeholder="00000000"
                className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!cep}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Etapa 4: Logradouro */}
          {step === 4 && (
            <div className="mb-6">
              <label htmlFor="logradouro" className="block text-lg font-medium mb-2 text-gray-700">
                Logradouro
              </label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                required
                className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!logradouro}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Etapa 5: Número, Estado, Cidade */}
          {step === 5 && (
            <>
              <div className="mb-6">
                <label htmlFor="numero" className="block text-lg font-medium mb-2 text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                  className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="estado" className="block text-lg font-medium mb-2 text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                  className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="cidade" className="block text-lg font-medium mb-2 text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                  className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!numero || !estado || !cidade}
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {/* Etapa 6: Senha */}
          {step === 6 && (
            <div className="mb-6">
              <label htmlFor="senha" className="block text-lg font-medium mb-2 text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full h-16 px-4 border border-gray-300 rounded-lg text-lg font-medium bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={!senha}
                >
                  Concluir
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormularioCadastroCliente;
