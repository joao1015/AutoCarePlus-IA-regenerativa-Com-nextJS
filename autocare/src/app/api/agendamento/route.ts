// src/app/api/agendar/route.ts
import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

export async function POST(req: Request) {
  const body = await req.json();
  const { cliente, oficinaId, pecas, modelo, ano, diagnostico, solucao, estimativa } = body;

  if (!cliente || isNaN(Number(oficinaId)) || isNaN(Number(ano)) || !pecas || !modelo || !diagnostico || !solucao || !estimativa) {
    return NextResponse.json({ error: 'Dados insuficientes ou inválidos' }, { status: 400 });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const insertQuery = `
      INSERT INTO orcamentos (cliente_nome, cliente_email, cliente_telefone, oficina_id, pecas, modelo, ano, diagnostico, solucao, estimativa)
      VALUES (:cliente_nome, :cliente_email, :cliente_telefone, :oficina_id, :pecas, :modelo, :ano, :diagnostico, :solucao, :estimativa)
    `;
    await connection.execute(
      insertQuery,
      {
        cliente_nome: cliente.nome,
        cliente_email: cliente.email,
        cliente_telefone: cliente.telefone,
        oficina_id: Number(oficinaId),
        pecas,
        modelo,
        ano: Number(ano),
        diagnostico,
        solucao,
        estimativa,
      },
      { autoCommit: true }
    );

    return NextResponse.json({ message: 'Agendamento realizado com sucesso!' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar o agendamento' }, { status: 500 });
  } finally {
    if (connection) await connection.close();
  }
}
