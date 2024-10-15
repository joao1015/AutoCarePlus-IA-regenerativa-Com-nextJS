import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Método GET para listar orçamentos
export async function GET(req: Request, { params }: { params: { oficinaId: string } }) {
  const { oficinaId } = params;

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const selectQuery = `
      SELECT
        id AS "orcamento_id",  -- Garante que o ID do orçamento seja retornado corretamente
        cliente_nome AS "cliente_nome",
        cliente_email AS "cliente_email",
        cliente_telefone AS "cliente_telefone",
        pecas AS "pecas",
        modelo AS "modelo",
        ano AS "ano",
        diagnostico AS "diagnostico",
        solucao AS "solucao",
        estimativa AS "estimativa"
      FROM orcamentos
      WHERE oficina_id = :oficinaId
    `;
    const result = await connection.execute(selectQuery, { oficinaId }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: 'Nenhum orçamento encontrado para essa oficina' }, { status: 404 });
    }

    return NextResponse.json({ orcamentos: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar os orçamentos' }, { status: 500 });
  } finally {
    if (connection) await connection.close();
  }
}

// Método DELETE para rejeitar e deletar orçamentos
export async function DELETE(req: Request, { params }: { params: { oficinaId: string, orcamentoId: string } }) {
  const { oficinaId, orcamentoId } = params;

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const deleteQuery = `
      DELETE FROM orcamentos
      WHERE oficina_id = :oficinaId AND id = :orcamentoId
    `;

    const result = await connection.execute(deleteQuery, { oficinaId, orcamentoId }, { autoCommit: true });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: 'Orçamento não encontrado ou já deletado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Orçamento rejeitado e deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar o orçamento' }, { status: 500 });
  } finally {
    if (connection) await connection.close();
  }
}
export async function POST(request: Request) {
  try {
    const { id } = await request.json(); // Extrai o ID do orçamento da requisição

    console.log('ID recebido:', id); // Adicione este log para verificar o ID

    if (!id) {
      return NextResponse.json({ error: 'ID do orçamento não fornecido' }, { status: 400 });
    }

    // Aqui você pode colocar sua lógica para rejeitar o orçamento
    // Isso pode envolver a interação com um banco de dados, por exemplo.

    // Simulação de rejeição bem-sucedida
    console.log(`Orçamento com ID ${id} rejeitado com sucesso.`);

    return NextResponse.json({ message: 'Orçamento rejeitado com sucesso' });
  } catch (error) {
    console.error('Erro ao processar a requisição de rejeição:', error);
    return NextResponse.json({ error: 'Erro ao rejeitar o orçamento' }, { status: 500 });
  }
}