"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import { FaBullhorn, FaUsers, FaCalendarAlt, FaBriefcase, FaUserTie, FaHandshake, FaBolt } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Aviso {
  id: string;
  categoria: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Buscar avisos e usuários em paralelo
        const [avisosRes, usersRes] = await Promise.all([
          fetch('/api/avisos', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }),
          fetch('/api/users', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
        ]);

        const avisosData = await avisosRes.json();
        const usersData = await usersRes.json();

        setAvisos(avisosData);
        setUsers(usersData);
        
        console.log(`📊 Dashboard carregado: ${avisosData.length} avisos, ${usersData.length} usuários`);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      loadData();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'ADMIN') {
    redirect('/membros-area');
  }

  const avisosUrgentes = avisos.filter(a => a.categoria === 'urgente').length;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      {/* Header Interno */}
      <InternalHeader user={session?.user} />

      {/* Banner Admin */}
      <section className="w-full bg-gradient-to-b from-[#2563eb] to-[#1e40af] py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FaBolt className="text-4xl" />
                <h1 className="text-4xl font-bold">Painel Administrativo</h1>
              </div>
              <p className="text-xl opacity-90">
                Gerencie avisos, usuários e configurações do sistema
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  ADMIN
                </span>
                <span className="text-sm opacity-75">{session?.user?.name}</span>
              </div>
            </div>
            
            <Link
              href="/membros-area"
              className="px-6 py-3 bg-white text-[#2563eb] rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              ← Área de Membros
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="w-full max-w-6xl mx-auto px-5 -mt-8 mb-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando estatísticas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Total de Avisos</p>
                  <p className="text-4xl font-bold text-gray-900">{avisos.length}</p>
                </div>
                <FaBullhorn className="text-5xl text-[#3773B5]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Total de Usuários</p>
                  <p className="text-4xl font-bold text-gray-900">{users.length}</p>
                </div>
                <FaUsers className="text-5xl text-[#3773B5]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Avisos Urgentes</p>
                  <p className="text-4xl font-bold text-gray-900">{avisosUrgentes}</p>
                </div>
                <FaBullhorn className="text-5xl text-red-600" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Ações Administrativas */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 pb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ações Administrativas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/avisos"
            className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
          >
            <FaBullhorn className="text-6xl mb-4 text-[#3773B5] group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerenciar Avisos</h3>
            <p className="text-gray-600 mb-4">Criar, editar e excluir avisos para membros</p>
            <span className="text-[#3773B5] font-medium group-hover:underline">
              Acessar →
            </span>
          </Link>

          <Link
            href="/admin/usuarios"
            className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
          >
            <FaUsers className="text-6xl mb-4 text-[#3773B5] group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerenciar Usuários</h3>
            <p className="text-gray-600 mb-4">Criar e gerenciar contas de usuários</p>
            <span className="text-[#3773B5] font-medium group-hover:underline">
              Acessar →
            </span>
          </Link>

          <Link
            href="/admin/compromissos"
            className="bg-white p-8 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
          >
            <FaCalendarAlt className="text-6xl mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Compromissos</h3>
            <p className="text-gray-600 mb-4">Agendar reuniões e eventos da diretoria</p>
            <span className="text-gray-500 font-medium">Em breve</span>
          </Link>

          <Link
            href="/admin/projetos"
            className="bg-white p-8 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
          >
            <FaBriefcase className="text-6xl mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Projetos</h3>
            <p className="text-gray-600 mb-4">Gerenciar projetos do Insper Code</p>
            <span className="text-gray-500 font-medium">Em breve</span>
          </Link>

          <Link
            href="/admin/equipe"
            className="bg-white p-8 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
          >
            <FaUserTie className="text-6xl mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Equipe</h3>
            <p className="text-gray-600 mb-4">Atualizar membros da diretoria</p>
            <span className="text-gray-500 font-medium">Em breve</span>
          </Link>

          <Link
            href="/admin/parceiros"
            className="bg-white p-8 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
          >
            <FaHandshake className="text-6xl mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Parceiros</h3>
            <p className="text-gray-600 mb-4">Gerenciar logos e links de parceiros</p>
            <span className="text-gray-500 font-medium">Em breve</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
