"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import { AvisoCard } from "@/components/avisos/AvisoCard";
import { FaBullhorn } from "react-icons/fa";
import { Aviso } from "@/lib/types/avisos";

export default function AvisosPage() {
  const { data: session, status } = useSession();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvisos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/avisos', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        setAvisos(data);
        console.log(`📋 [Membros] Carregados ${data.length} avisos`);
      } catch (error) {
        console.error('Erro ao carregar avisos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      loadAvisos();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3773B5]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      <InternalHeader user={session?.user} />

      {/* Banner */}
      <section className="w-full bg-gradient-to-b from-[#3773B5] to-[#275483] py-12 px-5">
        <div className="max-w-6xl mx-auto text-white">
          <Link
            href="/membros-area"
            className="text-sm opacity-75 hover:opacity-100 mb-2 inline-block"
          >
            ← Voltar para Minha Área
          </Link>
          <h1 className="text-4xl font-bold mb-2">Avisos e Comunicados</h1>
          <p className="text-lg opacity-90">
            Fique por dentro de todas as novidades e comunicados importantes
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3773B5] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando avisos...</p>
          </div>
        ) : avisos.length > 0 ? (
          <div className="space-y-4">
            {avisos.map((aviso) => (
              <AvisoCard key={aviso.id} aviso={aviso} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 text-center py-16">
            <FaBullhorn className="text-7xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Nenhum aviso no momento</p>
            <p className="text-sm text-gray-500 mt-2">Você está em dia com tudo!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
