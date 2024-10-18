import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Função GET para listar orçamentos
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const oficinaId = searchParams.get('oficinaId');

  if (!oficinaId) {
    return NextResponse.json(
      { error: 'oficinaId não fornecido' },
      { status: 400 }
    );
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const selectQuery = `
      SELECT
        id AS "orcamento_id",
        cliente_nome AS "cliente_nome",
        cliente_email AS "cliente_email",
        cliente_telefone AS "cliente_telefone",
        pecas AS "pecas",
        modelo AS "modelo",
        ano AS "ano",
        diagnostico AS "diagnostico",
        solucao AS "solucao",
        estimativa AS "estimativa",
        numero_ordem_servico AS "NUMERO_ORDEM_SERVICO"
      FROM orcamentos
      WHERE oficina_id = :oficinaId
    `;

    const result = await connection.execute(
      selectQuery,
      { oficinaId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum orçamento encontrado para essa oficina' },
        { status: 404 }
      );
    }

    return NextResponse.json({ orcamentos: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao listar os orçamentos' },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.close();
  }
}

// Função DELETE para deletar orçamentos usando NUMERO_ORDEM_SERVICO
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let numeroOrdemServico = searchParams.get('numero_ordem_servico');

  if (!numeroOrdemServico) {
    return NextResponse.json(
      { error: 'Número da ordem de serviço não fornecido' },
      { status: 400 }
    );
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const deleteQuery = `
      DELETE FROM orcamentos
      WHERE numero_ordem_servico = :numeroOrdemServico
    `;

    const result = await connection.execute(
      deleteQuery,
      { numeroOrdemServico },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado ou já deletado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Orçamento deletado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar o orçamento' },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.close();
  }
}
