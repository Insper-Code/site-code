'use client'

import { ReactTyped } from "react-typed";

export function AnimatedTitle() {
  return (
    <div>
      <h1>
        <span className="text-[#327DCF] inline-block font-normal ">
          <ReactTyped 
            strings={["Comunicação", "Excelência", "Proatividade", "Aprendizado contínuo", "Colaboração"]} 
            typeSpeed={70}
            backSpeed={40}
            backDelay={1000}
            loop
            cursorChar="|"
            showCursor={true}
            className="min-w-[2ch]"
            style={{ display: 'inline-block' }}
          />
        </span>
      </h1>
    </div>
  );
};

export default AnimatedTitle;