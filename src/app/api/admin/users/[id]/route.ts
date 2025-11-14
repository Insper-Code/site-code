// src/app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateUser, deleteUser, getUserById } from "@/lib/db/users";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs"; // garante tipos/expectativas do Node runtime

// GET - Obter usuário por ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = await getUserById(context.params.id);

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Remover senha da resposta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
  }
}

// PUT - Atualizar usuário
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    // Validação
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Nome, email e função são obrigatórios" },
        { status: 400 }
      );
    }

    const updates: {
      name: string;
      email: string;
      role: "ADMIN" | "MEMBRO";
      password?: string;
    } = {
      name,
      email,
      role,
    };

    // Só atualizar senha se foi fornecida
    if (password && password.trim() !== "") {
      updates.password = password;
    }

    const updatedUser = await updateUser(context.params.id, updates);

    if (!updatedUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Revalidar páginas relevantes
    revalidatePath("/admin/usuarios");
    revalidatePath("/admin");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// DELETE - Excluir usuário
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Não permitir que o admin exclua a si mesmo
    if (session.user.id === context.params.id) {
      return NextResponse.json(
        { error: "Você não pode excluir sua própria conta" },
        { status: 400 }
      );
    }

    const success = await deleteUser(context.params.id);

    if (!success) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Revalidar páginas relevantes
    revalidatePath("/admin/usuarios");
    revalidatePath("/admin");

    return NextResponse.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 });
  }
}
