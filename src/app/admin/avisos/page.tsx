"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import { AvisoCardAdmin } from "@/components/avisos/AvisoCardAdmin";
import { Aviso } from "@/lib/types/avisos";

export default function AdminAvisosPage() {
  const { data: session, status } = useSession();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(`📋 Carregados ${data.length} avisos`);
    } catch (error) {
      console.error('Erro ao carregar avisos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  if (status === 'unauthenticated' || session?.user?.role !== 'ADMIN') {
    redirect('/membros-area');
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      {/* Header Interno */}
      <InternalHeader user={session?.user} />

      {/* Banner */}
      <section className="w-full bg-gradient-to-b from-[#3773B5] to-[#275483] py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between text-white">
            <div>
              <Link
                href="/admin"
                className="text-sm opacity-75 hover:opacity-100 mb-2 inline-block"
              >
                ← Voltar ao Dashboard
              </Link>
              <h1 className="text-4xl font-bold mb-2">Gerenciar Avisos</h1>
              <p className="text-lg opacity-90">
                Crie e gerencie avisos para os membros
              </p>
            </div>
            
            <Link
              href="/admin/avisos/novo"
              className="px-6 py-3 bg-white text-[#3773B5] rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              + Novo Aviso
            </Link>
          </div>
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
              <AvisoCardAdmin 
                key={aviso.id} 
                aviso={aviso} 
                onDelete={loadAvisos}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 text-center py-16">
            <div className="text-7xl mb-4">📭</div>
            <p className="text-xl text-gray-600 mb-4">Nenhum aviso cadastrado</p>
            <Link
              href="/admin/avisos/novo"
              className="inline-block px-6 py-3 bg-[#3773B5] text-white rounded-md font-semibold hover:bg-[#275483] transition-colors"
            >
              Criar Primeiro Aviso
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
