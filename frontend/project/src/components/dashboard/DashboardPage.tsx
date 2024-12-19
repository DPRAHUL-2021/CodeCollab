import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Repository, User } from '../../types';
import { repositoryService } from '../../services/repository';
import { RepositoryList } from './RepositoryList';
import { CreateRepositoryModal } from './CreateRepositoryModal';

interface DashboardPageProps {
  user: User;
}

export function DashboardPage({ user }: DashboardPageProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRepositories();
  }, [user.id]);

  const loadRepositories = async () => {
    try {
      const repos = await repositoryService.listRepositories(user.id);
      setRepositories(repos);
    } catch (error) {
      console.error('Failed to load repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRepository = async (name: string, description: string, isPrivate: boolean) => {
    try {
      const newRepo = await repositoryService.createRepository(name, description, isPrivate, user);
      setRepositories(prev => [...prev, newRepo]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create repository:', error);
    }
  };

  const handleDeleteRepository = async (id: string) => {
    try {
      await repositoryService.deleteRepository(id);
      setRepositories(prev => prev.filter(repo => repo.id !== id));
    } catch (error) {
      console.error('Failed to delete repository:', error);
    }
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
        {loading ? (
          <div className="text-center py-8">Loading repositories...</div>
        ) : repositories.length === 0 ? (
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