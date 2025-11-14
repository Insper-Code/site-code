"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NovoUsuarioPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MEMBRO">("MEMBRO");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Erro ao criar usuário");
        return;
      }

      toast.success("Usuário criado com sucesso!");
      router.push("/admin/usuarios");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao criar usuário");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
          <div className="mb-8">
            <Link
              href="/admin/usuarios"
              className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
            >
              ← Voltar para Usuários
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Usuário</h1>
            <p className="text-gray-600">
              Preencha os campos abaixo para criar uma nova conta de membro ou admin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Nome Completo *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="text-base py-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="joao.silva@insper.edu.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="text-base py-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-base font-semibold">
                Função *
              </Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "ADMIN" | "MEMBRO")}
                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3773B5]"
                disabled={isLoading}
              >
                <option value="MEMBRO">Membro - Acesso padrão</option>
                <option value="ADMIN">Admin - Acesso total ao sistema</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">
                  Senha *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="text-base py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-semibold">
                  Confirmar Senha *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="text-base py-3"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#3773B5] hover:bg-[#275483] text-white py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Criando usuário..." : "Criar Usuário"}
              </Button>
              
              <Link href="/admin/usuarios" className="flex-1">
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

