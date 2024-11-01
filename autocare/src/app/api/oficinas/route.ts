import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';

// Configuração do Banco de Dados
const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Interface para definir o tipo de dados de Oficina
interface Oficina {
  id?: number;
  empresa: string;
  contato: string;
  telefone: string;
  email: string;
  cidade: string;
}

// Função para abrir a conexão com o banco de dados
async function openConnection(): Promise<oracledb.Connection> {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados Oracle:", error);
    throw error;
  }
}

// Função para fechar a conexão com o banco de dados
async function closeConnection(connection: oracledb.Connection): Promise<void> {
  try {
    await connection.close();
    console.log("Conexão com o banco de dados fechada.");
  } catch (error) {
    console.error("Erro ao fechar a conexão com o banco de dados:", error);
  }
}

// Função para verificar duplicidade de empresa
async function verificarDuplicidadeEmpresa(connection: oracledb.Connection, empresa: string): Promise<boolean> {
  const result = await connection.execute(
    `SELECT COUNT(*) AS count FROM oficinas_credenciadas WHERE empresa = :empresa`,
    { empresa }
  );

  const rows = result.rows as [number][]; // Cast rows as array of number arrays
  const count = rows[0][0]; // Access the first element safely
  return count > 0;
}

// Função para verificar duplicidade de email
async function verificarDuplicidadeEmail(connection: oracledb.Connection, email: string): Promise<boolean> {
  const result = await connection.execute(
    `SELECT COUNT(*) AS count FROM oficinas_credenciadas WHERE email = :email`,
    { email }
  );

  const rows = result.rows as [number][]; // Cast rows as array of number arrays
  const count = rows[0][0]; // Access the first element safely
  return count > 0;
}

// GET - Listar todas as oficinas credenciadas
export async function GET() {
  let connection: oracledb.Connection | undefined;
  try {
    console.log("Iniciando requisição GET para listar oficinas credenciadas.");
    connection = await openConnection();
    const result = await connection.execute(`SELECT * FROM oficinas_credenciadas`);
    console.log("Oficinas credenciadas recuperadas com sucesso:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar oficinas credenciadas:", error);
    return NextResponse.json({ error: 'Falha ao buscar oficinas credenciadas' }, { status: 500 });
  } finally {
    if (connection) await closeConnection(connection);
  }
}

// POST - Criar uma nova oficina credenciada com verificação de unicidade
export async function POST(req: NextRequest) {
  const { empresa, contato, telefone, email, cidade }: Oficina = await req.json();
  console.log("Recebendo dados para criação de nova oficina:", { empresa, contato, telefone, email, cidade });

  let connection: oracledb.Connection | undefined;
  try {
    connection = await openConnection();

    // Verificar duplicidade de empresa
    const empresaDuplicada = await verificarDuplicidadeEmpresa(connection, empresa);
    if (empresaDuplicada) {
      console.error("Nome da empresa já existe no sistema.");
      return NextResponse.json({ error: 'Nome da empresa já cadastrado' }, { status: 409, headers: { 'error-type': 'empresa' } });
    }

    // Verificar duplicidade de email
    const emailDuplicado = await verificarDuplicidadeEmail(connection, email);
    if (emailDuplicado) {
      console.error("E-mail já existe no sistema.");
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409, headers: { 'error-type': 'email' } });
    }

    // Inserir a nova oficina caso não haja duplicidade
    const result = await connection.execute(
      `INSERT INTO oficinas_credenciadas (empresa, contato, telefone, email, cidade) VALUES (:empresa, :contato, :telefone, :email, :cidade)`,
      { empresa, contato, telefone, email, cidade },
      { autoCommit: true }
    );
    console.log("Oficina credenciada inserida com sucesso:", result);
    return NextResponse.json({ message: 'Oficina credenciada adicionada com sucesso' }, { status: 201 });
  } catch (error) {
    console.error("Erro ao inserir oficina credenciada:", error);
    return NextResponse.json({ error: 'Falha ao adicionar oficina credenciada' }, { status: 500 });
  } finally {
    if (connection) await closeConnection(connection);
  }
}

// PUT - Atualizar uma oficina credenciada existente
export async function PUT(req: NextRequest) {
  const { id, empresa, contato, telefone, email, cidade }: Oficina = await req.json();
  if (!id) {
    console.error("ID não fornecido para atualização.");
    return NextResponse.json({ error: 'ID é obrigatório para atualização' }, { status: 400 });
  }

  console.log("Recebendo dados para atualização de oficina:", { id, empresa, contato, telefone, email, cidade });

  let connection: oracledb.Connection | undefined;
  try {
    connection = await openConnection();
    const result = await connection.execute(
      `UPDATE oficinas_credenciadas SET empresa = :empresa, contato = :contato, telefone = :telefone, email = :email, cidade = :cidade WHERE id = :id`,
      { empresa, contato, telefone, email, cidade, id },
      { autoCommit: true }
    );
    console.log("Oficina credenciada atualizada com sucesso:", result);
    return NextResponse.json({ message: 'Oficina credenciada atualizada com sucesso' });
  } catch (error) {
    console.error("Erro ao atualizar oficina credenciada:", error);
    return NextResponse.json({ error: 'Falha ao atualizar oficina credenciada' }, { status: 500 });
  } finally {
    if (connection) await closeConnection(connection);
  }
}

// DELETE - Excluir uma oficina credenciada
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    console.error("ID não fornecido para exclusão.");
    return NextResponse.json({ error: 'ID é obrigatório para exclusão' }, { status: 400 });
  }

  console.log("Recebendo ID para exclusão de oficina:", id);

  let connection: oracledb.Connection | undefined;
  try {
    connection = await openConnection();
    const result = await connection.execute(
      `DELETE FROM oficinas_credenciadas WHERE id = :id`,
      { id },
      { autoCommit: true }
    );
    console.log("Oficina credenciada excluída com sucesso:", result);
    return NextResponse.json({ message: 'Oficina credenciada excluída com sucesso' });
  } catch (error) {
    console.error("Erro ao excluir oficina credenciada:", error);
    return NextResponse.json({ error: 'Falha ao excluir oficina credenciada' }, { status: 500 });
  } finally {
    if (connection) await closeConnection(connection);
  }
}
