import { Book, Lock, Star, GitFork, Trash2, ExternalLink } from 'lucide-react';
import { Repository } from '../../types';

interface RepositoryListProps {
  repositories: Repository[];
  onDeleteRepository: (id: string) => void;
}

export function RepositoryList({ repositories, onDeleteRepository }: RepositoryListProps) {
  return (
    <div className="space-y-4">
      {repositories.map(repo => (
        <div
          key={repo.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Book className="h-5 w-5 text-gray-600" />
                <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                  {repo.name}
                </h3>
                {repo.isPrivate && (
                  <Lock className="h-4 w-4 text-gray-500" />
                )}
              </div>
              
              <p className="mt-2 text-gray-600">{repo.description}</p>
              
              {repo.githubUrl && (
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View on GitHub
                </a>
              )}
            </div>
            
            <button
              onClick={() => onDeleteRepository(repo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
              title="Delete repository"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>0 stars</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span>0 forks</span>
            </div>
            <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}