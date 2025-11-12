# 🔐 Sistema de Autenticação - Insper Code

## Visão Geral

Sistema completo de autenticação implementado com NextAuth.js v5 (Auth.js), incluindo:
- Login/Registro de usuários
- Sistema de roles (ADMIN, MEMBRO, VISITANTE)
- Proteção de rotas via middleware
- Área administrativa
- Área de membros
- Sistema de avisos

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Iniciar o Servidor

```bash
npm run dev
```

### 3. Acessar o Sistema

**Página Principal**: http://localhost:3000

**Login**: http://localhost:3000/login

**Registro**: http://localhost:3000/registro

### 4. Credenciais de Teste

#### Admin
- **Email**: admin@code.insper.edu.br
- **Senha**: admin123
- **Acesso**: Dashboard admin + área de membros

#### Membro
- **Email**: membro@code.insper.edu.br
- **Senha**: membro123
- **Acesso**: Área de membros

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth handlers
│   │   │   └── register/route.ts          # Registro de usuários
│   │   ├── avisos/
│   │   │   ├── route.ts                   # CRUD de avisos
│   │   │   └── [id]/route.ts              # Operações por ID
│   │   └── users/route.ts                 # Listar usuários (admin)
│   ├── login/page.tsx                     # Página de login
│   ├── registro/page.tsx                  # Página de registro
│   ├── membros-area/page.tsx              # Área de membros
│   └── admin/
│       ├── page.tsx                       # Dashboard admin
│       ├── avisos/
│       │   ├── page.tsx                   # Gerenciar avisos
│       │   └── novo/page.tsx              # Criar aviso
│       └── usuarios/page.tsx              # Gerenciar usuários
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx                  # Formulário de login
│   │   ├── RegisterForm.tsx               # Formulário de registro
│   │   └── AuthButton.tsx                 # Botão auth no header
│   └── avisos/
│       └── AvisoCard.tsx                  # Card de aviso
├── lib/
│   ├── auth.ts                            # Configuração NextAuth
│   ├── types/
│   │   ├── auth.ts                        # Tipos de autenticação
│   │   └── avisos.ts                      # Tipos de avisos
│   └── db/
│       ├── users.ts                       # CRUD de usuários (em memória)
│       └── avisos.ts                      # CRUD de avisos (em memória)
└── middleware.ts                          # Proteção de rotas
```

## 🔒 Rotas Protegidas

### Públicas (sem autenticação)
- `/` - Página principal
- `/login` - Login
- `/registro` - Registro
- `/membros` - Página pública da equipe

### Autenticadas (qualquer usuário logado)
- `/membros-area` - Área de membros

### Admin Only
- `/admin/*` - Todo o dashboard administrativo

## 👥 Sistema de Roles

### VISITANTE
- Acesso apenas a rotas públicas
- Pode criar conta

### MEMBRO
- Acesso a `/membros-area`
- Pode visualizar avisos
- Pode acessar recursos exclusivos

### ADMIN
- Acesso total ao sistema
- Pode gerenciar avisos
- Pode visualizar usuários
- Acesso ao dashboard administrativo

## 📢 Sistema de Avisos

### Categorias

#### 🚨 Urgente
- Cor: Vermelho
- Uso: Prazos críticos, emergências

#### ⚠️ Importante
- Cor: Amarelo
- Uso: Informações relevantes, lembretes

#### ℹ️ Informativo
- Cor: Azul
- Uso: Comunicados gerais, novidades

### Funcionalidades

- ✅ Criar avisos (admin)
- ✅ Visualizar avisos (membros)
- ✅ Excluir avisos (admin)
- ✅ Categorização por importância
- ✅ Ordenação por data

## 🔧 Tecnologias Utilizadas

- **NextAuth.js v5**: Autenticação completa
- **bcryptjs**: Hash de senhas
- **React Hot Toast**: Notificações
- **date-fns**: Formatação de datas
- **Zod**: Validação de dados (preparado)
- **React Hook Form**: Gerenciamento de formulários (preparado)

## 🗄️ Banco de Dados

Atualmente, o sistema usa **armazenamento em memória** para facilitar desenvolvimento e testes.

### Migrar para Banco Real

Para produção, substitua os arquivos em `src/lib/db/` por implementações reais:

#### Opção 1: Supabase (Recomendado)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  return data;
}
```

#### Opção 2: Prisma + PostgreSQL
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}
```

## 🚀 Próximos Passos

### Implementações Futuras

1. **Recuperação de Senha**
   - Email com token de reset
   - Página de redefinição de senha

2. **OAuth Providers**
   - Login com Google
   - Login com Microsoft (Insper)

3. **Perfil de Usuário**
   - Editar informações
   - Upload de foto
   - Histórico de atividades

4. **Notificações**
   - Push notifications
   - Email notifications
   - Sistema de leitura/não lido

5. **Auditoria**
   - Log de ações administrativas
   - Histórico de login

## 📝 Convenções de Código

### Nomenclatura
- Componentes: PascalCase (`LoginForm.tsx`)
- Funções: camelCase (`getUserByEmail`)
- Tipos: PascalCase (`UserRole`)
- Constantes: UPPER_SNAKE_CASE (`API_URL`)

### Estrutura de Componentes
```typescript
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export function Component({ props }: Props) {
  // 4. State
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => { ... }, []);
  
  // 6. Handlers
  const handleAction = () => { ... };
  
  // 7. Render
  return <div>...</div>;
}
```

## 🐛 Troubleshooting

### Erro: "NEXTAUTH_SECRET não configurado"
**Solução**: Crie arquivo `.env.local` com a variável

### Erro: "Middleware não protegendo rotas"
**Solução**: Verifique o config.matcher no `middleware.ts`

### Erro: "Sessão não persiste"
**Solução**: Limpe cookies e cache do navegador

### Usuário criado não consegue logar
**Solução**: Verifique se o hash da senha está correto

## 📧 Contato

Para dúvidas sobre o sistema de autenticação:
- **Desenvolvedor**: Insper Code Team
- **Email**: code@insper.edu.br

## 📄 Licença

Este projeto é parte do Insper Code - Uso interno.

