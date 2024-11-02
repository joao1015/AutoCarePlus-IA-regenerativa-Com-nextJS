"use client"; // Adicione isso no topo do arquivo

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image'; // Importe StaticImageData
import Arthur from './Imagens/Foto-Arthur.jpg';
import Joao from './Imagens/Foto-Joao.jpg';
import Paulo from './Imagens/Carpina.jpeg';

interface ProfileCardProps {
  name: string;
  rm: string;
  turma: string;
  githubLink: string;
  projectLink: string;
  imageSrc: StaticImageData;
  description: string;
}

function Sobrenos() {
  return (
    <div>
      <main
        role="main"
        className="p-[36px] text-center bg-[#ffffff] text-[#000000] font-poppins mt-[2cm] w-full h-full"
      >
        <h1 className="text-[36px] font-bold mb-[20px] text-[#000000] font-poppins">
          Bem-vindo à MetaMind!
        </h1>
        <span className="block text-[28px] font-bold text-[#ff0000] my-[10px] font-poppins">
          A MetaMind é uma consultoria que visa resolver problemas do cotidiano utilizando tecnologia.
        </span>
        <p className="text-[33px] text-[#000000] mt-[10px] mb-[20px] leading-[1.6] font-poppins">
          Conheça um pouco do nosso time:
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-[30px]">
            {/* Perfil 1 - Arthur */}
            <ProfileCard
              name="Arthur Bispo de Lima"
              rm="557568"
              turma="1TDSPV"
              githubLink="https://github.com/ArthurBispo00?tab=repositories"
              projectLink="https://github.com/ArthurBispo00/Sprint1-Front"
              imageSrc={Arthur}
              description="Arthur Bispo de Lima é apaixonado por desenvolvimento web e tem experiência em projetos de sustentabilidade. Ele adora desafios e está sempre buscando aprender algo novo."
            />

            {/* Perfil 2 - João Paulo Moreira */}
            <ProfileCard
              name="João Paulo Moreira dos Santos"
              rm="557808"
              turma="1TDSPV"
              githubLink="https://github.com/joao1015?tab=repositories"
              projectLink="https://github.com/ArthurBispo00/Sprint1-Front"
              imageSrc={Joao}
              description="João Paulo Moreira dos Santos é entusiasta de tecnologia e meio ambiente. Ele acredita que a inovação pode ser uma grande aliada na preservação dos recursos naturais."
            />

            {/* Perfil 3 - Paulo André Carminati */}
            <ProfileCard
              name="Paulo André Carminati"
              rm="557881"
              turma="1TDSPZ"
              githubLink="https://github.com/carmipa"
              projectLink="https://github.com/ArthurBispo00/Projeto_Oceanos_Limpos"
              imageSrc={Paulo}
              description="Paulo André Carminati tem uma visão inovadora sobre soluções ambientais. Ele está sempre à procura de maneiras criativas para resolver problemas complexos."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileCard({
  name,
  rm,
  turma,
  githubLink,
  projectLink,
  imageSrc,
  description,
}: ProfileCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      role="complementary"
      className="relative flex flex-col items-center text-center font-poppins my-[30px] group"
    >
      <div
        className={`relative w-[250px] h-[250px] cursor-pointer rounded-full overflow-hidden`}
        onClick={() => setIsClicked(!isClicked)}
      >
        <Image
          src={imageSrc}
          alt={`foto de ${name}`}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110`}
          width={250}
          height={250}
        />
        <div
          className={`absolute inset-0 ${
            isClicked ? 'bg-black' : 'bg-black bg-opacity-60'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center p-[10px]`}
        >
          <p className="text-white text-[14px] px-4">{description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-[15px] font-poppins">
        <p>{name}</p>
        <p>RM: {rm}</p>
        <p>TURMA: {turma}</p>
        <a
          href={githubLink}
          aria-label={`GitHub do ${name.split(' ')[0]}`}
          className="text-[#007BFF] no-underline font-bold my-[5px] hover:underline"
        >
          GitHub {name.split(' ')[0]}
        </a>
        <a
          href={projectLink}
          aria-label="Repositório do Projeto"
          className="text-[#007BFF] no-underline font-bold my-[5px] hover:underline"
        >
          Repositório do Projeto
        </a>
      </div>
    </div>
  );
}

export default Sobrenos;
