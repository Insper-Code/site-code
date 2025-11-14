import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword, getUserById } from './db/users';
import type { UserRole } from './types/auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    role: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        const user = await getUserByEmail(credentials.email as string);
        
        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        const isValidPassword = await verifyPassword(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Senha incorreta');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log(`🔑 JWT Callback - User: ${user ? 'SIM' : 'NÃO'}, Token.id: ${token.id}, Trigger: ${trigger}, isValid: ${token.isValid}`);
      
      // No login inicial - não fazer verificações, apenas criar o token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.iat = Math.floor(Date.now() / 1000); // Timestamp de quando o token foi criado
        token.isValid = true;
        console.log(`✅ Token criado para usuário: ${user.name} (${user.id})`);
        return token;
      }
      
      // Se o token já foi marcado como inválido anteriormente, não verificar novamente
      if (token.isValid === false) {
        console.log(`⏭️ Token já marcado como inválido, pulando verificação`);
        return token;
      }
      
      // Verificar se o usuário ainda existe e se a senha foi alterada
      // APENAS quando o trigger for explícito ou em requests subsequentes
      if (token.id && trigger !== 'update') {
        console.log(`🔍 Verificando existência do usuário ${token.id}...`);
        try {
          const freshUser = await getUserById(token.id as string);
          
          // Se o usuário foi deletado, marcar token como inválido
          if (!freshUser) {
            console.log(`🚫 Token inválido: usuário ${token.id} foi deletado`);
            token.isValid = false;
            return token;
          }
          
          console.log(`✅ Usuário ${token.id} ainda existe, token válido`);
          
          // Se a senha foi alterada após a criação do token, invalidar
          if (freshUser.passwordChangedAt && token.iat) {
            const passwordChangedTimestamp = Math.floor(new Date(freshUser.passwordChangedAt).getTime() / 1000);
            if (passwordChangedTimestamp > (token.iat as number)) {
              console.log(`🚫 Token inválido: senha do usuário ${token.id} foi alterada`);
              token.isValid = false;
              return token;
            }
          }
        } catch (error) {
          console.error(`❌ Erro ao verificar usuário ${token.id}:`, error);
          // Em caso de erro, manter token válido para não quebrar sessão
        }
      }
      
      // Quando update() é chamado, buscar dados frescos do banco
      if (trigger === 'update' && token.id) {
        console.log(`🔄 Atualizando dados do token para usuário ${token.id}...`);
        try {
          const freshUser = await getUserById(token.id as string);
          if (freshUser) {
            token.name = freshUser.name;
            token.email = freshUser.email;
            token.role = freshUser.role;
            token.isValid = true;
            console.log(`🔄 Token atualizado para usuário: ${freshUser.name}`);
          }
        } catch (error) {
          console.error(`❌ Erro ao atualizar token do usuário ${token.id}:`, error);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      // Se o token foi marcado como inválido, retornar sessão vazia
      if (!token.isValid) {
        return {
          ...session,
          user: undefined as unknown as typeof session.user,
        };
      }

      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
      }
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || 'insper-code-secret-key-2025',
});

