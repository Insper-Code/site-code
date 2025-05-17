import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PartnerLogoProps {
  children: React.ReactNode
}

export function PartnerLogo({ children }: PartnerLogoProps) {
  return (
    <Card className="aspect-[2/1] w-2xs h-2xs mx-1 p-0 flex-shrink-0 overflow-hidden rounded-sm">
      <CardContent className="p-0 flex items-center justify-center w-full h-full">
        {children}
      </CardContent>
    </Card>
  )
}