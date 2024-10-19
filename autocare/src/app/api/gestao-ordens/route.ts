// app/api/gestao-ordens/route.ts

import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

export async function GET(request: Request) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM gestao_ordens`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: 'Nenhuma ordem de serviço encontrada' }, { status: 404 });
    }

    return NextResponse.json({ ordens: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar ordens de serviço:', error);
    return NextResponse.json({ error: 'Erro ao buscar ordens de serviço' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export async function POST(request: Request) {
  let connection;

  try {
    const body = await request.json();
    const {
      cliente_nome,
      cliente_email,
      cliente_telefone,
      pecas,
      modelo,
      ano,
      diagnostico,
      solucao,
      estimativa,
      numero_ordem_servico,
    } = body;

    if (!cliente_nome || !cliente_email || !numero_ordem_servico) {
      return NextResponse.json(
        { error: 'Dados incompletos fornecidos' },
        { status: 400 }
      );
    }

    connection = await oracledb.getConnection(dbConfig);

    const insertQuery = `
      INSERT INTO gestao_ordens (
        cliente_nome,
        cliente_email,
        cliente_telefone,
        pecas,
        modelo,
        ano,
        diagnostico,
        solucao,
        estimativa,
        numero_ordem_servico
      ) VALUES (
        :cliente_nome,
        :cliente_email,
        :cliente_telefone,
        :pecas,
        :modelo,
        :ano,
        :diagnostico,
        :solucao,
        :estimativa,
        :numero_ordem_servico
      )
    `;

    const result = await connection.execute(
      insertQuery,
      {
        cliente_nome,
        cliente_email,
        cliente_telefone,
        pecas,
        modelo,
        ano,
        diagnostico,
        solucao,
        estimativa,
        numero_ordem_servico,
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 1) {
      return NextResponse.json(
        { message: 'Ordem salva com sucesso na gestão de ordens!' },
        { status: 200 }
      );
    } else {
      throw new Error('Falha ao salvar ordem');
    }
  } catch (error) {
    console.error('Erro ao salvar na gestão de ordens:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar na gestão de ordens' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
