'use client'

import { useEffect, useState } from "react"
import { Integrante } from "./about-components/integrante"
import SimpleSelect from "./ui/select"
import Image from "next/image"

type IntegranteInfo = {
  nome: string
  sobrenome: string
  cargo: string
  linkedin: string
  imagem: string
}

const anosDisponiveis = ["2025.1", "2025.2 teste"]

function normalizarNome(nome: string, sobrenome: string) {
  return `${nome}${sobrenome}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function Team() {
  const [ano, setAno] = useState(anosDisponiveis[0])
  const [gestao, setGestao] = useState<IntegranteInfo[]>([])
  const [coordenadores, setCoordenadores] = useState<IntegranteInfo[]>([])

  useEffect(() => {
    fetch(`/assets/equipes/${ano}/integrantes.csv`)
      .then(res => res.text())
      .then(csv => {
        const linhas = csv.trim().split("\n")
        const cabecalho = linhas[0].split(",")

        const dados = linhas.slice(1).map(linha => {
          const valores = linha.split(",")
          const obj: any = {}
          cabecalho.forEach((col, i) => { obj[col.trim()] = valores[i]?.trim() })
          return {
            nome: obj.Nome,
            sobrenome: obj.Sobrenome,
            cargo: obj.Cargo,
            linkedin: obj.LinkedIn,
            imagem: `/assets/equipes/${ano}/img/${normalizarNome(obj.Nome, obj.Sobrenome)}.webp`
          }
        })

        const ordenado = dados.sort((a, b) => {
          const peso = (cargo: string) => {
            const c = cargo.toLowerCase()
            if (c.includes("presidente")) return 0
            if (c.includes("vice"))        return 1
            if (c.includes("diretor"))     return 2
            if (c.includes("coordenador")) return 3
            return 4
          }
          return peso(a.cargo) - peso(b.cargo)
        })

        setGestao(ordenado.filter(p =>
          /presidente|vice|diretor/i.test(p.cargo)
        ))
        setCoordenadores(ordenado.filter(p =>
          /coordenador/i.test(p.cargo)
        ))
      })
  }, [ano])

  return (
    <div className="w-full h-fit text-[#3773B5] pt-8">
      {/* seletor de período sempre visível */}
      <div className="w-full flex justify-center mb-4">
        <SimpleSelect
          options={anosDisponiveis.map(a => ({ value: a, label: a }))}
          value={ano}
          onChange={setAno}
          placeholder="Período"
        />
      </div>

      <section className="mt-5">
        {/* foto da equipe */}
        <div className="relative w-full max-w-3xl mx-auto mb-8 md:h-100">
          <Image
            src={`/assets/equipes/${ano}/img/fotoemequipe.webp`}
            alt="Foto da equipe"
            width={1500}
            height={900}
            className="w-full h-full object-cover"
          />
          <article className="absolute shadow-sm scale-85 p-2 bottom-0 right-0 translate-x-2 translate-y-2 z-[10] bg-white text-gray-700 sm:scale-130">
            <div className="border-b-1 border-gray-700">
              <span className="text-base font-medium">Equipe</span>
            </div>
            <span className="text-sm">{ano}</span>
          </article>
        </div>

        {/* seção Gestão */}
        {gestao.length > 0 && (
          <section className="w-full max-w-screen-xl mx-auto mt-12">
            <h2 className="text-xl text-gray-700 font-semibold border-b border-gray-700 pb-1 mb-4">Gestão</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
              {gestao.map((p, i) => (
                <Integrante key={i} {...p} />
              ))}
            </div>
          </section>
        )}

        {/* seção Coordenadores */}
        {coordenadores.length > 0 && (
          <section className="w-full max-w-screen-xl mx-auto mt-12">
            <h2 className="text-xl text-gray-700 font-semibold border-b border-gray-700 pb-1 mb-4">Coordenadores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
              {coordenadores.map((p, i) => (
                <Integrante key={i} {...p} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  )
}
