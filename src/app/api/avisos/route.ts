import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { getAllAvisos, createAviso } from '@/lib/db/avisos';

export async function GET() {
  try {
    const avisos = await getAllAvisos();
    return NextResponse.json(avisos);
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar avisos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { titulo, conteudo, categoria } = await request.json();

    if (!titulo || !conteudo || !categoria) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const aviso = await createAviso(
      titulo,
      conteudo,
      categoria,
      session.user.name || 'Admin'
    );

    // Revalidar todas as páginas que mostram avisos
    revalidatePath('/admin/avisos');
    revalidatePath('/membros-area');
    revalidatePath('/membros-area/avisos');

    return NextResponse.json(aviso, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar aviso:', error);
    return NextResponse.json(
      { error: 'Erro ao criar aviso' },
      { status: 500 }
    );
  }
}

