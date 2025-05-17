import { ServiceCard } from "./services-components/service-card"
import { PiNotePencilThin } from "react-icons/pi";
import { PiDevicesThin, PiGameControllerThin, PiCalendarDotsThin, PiBrainThin } from "react-icons/pi";


export function Services() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ServiceCard
        icon={<PiDevicesThin />}
        title="Dev Web & Mobile"
        description="Desenvolvemos sites e aplicativos responsivos, combinando performance otimizada, design intuitivo e acessibilidade avançada para o usuário."
      />

      <ServiceCard
        icon={<PiGameControllerThin />}
        title="Game Design"
        description="Criamos jogos envolventes, do conceito à arte final, unindo narrativa cativante, mecânicas estruturadas e experiências memoráveis ao jogador."
      />

      <ServiceCard
        icon={<PiCalendarDotsThin />}
        title="Eventos & Workshops"
        description="Realizamos eventos imersivos e workshops dinâmicos, alinhando conteúdos relevantes ao mercado com interatividade estratégica e aprendizado prático."
      />

      <ServiceCard
        icon={<PiBrainThin />}
        title="Inteligência Artificial"
        description="Utilizamos Inteligência Artificial para automatizar tarefas, gerar insights estratégicos e integrar modelos preditivos a soluções escaláveis."
      />
    </div>
  );
}

