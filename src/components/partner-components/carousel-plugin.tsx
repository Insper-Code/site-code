"use client"

import * as React from "react"
import { PartnerLogo } from "./partner-logo";

const LogoList = [
    "/assets/intelli-gamelab.png",
    "/assets/fund-estudar.jpeg",
    "/assets/in-health.jpeg",
    "/assets/ibs-americas2.png",
    "/assets/game_lab.png",
    "/assets/insper-sec.png",
    "/assets/na-pratica.jpeg",
    "/assets/logoparceiros.png",
    "/assets/insperdata.png",
    "/assets/intelli-gamelab.png",
    "/assets/fund-estudar.jpeg",
    "/assets/in-health.jpeg",
    "/assets/ibs-americas2.png",
    "/assets/game_lab.png",
    "/assets/insper-sec.png",
    "/assets/na-pratica.jpeg",
    "/assets/logoparceiros.png",
    "/assets/insperdata.png",
    
]

export function CarouselPlugin() {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...LogoList, ...LogoList].map((logo, index) => (
          <PartnerLogo key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-full object-cover" />
          </PartnerLogo>
        ))}
      </div>
    </div>
  );
}
