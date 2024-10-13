"use client"; // Deve estar no topo do arquivo

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter do Next.js
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #F3F4F6;
  padding: 20px;
`;

const Balao = styled.form`
  background-color: #ffffff;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 26px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;
  color: black;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #333;
  text-align: left;
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 30px);
  height: 50px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    color: #999;
    opacity: 0.8;
  }

  &:focus {
    border-color: #0056b3;
  }
`;

const LogarButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  width: 60%;
  max-width: 200px;
  height: 50px;
  background-color: #10B981;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

const OficinasLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter(); // Use useRouter ao invés de useNavigate

  // Definição das oficinas com seus respectivos IDs
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

      // Armazenar o oficinaId no localStorage
      localStorage.setItem('oficinaId', String(oficinaValida.id));

      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push('/Pagina_da_credenciada'); // Navegar após 3 segundos
      }, 3000);
    } else {
      setSuccessMessage('');
      setShowSuccessMessage(false);
      setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <PageContainer>
      <Balao onSubmit={handleLogin}>
        <Title>Acessa conta - Preencha seus dados da Credenciada</Title>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="senha">Senha</Label>
          <Input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </FormGroup>
        <LogarButton type="submit">Logar</LogarButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {showSuccessMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </Balao>
    </PageContainer>
  );
};

export default OficinasLogin;
