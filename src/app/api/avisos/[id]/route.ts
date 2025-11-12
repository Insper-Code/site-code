import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteAviso, getAvisoById, updateAviso } from "@/lib/db/avisos";
import { revalidatePath } from "next/cache";

// GET - Obter aviso por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const aviso = await getAvisoById(params.id);

    if (!aviso) {
      return NextResponse.json({ error: "Aviso não encontrado" }, { status: 404 });
    }

    return NextResponse.json(aviso);
  } catch (error) {
    console.error("Erro ao buscar aviso:", error);
    return NextResponse.json(
      { error: "Erro ao buscar aviso" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar aviso
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { titulo, conteudo, categoria, autor } = body;

    // Validação
    if (!titulo || !conteudo || !categoria || !autor) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const updatedAviso = await updateAviso(params.id, {
      titulo,
      conteudo,
      categoria,
      autor,
    });

    if (!updatedAviso) {
      return NextResponse.json({ error: "Aviso não encontrado" }, { status: 404 });
    }

    // Revalidar páginas relevantes
    revalidatePath('/admin/avisos');
    revalidatePath('/membros-area');
    revalidatePath('/membros-area/avisos');

    return NextResponse.json(updatedAviso);
  } catch (error) {
    console.error("Erro ao atualizar aviso:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar aviso" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir aviso
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const success = await deleteAviso(params.id);

    if (!success) {
      return NextResponse.json({ error: "Aviso não encontrado" }, { status: 404 });
    }

    // Revalidar páginas relevantes
    revalidatePath('/admin/avisos');
    revalidatePath('/membros-area');
    revalidatePath('/membros-area/avisos');

    return NextResponse.json({ message: "Aviso excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir aviso:", error);
    return NextResponse.json(
      { error: "Erro ao excluir aviso" },
      { status: 500 }
    );
  }
}
