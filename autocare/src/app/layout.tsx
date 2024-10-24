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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
