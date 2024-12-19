import { User, AuthState } from '../types';

// Mock user data - adding a password field for testing
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@gitam.edu',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80',
  },
  {
    id: '2',
    username: 'testuser',
    email: 'test@gitam.edu',
    password: 'test123',
    avatar: 'https://ui-avatars.com/api/?name=Test+User&size=32',
  }
];

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  signup: async (username: string, email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User & { password: string } = {
      id: String(MOCK_USERS.length + 1),
      username,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=32`,
    };
    
    MOCK_USERS.push(newUser);
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
};