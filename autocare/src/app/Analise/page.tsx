"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHash,
  FiSettings,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

const AdministrarOficinas: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOficina, setCurrentOficina] = useState<any>({
    id: null,
    empresa: "",
    contato: "",
    telefone: "",
    email: "",
    cidade: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const nextElement = document.getElementById("__next");
    if (typeof window !== "undefined" && nextElement) {
      Modal.setAppElement(nextElement);
    }
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais inválidas! Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/oficinas`);
        const result = await response.json();
        if (response.ok) {
          setOficinas(result);
        } else {
          console.error("Erro ao buscar oficinas:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar oficinas:", error);
      }
    };

    if (isAuthenticated) {
      fetchOficinas();
    }
  }, [isAuthenticated, apiUrl]);

  const openModal = (oficina?: any) => {
    if (oficina) {
      setIsEditMode(true);
      setCurrentOficina(oficina);
    } else {
      setIsEditMode(false);
      setCurrentOficina({
        id: null,
        empresa: "",
        contato: "",
        telefone: "",
        email: "",
        cidade: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOficina({
      id: null,
      empresa: "",
      contato: "",
      telefone: "",
      email: "",
      cidade: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentOficina((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/oficinas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOficina),
      });

      if (response.ok) {
        setOficinas((prevOficinas) => [
          ...prevOficinas,
          { ...currentOficina, id: prevOficinas.length + 1 }
        ]);
        alert("Oficina adicionada com sucesso!");
        closeModal();
      } else {
        const result = await response.json();
        console.error("Erro ao criar oficina:", result.error);
      }
    } catch (error) {
      console.error("Erro ao criar oficina:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOficina.id) {
      console.error("ID da oficina está undefined. Não é possível atualizar.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/oficinas/${currentOficina.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOficina),
      });

      const result = await response.json();
      if (response.ok) {
        setOficinas((prevOficinas) =>
          prevOficinas.map((oficina) =>
            oficina.id === currentOficina.id ? { ...currentOficina } : oficina
          )
        );
        alert("Oficina atualizada com sucesso!");
        closeModal();
      } else {
        console.error("Erro ao atualizar oficina:", result.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar oficina:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) {
      console.error("ID da oficina está undefined. Não é possível excluir.");
      return;
    }

    if (!confirm("Tem certeza de que deseja excluir esta oficina?")) return;

    try {
      const response = await fetch(`${apiUrl}/api/oficinas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOficinas(oficinas.filter((oficina) => oficina.id !== id));
        alert("Oficina excluída com sucesso!");
      } else {
        const result = await response.json();
        console.error("Erro ao excluir oficina:", result.error);
      }
    } catch (error) {
      console.error("Erro ao excluir oficina:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Login do Administrador</h2>
        <div className="w-80 bg-white p-6 rounded shadow-md">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-5">
        
        {/* Texto de introdução para a administração de oficinas */}
        <div className="bg-white p-5 mb-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bem-vindo ao Painel de Administração de Oficinas!</h2>
          <p className="text-gray-700 mb-2">
            Neste painel, você pode gerenciar todas as oficinas registradas na nossa plataforma. Aqui, administradores têm acesso às seguintes funcionalidades:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-2">
            <li><strong>Adicionar Nova Oficina</strong>: Cadastre uma nova oficina fornecendo informações completas, como nome da empresa, telefone de contato, e-mail e localização.</li>
            <li><strong>Editar Informações da Oficina</strong>: Mantenha os dados das oficinas sempre atualizados.</li>
            <li><strong>Excluir Oficina</strong>: Caso uma oficina precise ser removida, use a opção "Excluir" ao lado do cadastro. Confirme a exclusão quando solicitado.</li>
          </ul>
          <p className="text-gray-700 mb-2">
            <strong>Regras de Administração:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>A atualização e remoção de oficinas devem ser realizadas com atenção, pois informações incorretas podem afetar a experiência dos clientes.</li>
            <li>Antes de excluir uma oficina, verifique se não há serviços agendados ou pendentes.</li>
            <li>Certifique-se de que todas as informações inseridas estão precisas e completas.</li>
          </ul>
          <p className="text-gray-700">
            Use os recursos deste painel para manter um cadastro de oficinas atualizado, confiável e acessível para todos os usuários da plataforma!
          </p>
        </div>

        <div className="bg-white p-5">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
              Administrar Oficinas
            </h1>
            <button
              onClick={() => openModal()}
              className="flex items-center bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-900 transition-colors text-sm md:text-base"
            >
              <FiPlus className="mr-2" /> Adicionar Oficina
            </button>
          </div>

          {oficinas.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Não há oficinas disponíveis no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {oficinas.map((oficina) => (
                <div
                  key={oficina.id}
                  className="border rounded-lg shadow p-4 flex flex-col"
                >
                  <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    <FiUser /> {oficina.empresa}
                  </h2>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiMail /> {oficina.email}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiPhone /> {oficina.telefone}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiHash /> {oficina.contato}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiSettings /> {oficina.cidade}
                  </p>
                  <div className="mt-auto flex gap-2 justify-end">
                    <button
                      onClick={() => openModal(oficina)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-800 transition-colors text-sm"
                    >
                      <FiEdit className="inline mr-1" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(oficina.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800 transition-colors text-sm"
                    >
                      <FiTrash2 className="inline mr-1" /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Gerenciar Oficina"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {isEditMode ? "Editar Oficina" : "Adicionar Oficina"}
                </h2>
                <button onClick={closeModal}>
                  <FiX size={20} />
                </button>
              </div>
              <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={currentOficina.empresa}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contato
                  </label>
                  <input
                    type="text"
                    name="contato"
                    value={currentOficina.contato}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={currentOficina.telefone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={currentOficina.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    value={currentOficina.cidade}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-900 transition-colors text-sm"
                  >
                    {isEditMode ? "Atualizar" : "Adicionar"}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdministrarOficinas;
