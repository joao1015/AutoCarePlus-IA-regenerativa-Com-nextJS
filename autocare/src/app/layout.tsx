import type { Metadata } from "next";
import "./globals.css";
import Cabecalho from "@/Components/Cabecalho";
import Rodape from "@/Components/Rodape";

export const metadata: Metadata = {
  title: "AutoCarePlus - Seu Sistema Inteligente para Oficinas",
  description: "Revolucionando o Acesso a Sistemas Automatizados para Oficinas",
  icons: {
    icon: "/images/LogoMeta.png", // Caminho para o favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* Adicione a meta tag viewport para responsividade */}
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
