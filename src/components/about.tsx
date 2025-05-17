import { PiTargetBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";

export function AboutUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
      <div className="relative w-full aspect-video overflow-hidden rounded-sm">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/xh_CtcPtiI4"
          title="Insper Code Team"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="">
        <h2 className="text-3xl font-semibold mb-2 text-white">Sobre nós</h2>
        <p className="text-base text-white/90 mb-2">
        O Insper Code é a organização estudantil que capacita seus membros a se tornarem desenvolvedores, líderes e comunicadores mais completos, por meio de projetos práticos e colaborativos. Fundado em 2021, atua em duas frentes principais: Tech e Game Dev.
        </p>
        <p className="text-base text-white/90 mb-2">
        Os membros se engajam nos projetos propostos pelas diretorias de cada área, aprendendo na prática enquanto desenvolvem soluções reais. Esses projetos são acompanhados por coordenadores que oferecem orientação estratégica ao longo do processo.
        </p>
        <p className="text-base text-white/90">
        Nosso objetivo é oferecer uma experiência próxima à do mercado, enriquecendo o portfólio dos participantes e preparando-os para os desafios do futuro profissional.
        </p>
      </div>

      <div className="flex flex-col justify-start h-full">
        <div className="flex flex-row items-center gap-2 mb-1">
          <PiTargetBold className="text-2xl text-white"></PiTargetBold>
          <h3 className="text-2xl font-medium text-white">Missão</h3>
        </div>
        <p className="text-base text-white/90">
        Tornar a tecnologia mais acessível e desenvolver projetos que gerem valor real para a comunidade, promovendo impacto dentro e fora do Insper, com foco em inclusão, inovação e impacto.
        </p>
      </div>

      <div className="flex flex-col justify-start h-full">
        <div className="flex flex-row items-center gap-2 mb-1">
          <PiEyeBold className="text-2xl text-white" />
          <h3 className="text-2xl font-medium text-white">Visão</h3>
        </div>
        <p className="text-base text-white/90">
        Consolidar o Insper Code como uma empresa estudantil de soluções tecnológicas, capaz de investir no crescimento pessoal e técnico de seus membros, solucionando problemas e transformando sonhos em projetos reais.
        </p>
      </div>

    </div>
  ) 
}