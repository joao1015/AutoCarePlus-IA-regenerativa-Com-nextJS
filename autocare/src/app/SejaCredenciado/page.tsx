import Cabecalho from '@/Components/Cabecalho';
import Formulario from '@/Components/FormularioCadastrocliente';
import React from 'react';

function Page() {
  return (
    <div>
      <div><Cabecalho></Cabecalho></div>

      <div className="flex items-center justify-center w-full" style={{ marginTop: '-7rem' }}>
        <Formulario />
      </div>

      <div><Cabecalho></Cabecalho></div>
    </div>
  );
}

export default Page;
