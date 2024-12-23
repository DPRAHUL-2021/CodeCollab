import { Book, Lock, Trash2, ExternalLink } from "lucide-react";
import { Repository } from "../../types";

interface RepositoryListProps {
  repositories: Repository[];
  onDeleteRepository: (id: string) => void;
}

export function RepositoryList({
  repositories,
  onDeleteRepository,
}: RepositoryListProps) {
  return (
    <div className="space-y-4">
      {repositories.map((repo) => {
        console.log(repo);
        return (
          <div
            key={repo._id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-black" />
                  <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                    {repo.repoName}
                  </h3>
                  {repo.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
                </div>

                <p className="mt-2 text-black">{repo.description}</p>

                {repo.htmlUrl && (
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-sm text-black hover:text-gray-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on GitHub
                  </a>
                )}
              </div>

              <button
                onClick={() => onDeleteRepository(repo._id)}
                className="text-black hover:text-red-500 transition-colors p-2"
                title="Delete repository"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* <div className="mt-4 flex items-center space-x-6 text-sm text-black">
              <span>View Details</span>
            </div> */}
          </div>
        );
      })}
    </div>
  );
}
