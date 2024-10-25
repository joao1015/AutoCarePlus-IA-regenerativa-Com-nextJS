// app/api/gestao-ordens/route.ts

import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

// Configurações de conexão com o banco de dados
const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Função para obter todas as ordens
export async function GET(request: Request) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute<any>(
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

// Função para inserir uma nova ordem e excluir a correspondente na tabela orcamentos
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
      return NextResponse.json({ error: 'Dados incompletos fornecidos' }, { status: 400 });
    }

    connection = await oracledb.getConnection(dbConfig);

    // Verificar se a ordem já existe
    const checkQuery = `
      SELECT COUNT(*) AS count FROM gestao_ordens WHERE numero_ordem_servico = :numero_ordem_servico
    `;
    const checkResult = await connection.execute<any>(
      checkQuery,
      { numero_ordem_servico },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Corrigido: o resultado da consulta é tratado como um array de objetos
    if (checkResult.rows && checkResult.rows[0].COUNT > 0) {
      return NextResponse.json({ message: 'Ordem já existente na gestão de ordens' }, { status: 409 });
    }

    // Inserir a nova ordem na tabela gestao_ordens
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
    const insertResult = await connection.execute(
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
      { autoCommit: false } 
    );

    if (insertResult.rowsAffected !== 1) {
      throw new Error('Falha ao salvar ordem na tabela gestao_ordens');
    }

    // Excluir a ordem correspondente da tabela orcamentos
    const deleteQuery = `
      DELETE FROM orcamentos WHERE numero_ordem_servico = :numero_ordem_servico
    `;
    const deleteResult = await connection.execute(
      deleteQuery,
      { numero_ordem_servico },
      { autoCommit: true }
    );

    if (deleteResult.rowsAffected !== 1) {
      throw new Error('Falha ao apagar ordem da tabela orcamentos');
    }

    return NextResponse.json({ message: 'Ordem salva e apagada com sucesso' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao salvar na gestão de ordens:', error);
    return NextResponse.json({ error: 'Erro ao salvar na gestão de ordens' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
