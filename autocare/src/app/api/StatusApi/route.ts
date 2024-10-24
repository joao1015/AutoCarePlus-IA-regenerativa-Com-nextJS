// api/gestao-ordens/route.ts
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
    console.log('Iniciando processamento da requisição GET');

    const { searchParams } = new URL(request.url);
    const clienteEmail = searchParams.get('email');
    console.log('Parâmetro email recebido:', clienteEmail);

    if (!clienteEmail) {
      console.warn('Parâmetro de email não fornecido');
      return NextResponse.json({ error: 'Parâmetro de email é obrigatório' }, { status: 400 });
    }

    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexão com o banco de dados estabelecida');

    const result = await connection.execute(
      `SELECT status_ordem FROM gestao_ordens WHERE cliente_email = :email`,
      [clienteEmail],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('Resultado da consulta:', JSON.stringify(result));

    if (!result.rows || result.rows.length === 0) {
      console.warn('Nenhuma ordem de serviço encontrada para o email especificado');
      return NextResponse.json({ error: 'Nenhuma ordem de serviço encontrada para o email especificado' }, { status: 404 });
    }

    const row = result.rows[0] as Record<string, any>;
    const statusOrdem = row['STATUS_ORDEM'] || row['status_ordem'];
    console.log('Status da ordem de serviço encontrado:', statusOrdem);

    if (!statusOrdem) {
      console.error('Erro ao obter o status da ordem de serviço');
      return NextResponse.json({ error: 'Erro ao obter o status da ordem de serviço' }, { status: 500 });
    }

    return NextResponse.json({ status: statusOrdem }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar ordens de serviço:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return NextResponse.json({ error: 'Erro ao buscar ordens de serviço' }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexão com o banco de dados fechada');
      } catch (closeError) {
        console.error('Erro ao fechar conexão com o banco de dados:', closeError);
      }
    }
  }
}

export async function POST(request: Request) {
  let connection;
  try {
    console.log('Iniciando processamento da requisição POST');

    const { searchParams } = new URL(request.url);
    const clienteEmail = searchParams.get('email');
    console.log('Parâmetro email recebido:', clienteEmail);

    if (!clienteEmail) {
      console.warn('Parâmetro de email não fornecido');
      return NextResponse.json({ error: 'Parâmetro de email é obrigatório' }, { status: 400 });
    }

    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexão com o banco de dados estabelecida');

    const result = await connection.execute(
      `SELECT status_ordem FROM gestao_ordens WHERE cliente_email = :email`,
      [clienteEmail],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('Resultado da consulta:', JSON.stringify(result));

    if (!result.rows || result.rows.length === 0) {
      console.warn('Nenhuma ordem de serviço encontrada para o email especificado');
      return NextResponse.json({ error: 'Nenhuma ordem de serviço encontrada para o email especificado' }, { status: 404 });
    }

    const row = result.rows[0] as Record<string, any>;
    const statusOrdem = row['STATUS_ORDEM'] || row['status_ordem'];
    console.log('Status da ordem de serviço encontrado:', statusOrdem);

    if (!statusOrdem) {
      console.error('Erro ao obter o status da ordem de serviço');
      return NextResponse.json({ error: 'Erro ao obter o status da ordem de serviço' }, { status: 500 });
    }

    return NextResponse.json({ status: statusOrdem }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar ordens de serviço:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return NextResponse.json({ error: 'Erro ao buscar ordens de serviço' }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexão com o banco de dados fechada');
      } catch (closeError) {
        console.error('Erro ao fechar conexão com o banco de dados:', closeError);
      }
    }
  }
}

