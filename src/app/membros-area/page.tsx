"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import { FaUsers, FaLaptopCode, FaBook } from "react-icons/fa";

export default function MembrosAreaPage() {
  const { data: session, status } = useSession();
  const [avisosCount, setAvisosCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvisos = async () => {
      try {
        const response = await fetch('/api/avisos', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        const data = await response.json();
        setAvisosCount(data.length);
        console.log(`📋 [Membros-Area] ${data.length} avisos disponíveis`);
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
      {/* Header Interno */}
      <InternalHeader user={session?.user} />

      {/* Banner de Boas-vindas */}
      <section className="w-full bg-gradient-to-b from-[#3773B5] to-[#275483] py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Bem-vindo, {session?.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-xl opacity-90">
                Esta é sua área exclusiva de membros do Insper Code
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {session?.user?.role}
                </span>
                <span className="text-sm opacity-75">{session?.user?.email}</span>
              </div>
            </div>
            
            {session?.user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-6 py-3 bg-white text-[#3773B5] rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Painel Admin →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 py-12">
        {/* Cards de Navegação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/membros"
            className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
          >
            <FaUsers className="text-5xl mb-4 text-[#3773B5] group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Equipe</h3>
            <p className="text-gray-600">Conheça todos os membros da diretoria atual</p>
          </Link>

          <Link
            href="/membros-area/projetos"
            className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
          >
            <FaLaptopCode className="text-5xl mb-4 text-[#3773B5] group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Projetos</h3>
            <p className="text-gray-600">Acesse e gerencie os projetos do Code</p>
          </Link>

          <Link
            href="/membros-area/recursos"
            className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
          >
            <FaBook className="text-5xl mb-4 text-[#3773B5] group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recursos</h3>
            <p className="text-gray-600">Materiais, tutoriais e documentação</p>
          </Link>
        </div>

        {/* Link para Avisos */}
        <Link href="/membros-area/avisos" className="block">
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Avisos e Comunicados</h2>
                <p className="text-gray-600">Fique por dentro das novidades e comunicados importantes</p>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3773B5]"></div>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-[#3773B5] mb-2">{avisosCount}</div>
                    <p className="text-sm text-gray-600">{avisosCount === 1 ? 'aviso' : 'avisos'}</p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <span className="text-[#3773B5] font-medium hover:underline">
                Ver todos os avisos →
              </span>
            </div>
          </div>
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
