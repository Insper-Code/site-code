"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { InternalHeader } from "@/components/layout/InternalHeader";
import { Footer } from "@/components/footer";
import toast from "react-hot-toast";

export default function EditarAvisoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const avisoId = params.id as string;

  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    categoria: "informativo" as "urgente" | "importante" | "informativo",
    autor: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      loadAviso();
    }
  }, [status]);

  const loadAviso = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/avisos/${avisoId}`);
      if (response.ok) {
        const aviso = await response.json();
        setFormData({
          titulo: aviso.titulo,
          conteudo: aviso.conteudo,
          categoria: aviso.categoria,
          autor: aviso.autor,
        });
      } else {
        toast.error("Erro ao carregar aviso");
        router.push("/admin/avisos");
      }
    } catch (error) {
      console.error("Erro ao carregar aviso:", error);
      toast.error("Erro ao carregar aviso");
      router.push("/admin/avisos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/avisos/${avisoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Aviso atualizado com sucesso!");
        router.push("/admin/avisos");
      } else {
        const data = await response.json();
        toast.error(data.error || "Erro ao atualizar aviso");
      }
    } catch (error) {
      console.error("Erro ao atualizar aviso:", error);
      toast.error("Erro ao atualizar aviso");
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
            href="/admin/avisos"
            className="text-sm opacity-75 hover:opacity-100 mb-2 inline-block"
          >
            ← Voltar para Gerenciar Avisos
          </Link>
          <h1 className="text-4xl font-bold mb-2">Editar Aviso</h1>
          <p className="text-lg opacity-90">
            Atualize as informações do aviso
          </p>
        </div>
      </section>

      {/* Formulário */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
                Título do Aviso
              </label>
              <input
                type="text"
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                placeholder="Ex: Reunião semanal da diretoria"
                required
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label htmlFor="conteudo" className="block text-sm font-semibold text-gray-700 mb-2">
                Conteúdo
              </label>
              <textarea
                id="conteudo"
                value={formData.conteudo}
                onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5] min-h-[150px]"
                placeholder="Descreva os detalhes do aviso..."
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value as typeof formData.categoria })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                required
              >
                <option value="informativo">Informativo</option>
                <option value="importante">Importante</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            {/* Autor */}
            <div>
              <label htmlFor="autor" className="block text-sm font-semibold text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                id="autor"
                value={formData.autor}
                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3773B5]"
                placeholder="Seu nome"
                required
              />
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
                href="/admin/avisos"
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

