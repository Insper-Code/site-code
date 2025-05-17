"use client";
import { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);

    emailjs
      .sendForm(
        "service_3hjw8qa", /* SERVICE KEY */
        "template_1r4ywxp", /* TEMPLATE KEY */
        formRef.current,
        "P_O5XJfoDwhaD--Eu" /* PUBLIC KEY */
      )
      .then(() => {
        setShowModal(true);
        formRef.current?.reset();
      })
      .catch((err) => alert("Erro: " + err.text))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-6 bg-white w-full relative">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Entre em contato com o Insper Code
      </h3>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-base text-gray-700">Nome</span>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6BB1]/50 focus:border-[#2B6BB1]/50"
          />
        </label>

        <label className="block">
          <span className="text-base text-gray-700">Email</span>
          <input
            type="email"
            name="reply_to"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6BB1]/50 focus:border-[#2B6BB1]/50"
          />
        </label>

        <label className="block">
          <span className="text-base text-gray-700">Assunto</span>
          <input
            type="text"
            name="subject"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6BB1]/50 focus:border-[#2B6BB1]/50"
          />
        </label>

        <label className="block">
          <span className="text-base text-gray-700">Mensagem</span>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2B6BB1]/50 focus:border-[#2B6BB1]/50"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-base font-medium rounded-sm shadow transition ${
            isLoading
              ? "bg-[#2B6BB1]/50 cursor-not-allowed"
              : "bg-[#2B6BB1]/80 hover:bg-[#2B6BB1]/90 cursor-pointer text-white"
          } flex items-center justify-center gap-2`}
        >
          {isLoading && (
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isLoading ? "Enviando..." : "Enviar Email"}
        </button>
      </form>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Email enviado!
            </h2>
            <p className="text-gray-700">
              🎉 Obrigado! Em breve entraremos em contato...
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-[#2B6BB1] text-white rounded hover:bg-[#2B6BB1]/90 transition"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
