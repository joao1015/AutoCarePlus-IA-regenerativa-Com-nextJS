"use client"; // Adicione isso no topo do arquivo

import styled from 'styled-components';
import Image from 'next/image'; // Para otimizar as imagens no Next.js
import Arthur from './Imagens/Foto-Arthur.jpg';
import Joao from './Imagens/Foto-Joao.jpg';
import Paulo from './Imagens/Carpina.jpeg';

const ProfileStory = styled.span`
  background-color: rgba(255, 255, 255, 0.8);
  color: rgb(0, 0, 0);
  font-size: 22px;
  padding: 10px;
  border-radius: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-sizing: border-box;
  white-space: normal;
  font-family: 'Poppins', sans-serif;
  border: 1px solid black;
  z-index: 10;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 50%;
  margin-top: 1cm;
`;

const Main = styled.main`
  padding: 36px;
  text-align: center;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  font-family: 'Poppins', sans-serif;
  margin-top: 2cm;
  width: 100%;
  height: 100%;
`;

const Texto1 = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000000;
  font-family: 'Poppins', sans-serif;
`;

const FraseDestaque = styled.span`
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #ff0000;
  margin: 10px 0;
  font-family: 'Poppins', sans-serif;
`;

const P = styled.p`
  font-size: 33px;
  color: #000000;
  margin: 10px 0 20px;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin: 30px 0;
  align-items: center;

  &:hover ${ProfileStory} {
    opacity: 1;
  }

  &:hover .profile-img {
    transform: scale(1.1);
  }
`;

const ProfileImg = styled(Image)`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
`;

const Link = styled.a`
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
  margin: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

function Sobrenos() {
  return (
    <div>
      <Main role="main">
        <Texto1>Bem-vindo à MetaMind!</Texto1>
        <FraseDestaque>
          A MetaMind é uma consultoria que visa resolver problemas do cotidiano utilizando tecnologia.
        </FraseDestaque>
        <P>Conheça um pouco do nosso time:</P>

        <Container>
          <BoxesContainer>
            {/* Perfil 1 - Arthur */}
            <ProfileContainer role="complementary">
              <ProfileImg src={Arthur} alt="foto do Arthur Bispo" className="profile-img" width={250} height={250} />
              <ProfileStory>
                Arthur Bispo de Lima é apaixonado por desenvolvimento web e tem experiência em projetos de sustentabilidade. Ele adora desafios e está sempre buscando aprender algo novo.
              </ProfileStory>
              <Text>
                <p>Arthur Bispo de Lima</p>
                <p>RM: 557568</p>
                <p>TURMA: 1TDSPV</p>
                <Link href="https://github.com/ArthurBispo00?tab=repositories" aria-label="GitHub do Arthur">
                  GitHub Arthur
                </Link>
                <Link href="https://github.com/ArthurBispo00/Sprint1-Front" aria-label="Repositório do Projeto">
                  Repositório do Projeto
                </Link>
              </Text>
            </ProfileContainer>

            {/* Perfil 2 - João Paulo Moreira */}
            <ProfileContainer role="complementary">
              <ProfileImg src={Joao} alt="foto do João Paulo Moreira" className="profile-img" width={250} height={250} />
              <ProfileStory>
                João Paulo Moreira dos Santos é entusiasta de tecnologia e meio ambiente. Ele acredita que a inovação pode ser uma grande aliada na preservação dos recursos naturais.
              </ProfileStory>
              <Text>
                <p>João Paulo Moreira dos Santos</p>
                <p>RM: 557808</p>
                <p>TURMA: 1TDSPV</p>
                <Link href="https://github.com/joao1015?tab=repositories" aria-label="GitHub do João Paulo">
                  GitHub João Paulo
                </Link>
                <Link href="https://github.com/ArthurBispo00/Sprint1-Front" aria-label="Repositório do Projeto">
                  Repositório do Projeto
                </Link>
              </Text>
            </ProfileContainer>

            {/* Perfil 3 - Paulo André Carminati */}
            <ProfileContainer role="complementary">
              <ProfileImg src={Paulo} alt="foto de Paulo André Carminati" className="profile-img" width={250} height={250} />
              <ProfileStory>
                Paulo André Carminati tem uma visão inovadora sobre soluções ambientais. Ele está sempre à procura de maneiras criativas para resolver problemas complexos.
              </ProfileStory>
              <Text>
                <p>Paulo André Carminati</p>
                <p>RM: 557881</p>
                <p>TURMA: 1TDSPZ</p>
                <Link href="https://github.com/carmipa" aria-label="GitHub do Paulo André">
                  GitHub Paulo André
                </Link>
                <Link href="https://github.com/ArthurBispo00/Projeto_Oceanos_Limpos" aria-label="Repositório do Projeto">
                  Repositório do Projeto
                </Link>
              </Text>
            </ProfileContainer>
          </BoxesContainer>
        </Container>
      </Main>
    </div>
  );
}

export default Sobrenos;
