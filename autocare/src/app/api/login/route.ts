import { NextResponse } from 'next/server';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

// Configurações do banco de dados Oracle
const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Segredo JWT (mantenha isso seguro)
const JWT_SECRET = 'seu_segredo_jwt';

// Definindo o tipo para o usuário do banco de dados
interface UsuarioDB {
  ID: number;
  NOME: string;
  EMAIL: string;
  LOGRADOURO: string;
  NUMERO: string;
  CIDADE: string;
  ESTADO: string;
}

// Função para realizar o login
export async function POST(req: Request) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
  }

  try {
    const connection = await oracledb.getConnection(dbConfig);

    // Consulta o usuário no banco de dados com a tipagem correta
    const result = await connection.execute<UsuarioDB>(
      `SELECT ID, NOME, EMAIL, LOGRADOURO, NUMERO, CIDADE, ESTADO 
       FROM usuariosAultoCarePlus 
       WHERE email = :email AND senha = :senha`,
      { email, senha },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const user = result.rows?.[0];

    // Verifica se o usuário foi encontrado
    if (!user) {
      return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 });
    }

    // Gera um token JWT para o usuário
    const token = jwt.sign({ id: user.ID, email: user.EMAIL }, JWT_SECRET, { expiresIn: '2h' });

    return NextResponse.json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user.ID,
        nome: user.NOME,
        email: user.EMAIL,
        logradouro: user.LOGRADOURO,
        numero: user.NUMERO,
        cidade: user.CIDADE,
        estado: user.ESTADO,
      },
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
