"use client";
import { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Simulação de progresso
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);

    // Quando o progresso chega a 100%, o carregamento termina
    if (progress === 100) {
      setLoading(false);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {loading ? (
        <div className="flex flex-col items-center w-3/4">
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
            />
          </div>
          <p className="text-lg mt-4">{progress}% Carregado...</p>
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Carregado!</h1>
      )}
    </div>
  );
}
