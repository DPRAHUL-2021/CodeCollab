export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Repository {
  _id: string;
  repoName: string;
  description: string;
  owner: User;
  // collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  htmlUrl?: string;
}
