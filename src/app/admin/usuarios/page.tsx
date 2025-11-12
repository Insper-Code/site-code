"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsuariosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log(`👥 Carregados ${data.length} usuários`);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      loadUsers();
    }
  }, [status]);

  const handleEdit = (userId: string) => {
    router.push(`/admin/usuarios/${userId}/editar`);
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (session?.user?.id === userId) {
      toast.error("Você não pode excluir sua própria conta");
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?\n\nEle será deslogado imediatamente e não poderá mais acessar o sistema.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Usuário excluído com sucesso! Ele foi deslogado automaticamente.");
        loadUsers(); // Recarregar lista
      } else {
        const data = await response.json();
        toast.error(data.error || "Erro ao excluir usuário");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

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

  const getRoleBadge = (role: string) => {
    const config = {
      ADMIN: { bg: 'bg-red-100 text-red-800', label: 'Admin' },
      MEMBRO: { bg: 'bg-blue-100 text-blue-800', label: 'Membro' },
      VISITANTE: { bg: 'bg-gray-100 text-gray-800', label: 'Visitante' },
    };
    
    const roleConfig = config[role as keyof typeof config] || config.VISITANTE;
    
    return (
      <span className={`${roleConfig.bg} px-3 py-1 rounded-full text-xs font-semibold`}>
        {roleConfig.label}
      </span>
    );
  };

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
              <h1 className="text-4xl font-bold mb-2">Gerenciar Usuários</h1>
              <p className="text-lg opacity-90">
                Visualize, crie, edite e exclua usuários do sistema
              </p>
            </div>
            
            <Link
              href="/admin/usuarios/novo"
              className="px-6 py-3 bg-white text-[#3773B5] rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              + Novo Usuário
            </Link>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3773B5] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando usuários...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center gap-1"
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.name)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1"
                          disabled={session?.user?.id === user.id}
                        >
                          <FaTrash /> Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
