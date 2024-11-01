from flask import Flask, jsonify, request
import cx_Oracle

app = Flask(__name__)

db_config = {
    'user': 'rm557808',
    'password': '021093',
    'dsn': 'oracle.fiap.com.br:1521/orcl'
}

def connect_db():
    try:
        connection = cx_Oracle.connect(**db_config)
        print("Connected to the database successfully.")
        return connection
    except cx_Oracle.DatabaseError as e:
        print("Database connection failed:", e)
        return None

# GET - Listar todas as oficinas credenciadas
@app.route('/oficinas', methods=['GET'])
def get_oficinas():
    connection = connect_db()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM oficinas_credenciadas")
        rows = cursor.fetchall()
        print("Fetched oficinas data:", rows)
        oficinas = [dict(id=row[0], empresa=row[1], contato=row[2], telefone=row[3], email=row[4], cidade=row[5]) for row in rows]
        return jsonify(oficinas)
    except Exception as e:
        print("Error fetching oficinas:", e)
        return jsonify({'error': 'Failed to fetch oficinas'}), 500
    finally:
        connection.close()
        print("Database connection closed.")

# POST - Criar uma nova oficina credenciada
@app.route('/oficinas', methods=['POST'])
def create_oficina():
    data = request.json
    print("Received data for new oficina creation:", data)
    connection = connect_db()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    try:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO oficinas_credenciadas (empresa, contato, telefone, email, cidade) VALUES (:empresa, :contato, :telefone, :email, :cidade)",
            empresa=data['empresa'], contato=data['contato'], telefone=data['telefone'], email=data['email'], cidade=data['cidade']
        )
        connection.commit()
        print("Oficina created successfully.")
        return jsonify({'message': 'Oficina created successfully'}), 201
    except Exception as e:
        print("Error creating oficina:", e)
        return jsonify({'error': 'Failed to create oficina'}), 500
    finally:
        connection.close()
        print("Database connection closed.")

# PUT - Atualizar uma oficina credenciada existente
@app.route('/oficinas/<int:oficina_id>', methods=['PUT'])
def update_oficina(oficina_id):
    data = request.json
    print("Received data for oficina update:", data)
    connection = connect_db()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    try:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE oficinas_credenciadas SET empresa = :empresa, contato = :contato, telefone = :telefone, email = :email, cidade = :cidade WHERE id = :id",
            empresa=data['empresa'], contato=data['contato'], telefone=data['telefone'], email=data['email'], cidade=data['cidade'], id=oficina_id
        )
        connection.commit()
        print("Oficina updated successfully.")
        return jsonify({'message': 'Oficina updated successfully'}), 200
    except Exception as e:
        print("Error updating oficina:", e)
        return jsonify({'error': 'Failed to update oficina'}), 500
    finally:
        connection.close()
        print("Database connection closed.")

# DELETE - Excluir uma oficina credenciada
@app.route('/oficinas/<int:oficina_id>', methods=['DELETE'])
def delete_oficina(oficina_id):
    print("Received request to delete oficina with ID:", oficina_id)
    connection = connect_db()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM oficinas_credenciadas WHERE id = :id", id=oficina_id)
        connection.commit()
        print("Oficina deleted successfully.")
        return jsonify({'message': 'Oficina deleted successfully'}), 200
    except Exception as e:
        print("Error deleting oficina:", e)
        return jsonify({'error': 'Failed to delete oficina'}), 500
    finally:
        connection.close()
        print("Database connection closed.")

if __name__ == '__main__':
    app.run(port=5002)

