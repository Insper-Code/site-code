import CardProjeto from "./project-components/project-card";
import { FaFigma } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoNodejs } from "react-icons/io5";
import { SiGodotengine } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";

export function Projects() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 group">
        <CardProjeto
        image="/assets/estoca-ai.png"
        title="Estoca Aí"
        href= "https://estocaai.vercel.app/"
        descricao="Estoca Aí é um MVP de aplicativo desenvolvido para facilitar a organização e gestão de compras e da despensa doméstica. A proposta do projeto é ajudar os usuários a manterem o controle dos itens armazenados em casa, evitando desperdícios e otimizando o planejamento de compras. Com uma interface simples e intuitiva, o MVP buscou validar a viabilidade de uma solução digital voltada à rotina doméstica de consumo"
        tecnologias={[
            {
              nome: "Figma",
              icone: <FaFigma />,
              cor: {
                border: "border-pink-600",  // antes: border-pink-500
                text:   "text-pink-600",    // antes: text-pink-500
              },
            },
            {
              nome: "NodeJS",
              icone: <IoLogoNodejs />,
              cor: {
                border: "border-green-600", // antes: border-green-400
                text:   "text-green-600",   // antes: text-green-400
              },
            },
            {
              nome: "NextJS",
              icone: <TbBrandNextjs />,
              cor: {
                border: "border-gray-700",  // antes: border-black
                text:   "text-gray-700",    // antes: text-black
              },
            },
          ]}
        />
        <CardProjeto
          image="/assets/help-the-fox.png"
          title="Help The Fox"
          href= "https://www.instagram.com/p/DB_u9tYvv9B/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          descricao="Help the Fox foi um jogo desenvolvido em Godot como parte de uma iniciativa do Insper em parceria com o Code para arrecadar doações ao programa de bolsas. O projeto propôs uma experiência híbrida de escape room, combinando enigmas físicos e digitais para desafiar os participantes a escaparem em até 30 minutos. Desenvolvido em duas semanas, contou com consultoria do Escape 60 para garantir uma experiência divertida e acessível."
          tecnologias={[
              {
                nome: "Godot",
                icone: <SiGodotengine />,
                cor: {
                  border: "border-blue-600",  // antes: border-blue-500
                  text:   "text-blue-600",    // antes: text-blue-500
                },
              },
              {
                nome: "Photoshop",
                icone: <SiAdobephotoshop />,
                cor: {
                  border: "border-sky-600",   // antes: border-green-400
                  text:   "text-sky-600",     // antes: text-green-400
                },
              },
            ]}
          />
        <CardProjeto
          image="/assets/InvestigaAI.png"
          title="InvestigaAI"
          href= "https://investiga.seg.br/"
          descricao="O Investiga AI é uma plataforma desenvolvida para automatizar e centralizar consultas de IPs, oferecendo uma solução robusta para investigações cibernéticas. O objetivo principal do projeto é otimizar o tempo de processamento, proporcionando mais eficiência aos analistas e auxiliando a perícia digital em investigações sensíveis. A plataforma garante segurança, precisão e confiabilidade no tratamento de dados."
          tecnologias={[
            {
              nome: "FastAPI",
              icone: <SiFastapi />,
              cor: {
                border: "border-emerald-700",  // antes: border-pink-500
                text:   "text-emerald-700",    // antes: text-pink-500
              },
            },
            {
              nome: "HTML 5",
              icone: <FaHtml5 />,
              cor: {
                border: "border-orange-600", // antes: border-green-400
                text:   "text-orange-600",   // antes: text-green-400
              },
            },
            {
              nome: "CSS",
              icone: <FaCss3Alt />,
              cor: {
                border: "border-sky-600",  // antes: border-black
                text:   "text-sky-600",    // antes: text-black
              },
            },
          ]}
        />
    </div>

    );
};