import HOME from "@/Components/ApresentacaoCliente";
import Image from "next/image";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AutoCarePlus - Seu Sistema Inteligente para Oficinas",
  description: "Revolucionando o Acesso a Sistemas Automatizados para Oficinas",
  icons: {
    icon: "/images/LogoMeta.png", // Caminho para o favicon
}};

export default function Home() {
  return (
  <HOME></HOME>
   
  );
}
