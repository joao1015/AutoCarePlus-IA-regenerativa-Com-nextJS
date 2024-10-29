import cx_Oracle
import os
from dotenv import load_dotenv
from fuzzywuzzy import fuzz

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Tabela de sinônimos para ajudar na correspondência de palavras-chave importantes
freio_sinonimos = {
    'freio': ['freio', 'disco', 'pastilha', 'pinça', 'barulho ao frear', 'desgaste de freio'],
    'abs': ['abs', 'controle de estabilidade', 'luz do abs', 'sistema de frenagem assistida']
}

def aplicar_pesos(falha_cliente, falha_banco):
    peso_adicional = 0
    for palavra, sinonimos in freio_sinonimos.items():
        for sinonimo in sinonimos:
            if sinonimo in falha_cliente.lower() and palavra in falha_banco.lower():
                peso_adicional += 20
    return peso_adicional

def get_db_connection():
    """
    Estabelece conexão com o banco de dados Oracle.
    Retorna um objeto de conexão ou None em caso de falha.
    """
    try:
        dsn_tns = cx_Oracle.makedsn(
            os.getenv('DB_HOST'),
            os.getenv('DB_PORT'),
            service_name=os.getenv('DB_SERVICE')
        )
        connection = cx_Oracle.connect(
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            dsn=dsn_tns
        )
        return connection
    except cx_Oracle.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def buscar_falha(marca, modelo, ano, versao, falha_cliente):
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        if conn is None:
            return None

        cursor = conn.cursor()
        query = """
        SELECT 
            falha, 
            solucao, 
            pecas, 
            valor
        FROM Falha_Solucao
        WHERE LOWER(marca) = :marca
          AND LOWER(modelo) = :modelo
          AND ano = :ano
          AND LOWER(versao) = :versao
        """
        cursor.execute(query, {
            'marca': marca.lower().strip(),
            'modelo': modelo.lower().strip(),
            'ano': ano,
            'versao': versao.lower().strip()
        })
        resultados = cursor.fetchall()

        if not resultados:
            return None

        melhor_correspondencia = None
        maior_score = 0
        for resultado in resultados:
            falha_banco = resultado[0]
            score = fuzz.token_set_ratio(falha_cliente.lower(), falha_banco.lower())
            score += aplicar_pesos(falha_cliente, falha_banco)

            if score > maior_score:
                melhor_correspondencia = {
                    'falha': falha_banco,
                    'solucao': resultado[1],
                    'pecas': resultado[2],
                    'valor': resultado[3]
                }
                maior_score = score

        return melhor_correspondencia if maior_score > 29 else None

    except Exception as e:
        print(f"Ocorreu um erro na função buscar_falha: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
