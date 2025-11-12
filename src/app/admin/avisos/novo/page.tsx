"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NovoAvisoPage() {
  const router = useRouter();
  
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState<"urgente" | "importante" | "informativo">("informativo");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/avisos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, conteudo, categoria }),
      });

      if (response.ok) {
        toast.success("Aviso criado com sucesso!");
        router.push("/admin/avisos");
        router.refresh();
      } else {
        toast.error("Erro ao criar aviso");
      }
    } catch (error) {
      toast.error("Erro ao criar aviso");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-5">
      <div className="w-full max-w-3xl">
        {/* Card Principal */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
          <div className="mb-8">
            <Link
              href="/admin/avisos"
              className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
            >
              ← Voltar para Avisos
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Aviso</h1>
            <p className="text-gray-600">
              Preencha os campos abaixo para criar um novo aviso para os membros
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-base font-semibold">
                Título do Aviso *
              </Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Ex: Reunião importante na segunda-feira"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                disabled={isLoading}
                className="text-base py-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-base font-semibold">
                Categoria *
              </Label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as "urgente" | "importante" | "informativo")}
                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3773B5]"
                disabled={isLoading}
              >
                <option value="informativo">Informativo - Comunicados gerais</option>
                <option value="importante">Importante - Atenção necessária</option>
                <option value="urgente">Urgente - Ação imediata</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conteudo" className="text-base font-semibold">
                Conteúdo do Aviso *
              </Label>
              <textarea
                id="conteudo"
                placeholder="Digite o conteúdo completo do aviso..."
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                required
                rows={10}
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-base ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3773B5] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500">
                Escreva de forma clara e objetiva. Este aviso será visível para todos os membros.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#3773B5] hover:bg-[#275483] text-white py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Criando aviso..." : "Criar Aviso"}
              </Button>
              
              <Link href="/admin/avisos" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-3 text-base"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
