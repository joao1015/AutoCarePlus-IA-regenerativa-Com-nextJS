"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

<<<<<<< HEAD
// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const LoginContainer = styled.div`
  background-color: #f3f4f6;
  width: 70%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(176, 30, 30, 0.1);
  border-radius: 8px;
  margin: auto;
  margin-top: 50px;
  color: black;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 26px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 65px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  background-color: #f0f0f0;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }
`;

const EyeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 67%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #333;
  font-size: 1.5em; /* Aumenta o tamanho do ícone para combinar com a altura do input */
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #10b981;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkStyled = styled.p`
  color: #000000;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  text-align: center;
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

=======
>>>>>>> main
function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();

        setErrorMessage("");
        setSuccessMessage("Login bem-sucedido! Bem-vindo à AutoCarePlus");

        localStorage.setItem("usuarioLogado", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          router.push("LogadoCliente");
        }, 2500);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Falha ao fazer login");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div
        className="bg-gray-100 w-[70%] max-w-[600px] p-5 mx-auto mt-[50px] text-black rounded-lg"
        style={{ boxShadow: "0 4px 8px rgba(176, 30, 30, 0.1)" }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white p-5 rounded-lg"
          style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <h2 className="mb-5 text-[26px] font-poppins font-semibold text-center">
            Acesse sua Conta
          </h2>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-[20px] font-poppins font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[65px] px-[15px] border border-gray-300 rounded-[20px] text-[20px] font-poppins font-medium bg-gray-200 placeholder-gray-500 box-border"
              placeholder="Digite seu email"
            />
<<<<<<< HEAD
          </FormGroup>
          <FormGroup>
            <Label htmlFor="senha">Senha</Label>
            <Input
              type={showPassword ? "text" : "password"}
=======
          </div>
          <div className="mb-5">
            <label
              htmlFor="senha"
              className="block mb-2 text-[20px] font-poppins font-medium"
            >
              Senha
            </label>
            <input
              type="password"
>>>>>>> main
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full h-[65px] px-[15px] border border-gray-300 rounded-[20px] text-[20px] font-poppins font-medium bg-gray-200 placeholder-gray-500 box-border"
              placeholder="Digite sua senha"
            />
<<<<<<< HEAD
            <EyeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </FormGroup>
          <LoginButton type="submit">Entrar</LoginButton>
=======
          </div>
          <button
            type="submit"
            className="w-full h-[40px] bg-[#10b981] text-white rounded-[10px] text-[20px] font-poppins font-medium cursor-pointer flex items-center justify-center mt-5 hover:bg-[#0056b3]"
          >
            Entrar
          </button>
>>>>>>> main

          {errorMessage && (
            <p className="text-red-500 text-[16px] mt-[10px] text-center">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-[16px] mt-[10px] text-center">
              {successMessage}
            </p>
          )}

<<<<<<< HEAD
          <LinkStyled>
            Não tem uma conta? <Link href="/SejaCredenciado">Cadastre-se</Link>
          </LinkStyled>
        </LoginForm>
      </LoginContainer>
    </PageContainer>
=======
          <p className="text-black text-[18px] font-poppins text-center mt-5">
            Não tem uma conta?{" "}
            <Link href="/SejaCredenciado" className="text-blue-500 underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
>>>>>>> main
  );
}

export default Login;
