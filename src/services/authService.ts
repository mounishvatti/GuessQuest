import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
  };
  token?: string;
  message?: string;
}

// Mock JWT generation (will replace with actual JWT later)
const generateToken = (): string => {
  return uuidv4();
};

// Mock local storage persistence
const USERS_KEY = 'number_game_users';
const TOKENS_KEY = 'number_game_tokens';

const getStoredUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const storeUser = (user: User): void => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const storeToken = (userId: string, token: string): void => {
  const tokens = getStoredTokens();
  tokens[userId] = token;
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
};

const getStoredTokens = (): Record<string, string> => {
  const tokens = localStorage.getItem(TOKENS_KEY);
  return tokens ? JSON.parse(tokens) : {};
};

// Auth service functions
export const register = async (username: string, password: string): Promise<AuthResponse> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getStoredUsers();
  
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return {
      success: false,
      message: 'Username already exists'
    };
  }
  
  // Create new user
  const newUser: User = {
    id: uuidv4(),
    username,
    password
  };
  
  storeUser(newUser);
  const token = generateToken();
  storeToken(newUser.id, token);
  
  return {
    success: true,
    user: {
      id: newUser.id,
      username: newUser.username
    },
    token
  };
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getStoredUsers();
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
  
  const token = generateToken();
  storeToken(user.id, token);
  
  return {
    success: true,
    user: {
      id: user.id,
      username: user.username
    },
    token
  };
};

export const logout = async (): Promise<void> => {
  // For now, we'll just simulate network latency
  await new Promise(resolve => setTimeout(resolve, 200));
  // In a real implementation, we'd invalidate the token on the server
};

export const verifyToken = async (token: string): Promise<boolean> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const tokens = getStoredTokens();
  // Check if token exists in our "database"
  return Object.values(tokens).includes(token);
};