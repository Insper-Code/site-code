"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthButtonProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export function AuthButton({ user }: AuthButtonProps) {
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

  if (!user) {
    return (
      <Link
        href="/login"
        className="
          px-4 py-2 rounded-md font-medium text-sm
          bg-[#3773B5] text-white
          hover:bg-[#275483]
          transition-colors
        "
      >
        Entrar
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/membros-area"
          className="
            px-4 py-2 rounded-md font-medium text-sm
            bg-[#3773B5] text-white
            hover:bg-[#275483]
            transition-colors
          "
        >
          Minha Área
        </Link>
        
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="
          px-3 py-1.5 rounded-md font-medium text-sm
          bg-gray-100 text-gray-700
          hover:bg-gray-200
          transition-colors
        "
      >
        Sair
      </button>
    </div>
  );
}

