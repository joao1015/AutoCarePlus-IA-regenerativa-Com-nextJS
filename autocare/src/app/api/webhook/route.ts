import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Lê os dados enviados na requisição

    console.log("Dados recebidos:", data);

    // Retorna uma resposta de sucesso
    return NextResponse.json({ message: "Webhook recebido com sucesso" });
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return NextResponse.json(
      { message: "Erro ao processar o webhook" },
      { status: 500 },
    );
  }
}

// Método alternativo para outros tipos de requisição, se necessário
export function GET() {
  return NextResponse.json(
    { message: "Método GET não é suportado para esta rota" },
    { status: 405 },
  );
}
