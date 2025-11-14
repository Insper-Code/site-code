"use client";

import { Aviso } from "@/lib/types/avisos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

interface AvisoCardProps {
  aviso: Aviso;
  onClick?: () => void;
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

export function AvisoCard({ aviso, onClick }: AvisoCardProps) {
  const config = categoriaConfig[aviso.categoria];

  return (
    <div
      className={`${config.bg} border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{config.icon}</span>
            <span className={`${config.badge} text-xs font-semibold px-2 py-1 rounded-full uppercase`}>
              {aviso.categoria}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {aviso.titulo}
          </h3>
          
          <p className="text-gray-700 line-clamp-2 mb-3">
            {aviso.conteudo}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Por {aviso.autor}</span>
            <span>•</span>
            <span>{format(new Date(aviso.dataPublicacao), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
