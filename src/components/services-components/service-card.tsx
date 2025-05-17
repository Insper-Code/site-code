import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="text-base bg-white p-5 hover:cursor-default rounded-sm">
      <div className="text-5xl text-[#2B6BB1]/80 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-zinc-600 mb-2">{title}</h3>
      <p className="text-zinc-600 text-base ">{description}</p>
    </div>
  )
}
