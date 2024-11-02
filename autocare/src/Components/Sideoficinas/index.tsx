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
        <Link href="/Ordensrecebidas" legacyBehavior>
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
      <div className="lg:hidden w-full bg-black text-white">
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-semibold">Menu</h1>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={14} /> : <FiMenu size={14} />}
          </button>
        </div>

        {/* Links in Header for Small Screens */}
        {isOpen && (
          <div className="flex flex-col items-center bg-black w-full p-4">
            <Link href="/Ordensrecebidas" legacyBehavior>
              <a className="block text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center justify-center">
                <FiFileText size={24} />
              </a>
            </Link>
            <Link href="/Gestao" legacyBehavior>
              <a className="block text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 mb-2 transition duration-300 flex items-center justify-center">
                <FiSettings size={24} />
              </a>
            </Link>
            <Link href="/Garantia" legacyBehavior>
              <a className="block text-white text-lg py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center">
                <FiCheckSquare size={24} />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Side;
