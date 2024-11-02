"use client"; // Adicione isso no topo do arquivo

import { useState, useEffect } from 'react';
import Image from 'next/image';

import image1 from './imagens/Banner AutoCarePlus.png';
import image2 from './imagens/Manutenção Corretiva.png';
import image3 from './imagens/Manutenção Preventiva.png';
import image4 from './imagens/Melhores Peças.png';
import image5 from './imagens/Troca de Óleo.png';
import testimonial1 from './imagens/Depoimento 1.png';
import testimonial2 from './imagens/Depoimento 2.png';
import testimonial3 from './imagens/Depoimento 3.png';
import tip1 from './imagens/DICA 1.png'; 
import tip2 from './imagens/DICA 2.png'; 
import tip3 from './imagens/DICA 3.png'; 
import tip4 from './imagens/DICA 4.png'; 

const HomePage: React.FC = () => {
  const slides = [
    { image: image1, title: "Banner AutoCarePlus", description: "Transforme a gestão da sua oficina com nossa plataforma completa." },
    { image: image2, title: "Manutenção Corretiva", description: "Soluções rápidas para problemas inesperados nos veículos." },
    { image: image3, title: "Manutenção Preventiva", description: "Prevenção é o melhor caminho. Mantenha seus veículos em dia." },
    { image: image4, title: "Melhores Peças", description: "Trabalhamos apenas com as melhores peças do mercado." },
    { image: image5, title: "Troca de Óleo", description: "Oferecemos serviços especializados de troca de óleo." }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section className="flex flex-col items-center py-16 text-center bg-gray-100 w-full">
        <h2 className="text-[1.5cm] mb-4 text-black font-bold">
          Bem Vindo a AutoCarePlus
        </h2>
        <p className="text-[0.5cm] mb-4 text-black font-bold">
          Utilize Inteligência Artificial para diagnosticar falhas no seu veículo em tempo real, obter o valor do reparo e encontrar as oficinas mais próximas para realizar o serviço.
        </p>
</section>


  {/* Carousel Section */}
  <section className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 w-full h-full py-16">
    <div className="flex-1 pl-4 text-white">
      <h2 className="text-[1cm] mb-4">{slides[currentImageIndex].title}</h2>
      <p className="text-[0.75cm]">{slides[currentImageIndex].description}</p>
    </div>
    <div className="flex-1 ml-4">
      <Image
        src={slides[currentImageIndex].image}
        alt={slides[currentImageIndex].title}
        width={800}
        height={600}
        className="shadow-lg rounded-lg"
      />
    </div>
  </section>

  {/* Buttons for Carousel */}
  <div className="flex justify-center mt-8 mb-8">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-5 h-5 rounded-full mx-2 ${
          index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-400'
        } transition-all duration-300 hover:scale-110`}
      />
    ))}
  </div>

      <section className="py-16 px-8 text-center bg-gradient-to-r from-black-400 via-black-500 to-blue-600 text-white">
  <h3 className="text-[1.5rem] mb-4 font-semibold">Com a AutoCarePlus, você tem:</h3>
  <p className="text-[1rem] max-w-3xl mx-auto mb-4">
    Assistência completa para realizar manutenções corretivas e preventivas, além de contar com uma rede de oficinas credenciadas e a segurança de utilizar peças novas ou renovadas com garantia.
  </p>
  <a
    href="AreadoCliente"
    className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg text-[1.25rem] font-bold mx-auto mt-8 hover:bg-gradient-to-r hover:from-green-500 hover:to-red-600 transition-all duration-300"
  >
    Área do Cliente
  </a>
</section>


      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h3 className="text-[1.5rem] mb-8">O que nossos clientes dizem:</h3>
        <div className="flex justify-center flex-wrap gap-8">
          {[testimonial1, testimonial2, testimonial3].map((testimonial, index) => (
            <div key={index} className="w-64 flex flex-col items-center">
              <Image src={testimonial} alt={`Depoimento Cliente ${index + 1}`} width={250} height={250} className="rounded-lg mb-4" />
              <p className="text-[1rem] text-gray-700 text-center">"A plataforma ajudou muito a encontrar uma oficina de confiança."</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-8 bg-gray-300 text-center">
        <h3 className="text-[1.5rem] mb-8">Dicas de Manutenção:</h3>
        <div className="flex justify-around flex-wrap gap-8">
          {[tip1, tip2, tip3, tip4].map((tip, index) => (
            <div key={index} className="w-[22%] bg-white p-4 rounded-lg shadow-lg text-center">
              <Image src={tip} alt={`Dica ${index + 1}`} width={250} height={150} className="rounded-lg mb-4" />
              <h4 className="text-[1.25rem] mb-2">Dica {index + 1}</h4>
              <p className="text-[1rem] text-gray-700">Mantenha o óleo do seu carro sempre em dia para evitar problemas.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
