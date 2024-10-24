import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center p-5">
      <h1 className="text-3xl mb-5">404: Page Not Found</h1>
      <p className="text-xl mb-7">
        O conteúdo que você está tentando acessar não está disponível!
      </p>
      <Image 
        src="/images/404image.png"  // Caminho relativo à pasta public
        alt="Rocket Broken"
        width={600}
        height={600}
        priority={true}
      />
    </div>
  );
}

