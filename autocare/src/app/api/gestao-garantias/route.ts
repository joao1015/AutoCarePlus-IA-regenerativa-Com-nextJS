import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

export async function GET() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM gestaodegarantia1`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return NextResponse.json({ garantias: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar garantias:', error);
    return NextResponse.json({ error: 'Erro ao buscar garantias' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
