import React from 'react';

const ListaDeOficinas = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {/* Título da Página */}
      <h2 className="text-2xl font-semibold mt-5">Lista de Oficinas Cadastradas</h2>

      {/* Filtros e Botão de Nova Oficina */}
      <div className="flex items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Filtrar Oficina"
          className="p-2 border rounded-md w-1/4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Oficina</button>
        <input
          type="text"
          placeholder="Filtrar Cidade"
          className="p-2 border rounded-md w-1/4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Cidade</button>
        <input
          type="text"
          placeholder="Filtrar Segmento"
          className="p-2 border rounded-md w-1/4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Segmento</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Nova Oficina</button>
      </div>

      {/* Tabela de Oficinas */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Empresa</th>
              <th className="p-4 text-left">Contato</th>
              <th className="p-4 text-left">Telefone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Cidade</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Exemplo de dados estáticos */}
            {[
              { id: 1, empresa: 'Oficina A', contato: 'João', telefone: '12345678', email: 'joao@oficinaa.com', cidade: 'São Paulo' },
              { id: 2, empresa: 'Oficina B', contato: 'Maria', telefone: '87654321', email: 'maria@oficinab.com', cidade: 'Rio de Janeiro' },
            ].map((oficina) => (
              <tr key={oficina.id} className="border-b">
                <td className="p-4">{oficina.id}</td>
                <td className="p-4">{oficina.empresa}</td>
                <td className="p-4">{oficina.contato}</td>
                <td className="p-4">{oficina.telefone}</td>
                <td className="p-4">{oficina.email}</td>
                <td className="p-4">{oficina.cidade}</td>
                <td className="p-4 flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md">Histórico</button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Orçamentos</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">Editar</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão de Exportação */}
      <div className="mt-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Exportar</button>
      </div>
    </div>
  );
};

export default ListaDeOficinas;
