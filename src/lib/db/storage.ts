// Sistema de armazenamento persistente em memória
// Simula um banco de dados que persiste entre requisições no servidor

import { User } from '../types/auth';
import { Aviso } from '../types/avisos';
import bcrypt from 'bcryptjs';

// Usar globalThis para garantir storage único entre todos os workers/processos
declare global {
  // eslint-disable-next-line no-var
  var __insperCodeStorage: {
    users: User[];
    avisos: Aviso[];
  } | undefined;
}

interface StorageData {
  users: User[];
  avisos: Aviso[];
}

// Inicializar storage com dados padrão
function createDefaultStorage(): StorageData {
  return {
    users: [
      {
        id: '1',
        name: 'Admin Code',
        email: 'admin@code.insper.edu.br',
        password: bcrypt.hashSync('admin123', 10),
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordChangedAt: undefined,
      },
      {
        id: '2',
        name: 'Membro Code',
        email: 'membro@code.insper.edu.br',
        password: bcrypt.hashSync('membro123', 10),
        role: 'MEMBRO',
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordChangedAt: undefined,
      },
    ],
    avisos: [
      {
        id: '1',
        titulo: 'Bem-vindo à área de membros!',
        conteudo: 'Olá! Esta é a área exclusiva para membros do Insper Code. Aqui você encontrará avisos importantes, documentos e informações sobre eventos e projetos.',
        categoria: 'informativo',
        autor: 'Admin Code',
        dataPublicacao: new Date('2025-01-10'),
      },
      {
        id: '2',
        titulo: 'Reunião semanal - Toda segunda às 19h',
        conteudo: 'Lembramos que as reuniões semanais acontecem todas as segundas-feiras às 19h no Lab 404. A presença é obrigatória para todos os membros ativos.',
        categoria: 'importante',
        autor: 'Admin Code',
        dataPublicacao: new Date('2025-01-15'),
      },
      {
        id: '3',
        titulo: 'URGENTE: Prazo para entrega do projeto Help The Fox',
        conteudo: 'O prazo final para entrega das melhorias do projeto Help The Fox é 20/01/2025. Por favor, certifique-se de fazer o commit final e atualizar a documentação.',
        categoria: 'urgente',
        autor: 'Gustavo Ribolla',
        dataPublicacao: new Date('2025-01-16'),
      },
      {
        id: '4',
        titulo: 'Workshop de Unity - Próxima sexta',
        conteudo: 'Teremos um workshop especial de Unity na próxima sexta-feira às 18h. O tema será "Otimização de jogos WebGL". Confirme sua presença!',
        categoria: 'informativo',
        autor: 'Henrique Mayor',
        dataPublicacao: new Date('2025-01-17'),
      },
    ],
  };
}

export function getStorage(): StorageData {
  if (!globalThis.__insperCodeStorage) {
    console.log('🆕 Inicializando storage global');
    globalThis.__insperCodeStorage = createDefaultStorage();
  }
  
  return globalThis.__insperCodeStorage;
}

// USUÁRIOS
export function addUser(user: User) {
  const storage = getStorage();
  storage.users.push(user);
  console.log(`✅ Usuário adicionado: ${user.name} (ID: ${user.id})`);
  console.log(`📊 Total de usuários no storage: ${storage.users.length}`);
}

export function updateUser(id: string, updates: Partial<User>) {
  const storage = getStorage();
  const index = storage.users.findIndex(u => u.id === id);
  if (index !== -1) {
    storage.users[index] = { ...storage.users[index], ...updates, updatedAt: new Date() };
    console.log(`✏️ Usuário atualizado: ${storage.users[index].name}`);
    return storage.users[index];
  }
  return null;
}

export function removeUser(id: string) {
  const storage = getStorage();
  const index = storage.users.findIndex(u => u.id === id);
  if (index !== -1) {
    const user = storage.users[index];
    storage.users.splice(index, 1);
    console.log(`🗑️ Usuário removido: ${user.name}`);
    console.log(`📊 Total de usuários no storage: ${storage.users.length}`);
    return true;
  }
  return false;
}

// AVISOS
export function addAviso(aviso: Aviso) {
  const storage = getStorage();
  storage.avisos.push(aviso);
  console.log(`✅ Aviso adicionado: ${aviso.titulo}`);
  console.log(`📊 Total de avisos no storage: ${storage.avisos.length}`);
}

export function updateAviso(id: string, updates: Partial<Aviso>) {
  const storage = getStorage();
  const index = storage.avisos.findIndex(a => a.id === id);
  if (index !== -1) {
    storage.avisos[index] = { ...storage.avisos[index], ...updates };
    console.log(`✏️ Aviso atualizado: ${storage.avisos[index].titulo}`);
    return storage.avisos[index];
  }
  return null;
}

export function removeAviso(id: string) {
  const storage = getStorage();
  const index = storage.avisos.findIndex(a => a.id === id);
  if (index !== -1) {
    storage.avisos.splice(index, 1);
    console.log(`🗑️ Aviso removido: ${id}`);
    console.log(`📊 Total de avisos no storage: ${storage.avisos.length}`);
    return true;
  }
  return false;
}
