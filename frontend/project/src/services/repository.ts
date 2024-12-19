import { Repository, User } from '../types';

// Mock repository data
const MOCK_REPOSITORIES: Repository[] = [
  {
    id: '1',
    name: 'senior-project',
    description: 'Final year project repository',
    owner: {
      id: '1',
      username: 'johndoe',
      email: 'john@gitam.edu',
    },
    collaborators: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-15'),
    isPrivate: false,
  },
];

export const repositoryService = {
  listRepositories: async (userId: string): Promise<Repository[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_REPOSITORIES.filter(
      repo => repo.owner.id === userId || repo.collaborators.some(c => c.id === userId)
    );
  },

  createRepository: async (
    name: string,
    description: string,
    isPrivate: boolean,
    owner: User
  ): Promise<Repository> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRepo: Repository = {
      id: String(MOCK_REPOSITORIES.length + 1),
      name,
      description,
      owner,
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPrivate,
    };
    MOCK_REPOSITORIES.push(newRepo);
    return newRepo;
  },

  deleteRepository: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_REPOSITORIES.findIndex(repo => repo.id === id);
    if (index !== -1) {
      MOCK_REPOSITORIES.splice(index, 1);
    }
  },
};