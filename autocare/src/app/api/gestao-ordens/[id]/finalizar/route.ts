import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

interface OrdemData {
  CLIENTE_NOME: string;
  CLIENTE_EMAIL: string;
  CLIENTE_TELEFONE?: string;
  NUMERO_ORDEM_SERVICO: string;
  PECAS?: string;
  MODELO?: string;
  ANO?: number;
  DIAGNOSTICO?: string;
  SOLUCAO?: string;
  ESTIMATIVA?: string;
  STATUS_ORDEM?: string;
  VALOR_FINAL?: number | string;
  DATA_GARANTIA?: Date;
}

export async function POST(request: Request, { params }: { params: any }) {
  let connection;
  try {
    const ordemId = parseInt(params.id, 10);
    const body = await request.json();
    const { isDiagnosticoCorrect, newDiagnostico, newPecas, newValorFinal } = body;

    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM gestao_ordens WHERE ID = :ordemId`,
      { ordemId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: 'Ordem não encontrada' }, { status: 404 });
    }

    const ordemData = result.rows[0] as OrdemData;

    if (!ordemData || typeof ordemData !== 'object') {
      return NextResponse.json({ error: 'Dados da ordem inválidos' }, { status: 400 });
    }

    let garantiaData = { ...ordemData };

    if (!isDiagnosticoCorrect) {
      garantiaData.DIAGNOSTICO = newDiagnostico;
      garantiaData.PECAS = newPecas;
      garantiaData.VALOR_FINAL = newValorFinal;
    }

    garantiaData.DATA_GARANTIA = new Date();

    const insertQuery = `
      INSERT INTO gestaodegarantia1 (
        CLIENTE_NOME, CLIENTE_EMAIL, CLIENTE_TELEFONE, NUMERO_ORDEM_SERVICO, PECAS, MODELO,
        ANO, DIAGNOSTICO, SOLUCAO, ESTIMATIVA, STATUS_ORDEM, VALOR_FINAL, DATA_GARANTIA
      ) VALUES (
        :CLIENTE_NOME, :CLIENTE_EMAIL, :CLIENTE_TELEFONE, :NUMERO_ORDEM_SERVICO, :PECAS, :MODELO,
        :ANO, :DIAGNOSTICO, :SOLUCAO, :ESTIMATIVA, :STATUS_ORDEM, :VALOR_FINAL, :DATA_GARANTIA
      )
    `;

    await connection.execute(
      insertQuery,
      {
        CLIENTE_NOME: garantiaData.CLIENTE_NOME,
        CLIENTE_EMAIL: garantiaData.CLIENTE_EMAIL,
        CLIENTE_TELEFONE: garantiaData.CLIENTE_TELEFONE,
        NUMERO_ORDEM_SERVICO: garantiaData.NUMERO_ORDEM_SERVICO,
        PECAS: garantiaData.PECAS,
        MODELO: garantiaData.MODELO,
        ANO: garantiaData.ANO,
        DIAGNOSTICO: garantiaData.DIAGNOSTICO,
        SOLUCAO: garantiaData.SOLUCAO,
        ESTIMATIVA: garantiaData.ESTIMATIVA,
        STATUS_ORDEM: garantiaData.STATUS_ORDEM,
        VALOR_FINAL: garantiaData.VALOR_FINAL,
        DATA_GARANTIA: garantiaData.DATA_GARANTIA,
      },
      { autoCommit: false }
    );

    await connection.execute(
      `DELETE FROM gestao_ordens WHERE ID = :ordemId`,
      { ordemId },
      { autoCommit: false }
    );

    await connection.commit();

    return NextResponse.json({ message: 'Ordem finalizada com sucesso' }, { status: 200 });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Erro ao finalizar ordem:', error);
    return NextResponse.json({ error: 'Erro ao finalizar ordem' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
