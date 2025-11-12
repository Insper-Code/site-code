import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

// Forçar Node.js runtime para suportar auth
export const runtime = 'nodejs';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  // Rotas públicas que qualquer um pode acessar
  const publicRoutes = [
    '/',
    '/login',
    '/membros',
    '/jogos',
    '/projetos',
    '/sobre',
    '/contato',
  ];

  // Se está em rota pública, permitir acesso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Rotas protegidas que requerem login
  const protectedRoutes = ['/membros-area', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      // Não está logado, redirecionar para login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verificar role para rotas admin
    if (pathname.startsWith('/admin')) {
      if (req.auth?.user?.role !== 'ADMIN') {
        // Não é admin, redirecionar para área de membros
        return NextResponse.redirect(new URL('/membros-area', req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
