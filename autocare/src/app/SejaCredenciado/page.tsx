import Formulario from '@/Components/FormularioCadastrocliente';
import React from 'react';

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 flex flex-col items-center">
      {/* Seção da frase de boas-vindas */}
      

      <div className="flex items-center justify-center w-full" style={{ marginTop: '-7rem' }}>
        <Formulario />
      </div>

      
    </div>
  );
}

export default Page;
