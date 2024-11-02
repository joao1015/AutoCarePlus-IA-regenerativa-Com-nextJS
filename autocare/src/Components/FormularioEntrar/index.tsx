"use client"; // Adicione esta linha

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

        // Armazena as informações do usuário
        localStorage.setItem("usuarioLogado", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Exibe a mensagem de sucesso por 2 segundos antes de redirecionar
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
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full h-[65px] px-[15px] border border-gray-300 rounded-[20px] text-[20px] font-poppins font-medium bg-gray-200 placeholder-gray-500 box-border"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[40px] bg-[#10b981] text-white rounded-[10px] text-[20px] font-poppins font-medium cursor-pointer flex items-center justify-center mt-5 hover:bg-[#0056b3]"
          >
            Entrar
          </button>

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

          <p className="text-black text-[18px] font-poppins text-center mt-5">
            Não tem uma conta?{" "}
            <Link href="/SejaCredenciado" className="text-blue-500 underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;