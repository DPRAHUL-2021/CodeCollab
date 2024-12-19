import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Repository } from '../types';
import { RepositoryList } from '../components/repository/RepositoryList';
import { CreateRepositoryModal } from '../components/repository/CreateRepositoryModal';

export function DashboardPage() {
  const { user } = useAuth();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateRepository = async (
    name: string,
    description: string,
    isPrivate: boolean,
    githubUrl?: string
  ) => {
    if (!user) return;

    const newRepo: Repository = {
      id: Date.now().toString(),
      name,
      description,
      owner: user,
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPrivate,
      githubUrl
    };

    setRepositories(prev => [...prev, newRepo]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteRepository = (id: string) => {
    setRepositories(prev => prev.filter(repo => repo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Repositories</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5 mr-2" />
              New
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {repositories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No repositories yet. Create your first repository to get started!
          </div>
        ) : (
          <RepositoryList
            repositories={repositories}
            onDeleteRepository={handleDeleteRepository}
          />
        )}
      </main>

      <CreateRepositoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRepository}
      />
    </div>
  );
}