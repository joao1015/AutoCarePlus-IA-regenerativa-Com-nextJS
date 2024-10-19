import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: 'rm557808',
  password: '021093',
  connectString: 'oracle.fiap.com.br:1521/orcl',
};

// Opcional: Definir autoCommit globalmente
// oracledb.autoCommit = false;

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

export async function POST(request: Request, { params }: { params: { id: string } }) {
  let connection;
  try {
    const ordemId = parseInt(params.id, 10);
    const body = await request.json();
    const { isDiagnosticoCorrect, newDiagnostico, newPecas, newValorFinal } = body;

    // Conecta ao banco de dados
    connection = await oracledb.getConnection(dbConfig);

    // Não é necessário definir connection.autoCommit

    // Busca a ordem na tabela 'gestao_ordens'
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

    // Prepara os dados para inserir em 'gestaodegarantia1'
    let garantiaData = { ...ordemData };

    // Atualiza os dados caso o diagnóstico esteja incorreto
    if (!isDiagnosticoCorrect) {
      garantiaData.DIAGNOSTICO = newDiagnostico;
      garantiaData.PECAS = newPecas;
      garantiaData.VALOR_FINAL = newValorFinal;
    }

    // Adiciona a data atual como data de garantia
    garantiaData.DATA_GARANTIA = new Date();

    // Insere na tabela 'gestaodegarantia1'
    const insertQuery = `
      INSERT INTO gestaodegarantia1 (
        CLIENTE_NOME,
        CLIENTE_EMAIL,
        CLIENTE_TELEFONE,
        NUMERO_ORDEM_SERVICO,
        PECAS,
        MODELO,
        ANO,
        DIAGNOSTICO,
        SOLUCAO,
        ESTIMATIVA,
        STATUS_ORDEM,
        VALOR_FINAL,
        DATA_GARANTIA
      ) VALUES (
        :CLIENTE_NOME,
        :CLIENTE_EMAIL,
        :CLIENTE_TELEFONE,
        :NUMERO_ORDEM_SERVICO,
        :PECAS,
        :MODELO,
        :ANO,
        :DIAGNOSTICO,
        :SOLUCAO,
        :ESTIMATIVA,
        :STATUS_ORDEM,
        :VALOR_FINAL,
        :DATA_GARANTIA
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
      { autoCommit: false } // Controle de transação manual
    );

    // Remove a ordem da tabela 'gestao_ordens'
    await connection.execute(
      `DELETE FROM gestao_ordens WHERE ID = :ordemId`,
      { ordemId },
      { autoCommit: false } // Controle de transação manual
    );

    // Confirma a transação
    await connection.commit();

    return NextResponse.json({ message: 'Ordem finalizada com sucesso' }, { status: 200 });
  } catch (error) {
    if (connection) {
      // Reverte a transação em caso de erro
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
