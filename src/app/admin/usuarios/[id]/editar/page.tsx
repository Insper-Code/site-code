"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import toast from "react-hot-toast";

export default function EditarUsuarioPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBRO" as "ADMIN" | "MEMBRO",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      loadUser();
    }
  }, [status]);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`);
      if (response.ok) {
        const user = await response.json();
        setFormData({
          name: user.name,
          email: user.email,
          password: "", // Não carregar senha
          role: user.role,
        });
      } else {
        toast.error("Erro ao carregar usuário");
        router.push("/admin/usuarios");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      toast.error("Erro ao carregar usuário");
      router.push("/admin/usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEditingSelf = session?.user?.id === userId;
    const isChangingPassword = formData.password && formData.password.trim() !== '';

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Usuário atualizado com sucesso!");
        
        // Se editou a si mesmo
        if (isEditingSelf) {
          if (isChangingPassword) {
            // Se mudou a própria senha, fazer logout
            toast.success("Sua senha foi alterada. Faça login novamente.", { duration: 4000 });
            setTimeout(() => {
              window.location.href = '/api/auth/signout?callbackUrl=/login';
            }, 1500);
            return;
          } else {
            // Se só mudou nome/email, atualizar sessão
            await update();
            toast.success("Sua sessão foi atualizada!");
          }
        } else if (isChangingPassword) {
          // Se mudou a senha de outro usuário, avisar que ele será deslogado
          toast.success("Senha alterada! O usuário precisará fazer login novamente.");
        }
        
        router.push("/admin/usuarios");
      } else {
        const data = await response.json();
        toast.error(data.error || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || isLoading) {
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
      <InternalHeader user={session?.user} />

      {/* Banner */}
      <section className="w-full bg-gradient-to-b from-[#3773B5] to-[#275483] py-12 px-5">
        <div className="max-w-4xl mx-auto text-white">
          <Link
            href="/admin/usuarios"
            className="text-sm opacity-75 hover:opacity-100 mb-2 inline-block"
          >
            ← Voltar para Gerenciar Usuários
          </Link>
          <h1 className="text-4xl font-bold mb-2">Editar Usuário</h1>
          <p className="text-lg opacity-90">
            Atualize as informações do usuário
          </p>
        </div>
      </section>

      {/* Formulário */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                placeholder="Ex: João Silva"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                placeholder="usuario@code.insper.edu.br"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Nova Senha (deixe em branco para não alterar)
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500 mt-1">
                Mínimo de 6 caracteres
              </p>
            </div>

            {/* Função */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Função
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "ADMIN" | "MEMBRO" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                required
              >
                <option value="MEMBRO">Membro</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#3773B5] text-white rounded-md font-semibold hover:bg-[#275483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
              <Link
                href="/admin/usuarios"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

