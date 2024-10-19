import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';

// Configurações de conexão com o banco de dados
const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Função para atualizar o status de uma ordem
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  let connection;
  try {
    // Parseia o corpo da requisição
    const { id } = params;
    const { status_ordem } = await req.json();

    // Verifica se o status foi enviado
    if (!status_ordem) {
      return NextResponse.json({ error: 'Status não fornecido' }, { status: 400 });
    }

    // Conecta ao banco de dados
    connection = await oracledb.getConnection(dbConfig);

    // Query de atualização da ordem de serviço
    const updateQuery = `
      UPDATE gestao_ordens
      SET status_ordem = :status_ordem
      WHERE id = :id
    `;

    // Executa a query de atualização
    const result = await connection.execute(updateQuery, { status_ordem, id }, { autoCommit: true });

    if (result.rowsAffected === 1) {
      return NextResponse.json({ message: 'Status da ordem atualizado com sucesso' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Ordem não encontrada ou falha na atualização' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao atualizar o status da ordem:', error);
    return NextResponse.json({ error: 'Erro ao atualizar o status da ordem' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
