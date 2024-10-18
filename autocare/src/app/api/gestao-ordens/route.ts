import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';

// Configurações de conexão com o banco de dados
const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Função para tratar o POST
export async function POST(req: NextRequest) {
  let connection;

  try {
    // Parseia o corpo da requisição
    const body = await req.json();
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

    // Verifica se todos os campos necessários estão presentes
    if (!cliente_nome || !cliente_email || !numero_ordem_servico) {
      return NextResponse.json(
        { error: 'Dados incompletos fornecidos' },
        { status: 400 }
      );
    }

    // Conecta ao banco de dados
    connection = await oracledb.getConnection(dbConfig);

    // Query de inserção na tabela gestao_ordens
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

    // Executa a query de inserção
    const result = await connection.execute(insertQuery, {
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
    }, { autoCommit: true });

    // Verifica se a inserção foi bem-sucedida
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
    // Fecha a conexão com o banco de dados
    if (connection) {
      await connection.close();
    }
  }
}
export async function GET(req: NextRequest) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    
    const result = await connection.execute(
      `SELECT * FROM gestao_ordens`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Dados retornados da consulta:', result.rows); // Adiciona log para verificar os dados

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: 'Nenhuma ordem de serviço encontrada' }, { status: 404 });
    }

    return NextResponse.json({ ordens: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar ordens de serviço:', error);
    return NextResponse.json({ error: 'Erro ao buscar ordens de serviço' }, { status: 500 });
  }
}
