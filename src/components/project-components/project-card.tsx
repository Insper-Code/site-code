import { ReactNode } from "react";
import Image from "next/image";

interface IconeProjeto {
    nome: string;
    icone: ReactNode;
    cor: {
        border: string;
        text: string;
    };
}

interface ProjetoProps {
    image: string;
    href: string;
    title: string;
    descricao: string;
    tecnologias: IconeProjeto[];
}


export default function CardProjeto({
    image,
    href,
    title,
    descricao,
    tecnologias,
  }: ProjetoProps) {
    return (
      <a
        href={href}
        target="_blank"
        className="
          relative block transition-all ease-in-out duration-300
          group-hover:opacity-80 group-hover:scale-99   
          hover:opacity-100 hover:scale-100 hover:drop-shadow-md hover:cursor-pointer
        "
      >
        <article className="bg-white text-black overflow-hidden rounded-sm">
          <div className="relative w-full h-40">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
  
          <div className="flex flex-col p-5 text-zinc-600">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-base">{descricao}</p>
  
            <ol className="flex flex-row space-x-2 mt-3">
              {tecnologias.map((tech, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-1 p-1 text-xs border-2 rounded-sm
                    ${tech.cor.border} ${tech.cor.text}`}
                  title={tech.nome}
                >
                  {tech.icone}
                  <span>{tech.nome}</span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </a>
    );
  }