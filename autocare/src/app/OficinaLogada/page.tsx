import Sidebar from "@/Components/Sideoficinas";
import Image from "next/image";

export default function Oficina() {
  return (
    <div className="flex">
      <div className="w-[14%] h-screen bg-black p-10">
        <Sidebar />
      </div>
      <div className="flex-grow flex items-center justify-center bg-gray-100 h-screen">
        <div className="text-center max-w-xl p-10">
          <h1 className="text-4xl font-bold mb-4">
            Gerencie sua Oficina de Forma Completa!
          </h1>
          <p className="text-lg mb-4">
            Aqui você tem o controle total de sua oficina, podendo acompanhar todas as ordens de 
            serviço em um único lugar. Visualize ordens recebidas, em andamento e finalizadas de 
            maneira rápida e prática, e acesse detalhes importantes de cada uma delas.
          </p>
          <p className="text-lg mb-4">
            Também é possível conferir as garantias associadas às ordens finalizadas, proporcionando 
            um atendimento de pós-serviço de qualidade e a satisfação dos seus clientes.
          </p>
          <p className="text-lg font-bold text-blue-600">
            Navegue pelo menu ao lado e descubra como simplificar o gerenciamento da sua oficina!
          </p>
        </div>
      </div>
    </div>
  );
}
