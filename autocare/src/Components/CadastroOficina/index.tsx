"use client";

import { useEffect, useState } from 'react';

interface Oficina {
  id?: number;
  empresa: string;
  contato: string;
  telefone: string;
  email: string;
  cidade: string;
}

const CadastroOficina = () => {
  const [oficinas, setOficinas] = useState<Oficina[]>([]);
  const [filtroOficina, setFiltroOficina] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroAtivoOficina, setFiltroAtivoOficina] = useState('');
  const [filtroAtivoCidade, setFiltroAtivoCidade] = useState('');
  const [novaOficina, setNovaOficina] = useState<Oficina>({
    empresa: '',
    contato: '',
    telefone: '',
    email: '',
    cidade: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erroEmpresa, setErroEmpresa] = useState<string | null>(null);
  const [erroEmail, setErroEmail] = useState<string | null>(null);
  const [editando, setEditando] = useState<boolean>(false);
  const [oficinaEditadaId, setOficinaEditadaId] = useState<number | null>(null);

  const fetchOficinas = async () => {
    try {
      const response = await fetch('/api/oficinas');
      const data = await response.json();
  
      // Cheque se data é um array antes de mapear
      if (Array.isArray(data)) {
        const oficinasFormatadas = data.map((item: any) => ({
          id: item.id,
          empresa: item.empresa,
          contato: item.contato,
          telefone: item.telefone,
          email: item.email,
          cidade: item.cidade,
        }));
        setOficinas(oficinasFormatadas);
      } else {
        console.error('Erro: dados recebidos não são um array:', data);
        setMensagem("Erro ao buscar oficinas: resposta inesperada.");
      }
    } catch (error) {
      console.error("Erro ao buscar oficinas:", error);
      setMensagem("Erro ao buscar oficinas.");
    }
  };
  
  

  const salvarOficina = async () => {
    setErroEmpresa(null);
    setErroEmail(null);

    if (!novaOficina.empresa || !novaOficina.email || !novaOficina.cidade) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch(`/api/oficinas`, {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novaOficina, id: oficinaEditadaId }),
      });

      if (response.ok) {
        setMensagem(editando ? "Oficina atualizada com sucesso!" : "Oficina adicionada com sucesso!");
        fetchOficinas();
        resetFormulario();
      } else if (response.status === 409) {
        const errorData = await response.json();
        if (errorData.error.includes('Empresa')) setErroEmpresa("Nome da empresa já está em uso.");
        if (errorData.error.includes('email')) setErroEmail("E-mail já está em uso.");
      } else {
        setMensagem("Erro ao salvar oficina.");
      }
    } catch (error) {
      setMensagem("Erro ao salvar oficina.");
      console.error("Erro ao salvar oficina:", error);
    }
  };

  const deletarOficina = async (id: number) => {
    try {
      const response = await fetch(`/api/oficinas`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setMensagem("Oficina excluída com sucesso!");
        fetchOficinas();
      } else {
        setMensagem("Erro ao excluir oficina.");
      }
    } catch (error) {
      setMensagem("Erro ao excluir oficina.");
      console.error("Erro ao excluir oficina:", error);
    }
  };

  const iniciarEdicao = (oficina: Oficina) => {
    setNovaOficina(oficina);
    setOficinaEditadaId(oficina.id || null);
    setMostrarFormulario(true);
    setEditando(true);
  };

  const iniciarNovaOficina = () => {
    resetFormulario(); // Reseta o formulário para adicionar nova oficina
    setMostrarFormulario(true);
    setEditando(false);
  };

  // Função para resetar o formulário
  const resetFormulario = () => {
    setNovaOficina({ empresa: '', contato: '', telefone: '', email: '', cidade: '' });
    setOficinaEditadaId(null);
    setErroEmpresa(null);
    setErroEmail(null);
    setMostrarFormulario(false);
  };

  // Aplicar filtros ao clicar nos botões
  const aplicarFiltroOficina = () => {
    setFiltroAtivoOficina(filtroOficina);
  };

  const aplicarFiltroCidade = () => {
    setFiltroAtivoCidade(filtroCidade);
  };

  const oficinasFiltradas = oficinas.filter(
    (oficina) =>
      (oficina.empresa?.toLowerCase() || '').includes(filtroAtivoOficina.toLowerCase()) &&
      (oficina.cidade?.toLowerCase() || '').includes(filtroAtivoCidade.toLowerCase())
  );

  useEffect(() => {
    fetchOficinas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h2 className="text-2xl font-semibold mt-5">Cadastro de Oficinas</h2>

      {mensagem && <div className="text-center bg-blue-100 text-blue-700 p-2 rounded mt-2">{mensagem}</div>}

      <div className="flex gap-4 mt-4">
        <input
          type="text"
          placeholder="Filtrar Oficina"
          value={filtroOficina}
          onChange={(e) => setFiltroOficina(e.target.value)}
          className="p-2 border rounded-md w-1/4"
        />
        <button
          onClick={aplicarFiltroOficina}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Aplicar Filtro Oficina
        </button>

        <input
          type="text"
          placeholder="Filtrar Cidade"
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
          className="p-2 border rounded-md w-1/4"
        />
        <button
          onClick={aplicarFiltroCidade}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Aplicar Filtro Cidade
        </button>

        <button
          onClick={iniciarNovaOficina}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Nova Oficina
        </button>
      </div>

      {mostrarFormulario && (
        <div className="bg-white p-4 mt-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold">{editando ? "Editar Oficina" : "Adicionar Nova Oficina"}</h3>
          <input
            type="text"
            placeholder="Empresa *"
            value={novaOficina.empresa}
            onChange={(e) => {
              setNovaOficina({ ...novaOficina, empresa: e.target.value });
              setErroEmpresa(null);
            }}
            className="p-2 border rounded-md w-full mt-2"
          />
          {erroEmpresa && <p className="text-red-600 text-sm">{erroEmpresa}</p>}

          <input
            type="text"
            placeholder="Contato"
            value={novaOficina.contato}
            onChange={(e) => setNovaOficina({ ...novaOficina, contato: e.target.value })}
            className="p-2 border rounded-md w-full mt-2"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={novaOficina.telefone}
            onChange={(e) => setNovaOficina({ ...novaOficina, telefone: e.target.value })}
            className="p-2 border rounded-md w-full mt-2"
          />
          <input
            type="email"
            placeholder="Email *"
            value={novaOficina.email}
            onChange={(e) => {
              setNovaOficina({ ...novaOficina, email: e.target.value });
              setErroEmail(null);
            }}
            className="p-2 border rounded-md w-full mt-2"
          />
          {erroEmail && <p className="text-red-600 text-sm">{erroEmail}</p>}

          <input
            type="text"
            placeholder="Cidade *"
            value={novaOficina.cidade}
            onChange={(e) => setNovaOficina({ ...novaOficina, cidade: e.target.value })}
            className="p-2 border rounded-md w-full mt-2"
          />
          <button
            onClick={salvarOficina}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            {editando ? "Salvar Alterações" : "Salvar"}
          </button>
          <button
            onClick={resetFormulario}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        {oficinasFiltradas.length > 0 ? (
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
              {oficinasFiltradas.map((oficina) => (
                <tr key={oficina.id} className="border-b">
                  <td className="p-4">{oficina.id}</td>
                  <td className="p-4">{oficina.empresa}</td>
                  <td className="p-4">{oficina.contato}</td>
                  <td className="p-4">{oficina.telefone}</td>
                  <td className="p-4">{oficina.email}</td>
                  <td className="p-4">{oficina.cidade}</td>
                  <td className="p-4">
                    <button
                      onClick={() => iniciarEdicao(oficina)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarOficina(oficina.id!)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md ml-2"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">Nenhuma oficina encontrada para a busca atual.</p>
        )}
      </div>
    </div>
  );
};

export default CadastroOficina;
