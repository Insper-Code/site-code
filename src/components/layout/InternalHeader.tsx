"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InternalHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export function InternalHeader({ user }: InternalHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logout realizado com sucesso!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao fazer logout");
      console.error(error);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 px-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="relative w-40 h-12">
          <Image
            src="/assets/code-logo.png"
            alt="Insper Code"
            fill
            className="object-contain"
            sizes="160px"
          />
        </Link>
        
        {user && (
          <div className="flex items-center gap-4">
            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-3 py-1.5 text-sm font-medium text-[#3773B5] hover:text-[#275483] transition-colors"
              >
                Painel Admin
              </Link>
            )}
            <Link
              href="/membros-area"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Minha Área
            </Link>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

