import type { Metadata } from "next";

import "./globals.css";
import Cabecalho from "@/Components/Cabecalho";
import Rodape from "@/Components/Rodape";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="Pt-br">
      <body>
        <Cabecalho></Cabecalho>
        {children}
      <Rodape></Rodape>
      
      </body>
    </html>
  );
}
