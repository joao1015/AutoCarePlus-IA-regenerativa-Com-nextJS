import type { Metadata } from "next";
import './globals.css';

import Cabecalho from "@/Components/Cabecalho"; // Importando o cabeçalho
import Rodape from "@/Components/Rodape"; // Importando o rodapé

export const metadata: Metadata = {
  title: "AutoCarePlus - Seu Sistema Inteligente para Oficinas",
  description: "Revolucionando o Acesso a Sistemas Automatizados para Oficinas",
  icons: {
    icon: "/images/LogoMeta.png", // Caminho para o favicon
  },
};


export const viewport = {
  initialScale: 1.0,
  width: "device-width",
  colorScheme: "dark"
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Definindo o tipo de children
}) {
  return (
    <html lang="pt-br">
      <head>
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
