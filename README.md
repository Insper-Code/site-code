# Insper Code - Site Institucional

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-%2338B2AC?logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-v5-blueviolet?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)

Site institucional da organização estudantil Insper Code, apresentando serviços, projetos, equipe e sistema completo de autenticação para membros e administradores.

## 🛠 Tecnologias Utilizadas

### Core

- **Next.js 15+** - Renderização híbrida (SSG/SSR) com App Router
- **Tailwind CSS 4.0** - Sistema de design atômico
- **TypeScript 5** - Tipagem avançada
- **React Icons** - Biblioteca de ícones vetoriais
- **OKLCH** - Gerenciamento de cores moderno

### Autenticação & Segurança

- **NextAuth.js v5** - Sistema completo de autenticação
- **bcryptjs** - Hash seguro de senhas
- **Middleware de Proteção** - Controle de acesso por roles

### Componentização

- **Radix UI** - Componentes acessíveis (Dropdowns, Cards)
- **React-Typed** - Animações de texto dinâmico
- **class-variance-authority** - Sistema de variantes para botões
- **react-intersection-observer** - Detecção de elementos visíveis
- **React Hot Toast** - Sistema de notificações

### Dados Dinâmicos

- **CSV Integration** - Carregamento de equipe via arquivos .csv
- **EmailJS** - Envio de emails sem backend
- **Next Image Optimization** - Otimização automática de assets
- **date-fns** - Formatação e manipulação de datas

## 🚀 Execução Local

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/InsperCoding/Website-Code
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador: http://localhost:3000

### 🔐 Credenciais de Teste

**Admin:**
- Email: `admin@code.insper.edu.br`
- Senha: `admin123`

**Membro:**
- Email: `membro@code.insper.edu.br`
- Senha: `membro123`

## 📚 Documentação Adicional

- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Guia completo do sistema de autenticação
- **[.env.example](./.env.example)** - Variáveis de ambiente necessárias

## ✨ Funcionalidades Implementadas

### Público
- ✅ Landing page responsiva
- ✅ Seção sobre a entidade
- ✅ Serviços oferecidos
- ✅ Parceiros (carrossel)
- ✅ Projetos destacados
- ✅ Formulário de contato
- ✅ Página da equipe atual

### Autenticação
- ✅ Login com credenciais
- ✅ Registro de novos membros
- ✅ Proteção de rotas por middleware
- ✅ Sistema de roles (ADMIN, MEMBRO, VISITANTE)
- ✅ Logout seguro

### Área de Membros
- ✅ Dashboard personalizado
- ✅ Visualização de avisos
- ✅ Acesso a recursos exclusivos
- ✅ Links rápidos para funcionalidades

### Área Administrativa
- ✅ Dashboard administrativo
- ✅ Gerenciamento de avisos (CRUD)
- ✅ Visualização de usuários
- ✅ Estatísticas do sistema
- ✅ Categorização de avisos (urgente, importante, informativo)

## 🎯 Próximas Implementações

Conforme plano do projeto:

1. **Gestão de Compromissos** - Calendário para diretoria
2. **Jogos WebGL/HTML5** - Player embed no site
3. **Cronograma Público** - Timeline de eventos
4. **Melhorias de Responsividade** - Otimizações mobile
5. **Página Unificada de Jogos** - Showcase completo
6. **Gestão de Parceiros** - Upload e ordenação de logos
7. **Projetos Dinâmicos** - Sistema CRUD para projetos
