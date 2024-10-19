import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  let connection;
  try {
    const garantiaId = parseInt(params.id, 10);

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `DELETE FROM gestaodegarantia1 WHERE ID = :garantiaId`,
      { garantiaId },
      { autoCommit: true }
    );

    return NextResponse.json({ message: 'Garantia excluída com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir garantia:', error);
    return NextResponse.json({ error: 'Erro ao excluir garantia' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
