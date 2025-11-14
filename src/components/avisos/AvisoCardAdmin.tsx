"use client";

import { Aviso } from "@/lib/types/avisos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface AvisoCardAdminProps {
  aviso: Aviso;
  onDelete?: () => void;
}

const categoriaConfig = {
  urgente: {
    bg: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-800',
    icon: <FaExclamationCircle className="text-red-600" />,
  },
  importante: {
    bg: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: <FaExclamationTriangle className="text-yellow-600" />,
  },
  informativo: {
    bg: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    icon: <FaInfoCircle className="text-blue-600" />,
  },
};

export function AvisoCardAdmin({ aviso, onDelete }: AvisoCardAdminProps) {
  const router = useRouter();
  const config = categoriaConfig[aviso.categoria];

  const handleEdit = () => {
    router.push(`/admin/avisos/${aviso.id}/editar`);
  };

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o aviso "${aviso.titulo}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/avisos/${aviso.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Aviso excluído com sucesso!");
        console.log(`🗑️ Aviso ${aviso.id} excluído`);
        if (onDelete) {
          onDelete();
        }
      } else {
        toast.error("Erro ao excluir aviso");
      }
    } catch (error) {
      toast.error("Erro ao excluir aviso");
      console.error(error);
    }
  };

  return (
    <div className={`${config.bg} border rounded-lg p-6 relative bg-white`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{config.icon}</span>
            <span className={`${config.badge} text-xs font-semibold px-3 py-1 rounded-full uppercase`}>
              {aviso.categoria}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {aviso.titulo}
          </h3>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {aviso.conteudo}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">Por {aviso.autor}</span>
            <span>•</span>
            <span>{format(new Date(aviso.dataPublicacao), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <FaEdit /> Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <FaTrash /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
