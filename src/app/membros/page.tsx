// pages/membros/page.tsx (ou semelhante)
import Link from "next/link";
import Image from "next/image";
import { Team } from "@/components/team";
import { Footer } from "@/components/footer";

export default function Membros() {
  return (
    <div>
      {/* Header idêntico em altura/posicionamento ao principal */}
      <header className="relative w-full py-3 px-4 md:px-10 flex items-center bg-white">
        <Link
          href="/"
          aria-label="Voltar para a página inicial"
          className="relative w-48 h-12"
        >
          <Image
            src="/assets/code-logo.png"
            alt="Insper Code"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </Link>
      </header>

      {/* Conteúdo principal */}
      <section
        id="about"
        className="flex justify-center w-full bg-gray-100 pb-10 px-5"
      >
        <div className="flex flex-col w-full max-w-6xl">
          <Team />
        </div>
      </section>

      <section id="footer" className="flex flex-col items-center w-full">
        <Footer />
      </section>
    </div>
  );
}
