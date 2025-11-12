import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="relative w-48 h-16">
              <Image
                src="/assets/code-logo.png"
                alt="Insper Code"
                fill
                className="object-contain"
                sizes="200px"
              />
            </Link>
          </div>

          {/* Título */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p className="mt-2 text-gray-600">
              Faça login para acessar a área de membros
            </p>
          </div>

          {/* Formulário */}
          <Suspense fallback={<div className="text-center">Carregando...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* Lado direito - Imagem/Gradiente */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#3773B5] to-[#275483] items-center justify-center p-12">
        <div className="text-white space-y-6 max-w-lg">
          <h2 className="text-4xl font-bold">Insper Code</h2>
          <p className="text-xl">
            Desenvolvendo soluções inovadoras e formando profissionais de excelência
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Acesso a projetos exclusivos</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Networking com membros e parceiros</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Eventos e workshops gratuitos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

