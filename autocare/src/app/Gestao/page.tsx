"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Side from "@/Components/Sideoficinas"; // Certifique-se de que o caminho está correto
import Modal from "react-modal";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHash,
  FiSettings,
  FiTool,
  FiCalendar,
  FiClipboard,
  FiCheckSquare,
} from "react-icons/fi";

// Definição da interface DataToSend
interface DataToSend {
  isDiagnosticoCorrect: boolean | null;
  newDiagnostico?: string;
  newPecas?: string;
  newValorFinal?: string;
}

const GestaoOrdens: React.FC = () => {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState<number | null>(null);
  const [isDiagnosticoCorrect, setIsDiagnosticoCorrect] = useState<boolean | null>(null);
  const [newDiagnostico, setNewDiagnostico] = useState("");
  const [newPecas, setNewPecas] = useState("");
  const [newValorFinal, setNewValorFinal] = useState("");

  const router = useRouter();

  // Buscar ordens de serviço
  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await fetch("/api/gestao-ordens");
        const result = await response.json();
        console.log("Ordens de serviço recebidas:", result);

        if (response.ok) {
          setOrdens(result.ordens);
          const initialStatus = result.ordens.reduce(
            (acc: any, ordem: any, index: number) => {
              acc[index] = ordem.STATUS_ORDEM || "Em andamento";
              return acc;
            },
            {}
          );
          setSelectedStatus(initialStatus);
        } else {
          console.error("Erro ao buscar ordens de serviço:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };

    fetchOrdens();
  }, []);

  const openModal = (index: number) => {
    setCurrentOrderIndex(index);
    setIsModalOpen(true);
    setIsDiagnosticoCorrect(null);
    setNewDiagnostico("");
    setNewPecas("");
    setNewValorFinal("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrderIndex(null);
  };

  // Atualizar o status da ordem
  const handleUpdateStatus = async (index: number) => {
    const ordem = ordens[index];
    const newStatus = selectedStatus[index];

    try {
      const response = await fetch(`/api/gestao-ordens/${ordem.ID}/concluir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_ordem: newStatus }),
      });

      if (response.ok) {
        console.log("Status atualizado com sucesso.");
      } else {
        console.error("Erro ao atualizar status:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao atualizar status da ordem:", error);
    }
  };

  // Finalizar a ordem de serviço
  const handleFinalizeOrder = async () => {
    if (currentOrderIndex === null) return;
    const ordem = ordens[currentOrderIndex];

    const dataToSend: DataToSend = {
      isDiagnosticoCorrect,
    };

    if (!isDiagnosticoCorrect) {
      dataToSend.newDiagnostico = newDiagnostico;
      dataToSend.newPecas = newPecas;
      dataToSend.newValorFinal = newValorFinal;
    }

    try {
      const response = await fetch(`/api/gestao-ordens/${ordem.ID}/finalizar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao finalizar ordem de serviço:", errorResponse);
        return;
      }

      console.log("Ordem de serviço finalizada com sucesso.");

      // Fechar o modal e redefinir currentOrderIndex antes de atualizar o estado
      closeModal();

      // Remover a ordem do estado
      const updatedOrdens = ordens.filter((_, i) => i !== currentOrderIndex);
      setOrdens(updatedOrdens);
    } catch (error) {
      console.error("Erro ao finalizar ordem de serviço:", error);
    }
  };

  const handleDiagnosticoResponse = (isCorrect: boolean) => {
    setIsDiagnosticoCorrect(isCorrect);
  };

  return (
    <div className="flex">
      <Side />
      <div className="flex-grow p-5">
        <div className="min-h-screen bg-white flex flex-col p-5">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
            Gestão de Ordens de Serviço
          </h1>
          {ordens.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Não há ordens de serviço disponíveis no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {ordens.map((ordem, index) => (
                <div key={ordem.NUMERO_ORDEM_SERVICO || index} className="border rounded-lg shadow p-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    <FiUser /> {ordem.CLIENTE_NOME || "Nome não disponível"}
                  </h2>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiMail /> <strong>Email:</strong>{" "}
                    <span className="max-w-xs md:max-w-sm overflow-hidden text-ellipsis whitespace-nowrap truncate">
                      {ordem.CLIENTE_EMAIL || "Email não disponível"}
                    </span>
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiPhone /> <strong>Telefone:</strong> {ordem.CLIENTE_TELEFONE || "Telefone não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiHash /> <strong>Número da Ordem:</strong> {ordem.NUMERO_ORDEM_SERVICO || "Número não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiSettings /> <strong>Peças:</strong> {ordem.PECAS || "Peças não disponíveis"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiTool /> <strong>Modelo:</strong> {ordem.MODELO || "Modelo não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiCalendar /> <strong>Ano:</strong> {ordem.ANO || "Ano não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiClipboard /> <strong>Diagnóstico/Falha:</strong> {ordem.DIAGNOSTICO || "Diagnóstico não disponível"}
                  </p>
                  <div className="text-sm md:text-base flex items-center gap-2 mt-2">
                    <strong>Status:</strong>
                    <select
                      value={selectedStatus[index] || ordem.STATUS_ORDEM || "Em andamento"}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setSelectedStatus((prev) => ({
                          ...prev,
                          [index]: newStatus,
                        }));
                      }}
                      className="ml-2 p-1 border rounded"
                    >
                      <option value="Em andamento">Em andamento</option>
                      <option value="Aguardando Peças">Aguardando Peças</option>
                      <option value="Aguardando Chegada do Carro">
                        Aguardando Chegada do Carro
                      </option>
                      <option value="Concluída">Concluída</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => handleUpdateStatus(index)}
                      className="bg-blue-600 text-white py-2 px-3 md:px-4 rounded hover:bg-blue-800 transition-colors text-sm md:text-base"
                    >
                      Atualizar Status
                    </button>
                    <button
                      onClick={() => openModal(index)}
                      className="bg-green-600 text-white py-2 px-3 md:px-4 rounded hover:bg-green-800 transition-colors text-sm md:text-base"
                    >
                      Finalizar Ordem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Finalizar Ordem"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              {currentOrderIndex !== null && ordens[currentOrderIndex] && (
                <>
                  <h2 className="text-xl font-bold mb-4">Finalizar Ordem</h2>
                  <p className="mb-4">
                    <strong>Diagnóstico/Falha:</strong> {ordens[currentOrderIndex].DIAGNOSTICO || "Não disponível"}
                  </p>
                  {isDiagnosticoCorrect === null ? (
                    <>
                      <p className="mb-4">Esta falha corresponde à verdadeira falha?</p>
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => handleDiagnosticoResponse(true)}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => handleDiagnosticoResponse(false)}
                          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors"
                        >
                          Não
                        </button>
                      </div>
                    </>
                  ) : isDiagnosticoCorrect ? (
                    <>
                      <p className="mb-4">Deseja finalizar a ordem?</p>
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={handleFinalizeOrder}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
                        >
                          Finalizar
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Verdadeira Falha:
                      </label>
                      <input
                        type="text"
                        value={newDiagnostico}
                        onChange={(e) => setNewDiagnostico(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                      />
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Peças a serem trocadas:
                      </label>
                      <input
                        type="text"
                        value={newPecas}
                        onChange={(e) => setNewPecas(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                      />
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Valor Final:
                      </label>
                      <input
                        type="text"
                        value={newValorFinal}
                        onChange={(e) => setNewValorFinal(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                      />
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={handleFinalizeOrder}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
                        >
                          Finalizar
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GestaoOrdens;
