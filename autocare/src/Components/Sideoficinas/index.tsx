"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiFileText, FiSettings, FiCheckSquare } from 'react-icons/fi';

function Side() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:w-60 w-40 bg-black text-white shadow-lg">
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex flex-col h-full p-5">
        <Link href="/ordensrecebidas" legacyBehavior>
          <a className="block w-full text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center gap-2">
            <FiFileText /> Orçamentos Recebidos
          </a>
        </Link>
        <Link href="/Gestao" legacyBehavior>
          <a className="block w-full text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center gap-2">
            <FiSettings /> Gestão de Orçamentos
          </a>
        </Link>
        <Link href="/Garantia" legacyBehavior>
          <a className="block w-full text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-2">
            <FiCheckSquare /> Ordens Finalizadas
          </a>
        </Link>
      </div>

      {/* Header for Small Screens */}
      <div className="lg:hidden w-full bg-black text-white mt-[5px]">
        <div className="flex items-center justify-between px-2 py-1">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Links in Header for Small Screens */}
      {isOpen && (
        <div className="flex flex-col items-start bg-black w-full p-2">
          <Link href="/ordensrecebidas" legacyBehavior>
            <a className="block text-white text-lg py-2 px-2 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center">
              <FiFileText size={24.1} />
            </a>
          </Link>
          <Link href="/Gestao" legacyBehavior>
            <a className="block text-white text-lg py-2 px-2 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center">
              <FiSettings size={24} />
            </a>
          </Link>
          <Link href="/Garantia" legacyBehavior>
            <a className="block text-white text-lg py-2 px-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
              <FiCheckSquare size={24} />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Side;
