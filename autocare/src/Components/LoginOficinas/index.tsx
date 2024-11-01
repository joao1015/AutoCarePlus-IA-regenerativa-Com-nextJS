"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
  position: relative;
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

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 20px;
  top: 48px;
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  outline: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  width: 45%;
  max-width: 220px;
  height: 45px;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const LogarButton = styled(Button)`
  background-color: #10B981;

  &:hover {
    background-color: #059669;
  }
`;

const CadastroButton = styled(Button)`
  background-color: #3B82F6;

  &:hover {
    background-color: #2563EB;
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
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <TogglePasswordButton
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} />
          </TogglePasswordButton>
        </FormGroup>
        <ButtonGroup>
          <LogarButton type="submit">Logar</LogarButton>
          <CadastroButton type="button" onClick={handleCadastroClick}>
            Cadastro de Oficina
          </CadastroButton>
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {showSuccessMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </Balao>
    </PageContainer>
  );
};

export default OficinasLogin;

