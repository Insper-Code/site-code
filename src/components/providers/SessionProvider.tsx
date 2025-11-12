"use client";

import { SessionProvider as NextAuthSessionProvider, signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SessionProviderProps {
  children: ReactNode;
}

function SessionMonitor() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    // Resetar flag quando mudar de rota (se não estiver logado)
    if (status === 'unauthenticated') {
      hasLoggedOut.current = false;
    }
  }, [status]);

  useEffect(() => {
    const isProtectedRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/membros-area');
    
    // Só fazer verificação em rotas protegidas
    if (!isProtectedRoute) {
      return;
    }

    // Se já fez logout, não fazer novamente
    if (hasLoggedOut.current) {
      return;
    }
    
    // Se a sessão não tem usuário mas o status é authenticated (token inválido)
    if (status === 'authenticated' && !session?.user) {
      hasLoggedOut.current = true;
      toast.error("Sua conta foi modificada. Faça login novamente.", { duration: 4000 });
      
      // Fazer logout completo para limpar cookies
      signOut({ callbackUrl: '/login', redirect: true });
      return;
    }
    
    // Se não tem sessão em rota protegida, redirecionar
    if (status === 'unauthenticated') {
      hasLoggedOut.current = true;
      router.push('/login');
    }
  }, [session, status, pathname, router]);

  return null;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      <SessionMonitor />
      {children}
    </NextAuthSessionProvider>
  );
}
