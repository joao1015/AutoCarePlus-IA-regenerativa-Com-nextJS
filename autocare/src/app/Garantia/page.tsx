"use client";

import React, { useState, useEffect } from "react";
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
  FiDollarSign,
} from "react-icons/fi";

const GarantiaPage: React.FC = () => {
  const [garantias, setGarantias] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGarantiaIndex, setCurrentGarantiaIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGarantias = async () => {
      try {
        const response = await fetch("/api/gestao-garantias");
        const result = await response.json();
        console.log("Garantias recebidas:", result);

        if (response.ok) {
          setGarantias(result.garantias);
        } else {
          console.error("Erro ao buscar garantias:", result.error);
        }
      } catch (error) {
        console.error("Erro ao buscar garantias:", error);
      }
    };

    fetchGarantias();
  }, []);

  const openModal = (index: number) => {
    setCurrentGarantiaIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGarantiaIndex(null);
  };

  const handleDeleteGarantia = async () => {
    if (currentGarantiaIndex === null) return;
    const garantia = garantias[currentGarantiaIndex];

    try {
      const response = await fetch(`/api/gestao-garantias/${garantia.ID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Erro ao deletar garantia:", errorResponse);
        return;
      }

      console.log("Garantia deletada com sucesso.");

      // Remover a garantia do estado
      const updatedGarantias = garantias.filter((_, i) => i !== currentGarantiaIndex);
      setGarantias(updatedGarantias);

      closeModal();
    } catch (error) {
      console.error("Erro ao deletar garantia:", error);
    }
  };

  return (
    <div className="flex">
      <Side />
      <div className="flex-grow p-5">
        <div className="min-h-screen bg-white flex flex-col p-5">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
            Gestão de Garantias
          </h1>
          {garantias.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Não há garantias disponíveis no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {garantias.map((garantia, index) => (
                <div
                  key={garantia.NUMERO_ORDEM_SERVICO || index}
                  className="border rounded-lg shadow p-4"
                >
                  <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    <FiUser /> {garantia.CLIENTE_NOME || "Nome não disponível"}
                  </h2>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiMail /> <strong>Email:</strong>{" "}
                    <span className="max-w-xs md:max-w-sm overflow-hidden text-ellipsis whitespace-nowrap truncate">
                      {garantia.CLIENTE_EMAIL || "Email não disponível"}
                    </span>
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiPhone /> <strong>Telefone:</strong>{" "}
                    {garantia.CLIENTE_TELEFONE || "Telefone não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiHash /> <strong>Número da Ordem:</strong>{" "}
                    {garantia.NUMERO_ORDEM_SERVICO || "Número não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiSettings /> <strong>Peças:</strong>{" "}
                    {garantia.PECAS || "Peças não disponíveis"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiTool /> <strong>Modelo:</strong>{" "}
                    {garantia.MODELO || "Modelo não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiCalendar /> <strong>Ano:</strong>{" "}
                    {garantia.ANO || "Ano não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2 break-words">
                    <FiClipboard /> <strong>Diagnóstico/Falha:</strong>{" "}
                    {garantia.DIAGNOSTICO || "Diagnóstico não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiDollarSign /> <strong>Valor Final:</strong>{" "}
                    {garantia.VALOR_FINAL || "Valor não disponível"}
                  </p>
                  <p className="text-sm md:text-base flex items-center gap-2">
                    <FiCalendar /> <strong>Data da Garantia:</strong>{" "}
                    {garantia.DATA_GARANTIA
                      ? new Date(garantia.DATA_GARANTIA).toLocaleDateString()
                      : "Data não disponível"}
                  </p>
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => openModal(index)}
                      className="bg-red-600 text-white py-2 px-3 md:px-4 rounded hover:bg-red-800 transition-colors text-sm md:text-base"
                    >
                      Excluir
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
            contentLabel="Excluir Garantia"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              {currentGarantiaIndex !== null && garantias[currentGarantiaIndex] && (
                <>
                  <h2 className="text-xl font-bold mb-4">Excluir Garantia</h2>
                  <p className="mb-4">Tem certeza de que deseja excluir esta garantia?</p>
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={handleDeleteGarantia}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors"
                    >
                      Excluir
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
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GarantiaPage;
