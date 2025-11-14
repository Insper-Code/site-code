import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/db/users';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { name, email, password, role } = await request.json();

    // Validações básicas
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    if (!['ADMIN', 'MEMBRO', 'VISITANTE'].includes(role)) {
      return NextResponse.json(
        { error: 'Role inválido' },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Criar novo usuário
    const user = await createUser(name, email, password, role);

    // Revalidar a página de usuários
    revalidatePath('/admin/usuarios');
    revalidatePath('/admin');

    return NextResponse.json(
      { 
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

