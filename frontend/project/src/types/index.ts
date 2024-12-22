export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  owner: User;
  // collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  githubUrl?: string;
}
