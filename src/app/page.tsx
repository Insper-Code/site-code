import { CarouselPlugin } from "@/components/partner-components/carousel-plugin"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { Slogan } from "../components/slogan"
import { AboutUs } from "../components/about";
import { Services } from "../components/services";
import { Contact } from "../components/contact"
import { Projects } from "../components/project";
import { Wave } from "@/components/wave"
import {Data} from "@/components/data-components/data"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start bg-zinc-100">

      <section id="home" className="relative w-full bg-white overflow-hidden">
        <Header />
        <Wave />
        <div className="flex items-center justify-center h-[50vh] md:h-[85vh]">
          <Slogan />
        </div>
      </section>
      
      <section id="about" className="flex justify-center w-full bg-gradient-to-b from-[#3773B5] to-[#275483] pt-10 pb-10 xl: px-5">
        <div className="flex flex-col items-between justify-center w-full max-w-6xl">
          <AboutUs />
          <Data />
        </div>
      </section>

      <section id="services" className="flex flex-col items-center w-full mt-15 xl: px-5">
        <div className="flex flex-col items-between justify-center w-full max-w-6xl">
          <h2 className="text-4xl font-semibold mb-3 text-left text-zinc-700">Serviços</h2>
          <Services />
        </div>
      </section>
      
      <section id="partners" className="flex flex-col items-center w-full mt-20 px-5">
        <div className="flex flex-col justify-center w-full max-w-6xl">
          <h2 className="text-4xl font-semibold mb-3 text-left text-zinc-700">
            Parceiros
          </h2>
          <CarouselPlugin />
        </div>
      </section>

      <section id="projects" className="flex flex-col items-center w-full mt-20 xl: px-5">
        <div className="flex flex-col items-between justify-center w-full max-w-6xl">
          <h2 className="text-4xl font-semibold mb-3 text-left text-zinc-700">Projetos</h2>
          <Projects/>
        </div>
      </section>

      <section id="contact" className="flex flex-col items-center w-full mt-20 px-5">
        <div className="flex flex-col justify-center w-full max-w-6xl">
          <h2 className="text-4xl font-semibold mb-3 text-left w-full text-zinc-700">Contato</h2>
          <Contact />
        </div>
      </section>

      <section id="footer" className="flex flex-col items-center w-full mt-20">
        <Footer />
      </section>
    </div>
  );
}
