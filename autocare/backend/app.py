from flask import Flask, request, jsonify
import cx_Oracle
from fuzzywuzzy import fuzz
import concurrent.futures

app = Flask(__name__)

# Tabela de sinônimos para ajudar na correspondência de palavras-chave importantes
freio_sinonimos = {
    'freio': ['freio', 'disco', 'pastilha', 'pinça', 'barulho ao frear', 'desgaste de freio'],
    'abs': ['abs', 'controle de estabilidade', 'luz do abs', 'sistema de frenagem assistida']
}

def aplicar_pesos(falha_cliente, falha_banco):
    # Aumentar o peso de termos relacionados a freios
    peso_adicional = 0
    for palavra, sinonimos in freio_sinonimos.items():
        for sinonimo in sinonimos:
            if sinonimo in falha_cliente.lower():
                if palavra in falha_banco.lower():
                    peso_adicional += 20  # Aumentar peso se houver correspondência de sinônimos

    return peso_adicional

def buscar_falha(marca, modelo, ano, versao, falha_cliente):
    conn = None
    cursor = None
    try:
        # Conexão ao banco de dados Oracle
        dsn_tns = cx_Oracle.makedsn('Oracle.fiap.com.br', '1521', service_name='orcl')
        conn = cx_Oracle.connect(user='rm557808', password='021093', dsn=dsn_tns)

        cursor = conn.cursor()

        # Consulta SQL
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
            score = fuzz.token_set_ratio(falha_cliente.lower(), falha_banco.lower())  # Usando token_set_ratio

            # Aplicar pesos com base nos sinônimos encontrados
            score += aplicar_pesos(falha_cliente, falha_banco)

            print(f"Comparando falha do cliente: '{falha_cliente}' com falha no banco: '{falha_banco}' - Score: {score}")

            if score > maior_score:
                melhor_correspondencia = {
                    'falha': falha_banco,
                    'solucao': resultado[1],
                    'pecas': resultado[2],
                    'valor': resultado[3]
                }
                maior_score = score

        print(f"Melhor correspondência: {melhor_correspondencia}, Score: {maior_score}")

        
        if melhor_correspondencia and maior_score > 29:
            return melhor_correspondencia
        else:
            return None

    except Exception as e:
        print(f"Ocorreu um erro na função buscar_falha: {e}")
        return None

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

def buscar_falha_com_timeout(marca, modelo, ano, versao, falha_cliente, timeout=6):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(buscar_falha, marca, modelo, ano, versao, falha_cliente)
        try:
            falha_encontrada = future.result(timeout=timeout)
            return falha_encontrada

        except concurrent.futures.TimeoutError:
            return None

@app.route('/api/teste', methods=['POST'])
def teste():
    data = request.get_json()
    print(f"Dados recebidos: {data}")

    marca = data.get('Marca', '').strip()
    modelo = data.get('Modelo', '').strip()
    versao = data.get('Versao', '').strip()
    ano = data.get('Ano')
    falha = data.get('Falha', '').strip()

    if not all([marca, modelo, versao, ano, falha]):
        return jsonify({
            'Resultado': "Parece que faltam algumas informações. Por favor, preencha todos os campos: marca, modelo, ano, versão e descrição da falha."
        }), 400

    falha_encontrada = buscar_falha_com_timeout(marca, modelo, ano, versao, falha)

    if falha_encontrada:
        diagnostico = falha_encontrada['falha']

        response_text = (
            f": Diagnóstico feito com sucesso para o veículo\n\n"
            f"Marca:'{marca.capitalize()}'\n\n"
            f"Modelo:'{modelo.capitalize()}'\n\n"
            f"Versao:'{versao.capitalize()}'\n\n"
            f"Ano:'{ano}'\n\n"
            f"Diagnóstico: Identificamos o problema relacionado a '{diagnostico}'.\n\n"
            f"Solução sugerida: {falha_encontrada['solucao']}.\n\n"
            f"Peças necessárias: {falha_encontrada['pecas']}.\n\n"
            f"Estimativa de custo: R$ {falha_encontrada['valor']:.2f}.\n\n"
            "Gostaria de agendar o serviço com uma oficina credenciada próxima a você? Nossa rede está pronta para atendê-lo e garantir que seu veículo esteja seguro e funcionando perfeitamente."
        )
    else:
        response_text = f"Não conseguimos identificar o problema exato para o veículo {marca.capitalize()} {modelo.capitalize()}, ano {ano}, versão {versao.capitalize()} no momento. Vamos agendar seu serviço em uma de nossas oficinas credenciadas para uma avaliação detalhada?"

    response = {
        'Resultado': response_text
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
