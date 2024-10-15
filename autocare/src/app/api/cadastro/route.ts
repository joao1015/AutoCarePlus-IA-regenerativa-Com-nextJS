// src/app/api/cadastro/route.ts
import { NextResponse } from 'next/server';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

// Defina a interface do usuário
interface User {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  logradouro?: string;
  numero?: string;
  cidade?: string;
  estado?: string;
}

interface MaxIdResult {
  maxId: number;
}

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, email, senha, logradouro, numero, cidade, estado } = body;

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const maxIdQuery = `SELECT NVL(MAX(ID), 0) AS "maxId" FROM usuariosAultoCarePlus`;
    const maxIdResult = await connection.execute(maxIdQuery, {}, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // Verificação segura e cast para MaxIdResult
    const maxIdRow = maxIdResult.rows?.[0] as MaxIdResult;
    const newId = (maxIdRow?.maxId ?? 0) + 1;

    const insertQuery = `
      INSERT INTO usuariosAultoCarePlus (id, nome, email, senha, logradouro, numero, cidade, estado)
      VALUES (:id, :nome, :email, :senha, :logradouro, :numero, :cidade, :estado)
    `;
    await connection.execute(
      insertQuery,
      { id: newId, nome, email, senha, logradouro, numero, cidade, estado },
      { autoCommit: true }
    );

    const selectQuery = `
      SELECT id AS "id", nome AS "nome", email AS "email", logradouro AS "logradouro", numero AS "numero", cidade AS "cidade", estado AS "estado"
      FROM usuariosAultoCarePlus WHERE email = :email
    `;
    const result = await connection.execute(selectQuery, { email }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    if (!result || !result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: 'Erro ao buscar o usuário' }, { status: 500 });
    }

    const user: User = result.rows[0] as User;

    const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, 'seu_segredo_jwt', { expiresIn: '2h' });

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso!', token, user });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao cadastrar o usuário' }, { status: 500 });
  } finally {
    if (connection) await connection.close();
  }
}
