import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:5002/oficinas';

async function fetchFromAPI(endpoint: string, options = {}) {
  try {
    console.log(`Making request to ${API_BASE_URL}${endpoint} with options:`, options);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(`Response from ${API_BASE_URL}${endpoint}:`, data);
    return { data, status: response.status };
  } catch (error) {
    console.error(`Error in fetchFromAPI with endpoint ${endpoint}:`, error);
    return { error: 'Failed to connect to the backend service', status: 500 };
  }
}

// GET - Listar todas as oficinas credenciadas
export async function GET() {
  const { data, status } = await fetchFromAPI('');
  if (status !== 200) {
    console.error('Failed to fetch oficinas list:', data);
    return NextResponse.json({ error: 'Failed to fetch oficinas list', details: data }, { status });
  }
  console.log('Fetched oficinas data:', data);
  return NextResponse.json(data);
}

// POST - Criar uma nova oficina credenciada
export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  console.log("Received data for creating a new oficina:", requestBody);

  const { data, status } = await fetchFromAPI('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (status !== 201) {
    console.error('Failed to create oficina:', data);
    return NextResponse.json({ error: 'Failed to create oficina', details: data }, { status });
  }

  return NextResponse.json(data, { status });
}

// PUT - Atualizar uma oficina credenciada existente
export async function PUT(req: NextRequest) {
  const requestBody = await req.json();
  console.log("Received data for updating an oficina:", requestBody);

  const { data, status } = await fetchFromAPI(`/${requestBody.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (status !== 200) {
    console.error('Failed to update oficina:', data);
    return NextResponse.json({ error: 'Failed to update oficina', details: data }, { status });
  }

  return NextResponse.json(data, { status });
}

// DELETE - Excluir uma oficina credenciada
export async function DELETE(req: NextRequest) {
  const requestBody = await req.json();
  console.log("Received data for deleting an oficina:", requestBody);

  const { data, status } = await fetchFromAPI(`/${requestBody.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (status !== 200) {
    console.error('Failed to delete oficina:', data);
    return NextResponse.json({ error: 'Failed to delete oficina', details: data }, { status });
  }

  return NextResponse.json(data, { status });
}
