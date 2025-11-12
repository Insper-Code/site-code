import { User } from '../types/auth';
import bcrypt from 'bcryptjs';
import { getStorage, addUser as addUserToStorage, updateUser as updateUserInStorage, removeUser as removeUserFromStorage } from './storage';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const storage = getStorage();
  const user = storage.users.find((u) => u.email === email);
  return user || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const storage = getStorage();
  const user = storage.users.find((u) => u.id === id);
  
  if (!user) {
    console.log(`❌ getUserById: Usuário ${id} NÃO encontrado. Total: ${storage.users.length} usuários`);
  } else {
    console.log(`✅ getUserById: Usuário ${id} encontrado: ${user.name}`);
  }
  
  return user || null;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'ADMIN' | 'MEMBRO' = 'MEMBRO'
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser: User = {
    id: String(Date.now()),
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordChangedAt: undefined, // Nunca foi alterada
  };
  
  addUserToStorage(newUser);
  return newUser;
};

export const updateUser = async (
  id: string,
  updates: {
    name?: string;
    email?: string;
    password?: string;
    role?: 'ADMIN' | 'MEMBRO';
  }
): Promise<User | null> => {
  const userUpdates: Partial<User> = {
    name: updates.name,
    email: updates.email,
    role: updates.role,
  };

  // Se a senha foi fornecida, hash ela e marca quando foi alterada
  if (updates.password) {
    userUpdates.password = await bcrypt.hash(updates.password, 10);
    userUpdates.passwordChangedAt = new Date();
  }

  return updateUserInStorage(id, userUpdates);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  return removeUserFromStorage(id);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const storage = getStorage();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return storage.users.map(({ password, ...user }) => user);
};
