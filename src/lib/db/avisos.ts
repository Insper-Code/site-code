import { Aviso } from '../types/avisos';
import { getStorage, addAviso as addAvisoToStorage, updateAviso as updateAvisoInStorage, removeAviso } from './storage';

export const getAllAvisos = async (): Promise<Aviso[]> => {
  const storage = getStorage();
  return storage.avisos.sort((a, b) => 
    new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
  );
};

export const getAvisoById = async (id: string): Promise<Aviso | null> => {
  const storage = getStorage();
  return storage.avisos.find(aviso => aviso.id === id) || null;
};

export const createAviso = async (
  titulo: string,
  conteudo: string,
  categoria: 'urgente' | 'importante' | 'informativo',
  autor: string
): Promise<Aviso> => {
  const newAviso: Aviso = {
    id: String(Date.now()),
    titulo,
    conteudo,
    categoria,
    autor,
    dataPublicacao: new Date(),
  };
  
  addAvisoToStorage(newAviso);
  return newAviso;
};

export const updateAviso = async (
  id: string,
  updates: {
    titulo?: string;
    conteudo?: string;
    categoria?: 'urgente' | 'importante' | 'informativo';
    autor?: string;
  }
): Promise<Aviso | null> => {
  return updateAvisoInStorage(id, updates);
};

export const deleteAviso = async (id: string): Promise<boolean> => {
  return removeAviso(id);
};
